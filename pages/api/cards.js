import admin, { fireauth, firestore } from '@/utils/fireadmin';

// todo: improve html response with more details (perhaps from firebase response)
const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { uid } = await fireauth.verifyIdToken(req.headers.token);

    const statsRef = firestore.collection('users').doc(uid).collection('stats');
    const docs = (await statsRef.get()).docs;

    // Reshapes docs to this form:
    // {
    //   "known": [ "되다", "반대", ... ],
    //   "learning": [ "씨", "자다", ... ]
    // }
    const data = docs.reduce((acc, doc) => {
      acc[doc.id] = doc.data().words;
      return acc;
    }, {});

    // todo: what if they have no stats yet
    res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const { uid } = await fireauth.verifyIdToken(req.headers.token);

    const { destination, data } = req.body;

    if (destination === 'known') {
      const knownRef = firestore
        .collection('users')
        .doc(uid)
        .collection('stats')
        .doc('known');
      await knownRef.set(
        {
          words: admin.firestore.FieldValue.arrayUnion(
            ...data.map((card) => card.word)
          ),
        },
        { merge: true }
      );
    }

    // todo: potential for data corruption if some promises fail
    // todo: perhaps limit new lessons and send as batched write
    if (destination === 'lessons') {
      const lessonsRef = firestore
        .collection('users')
        .doc(uid)
        .collection('lessons');

      await Promise.all(
        data.map((card) => {
          // todo: probs better to validate with firestore rules
          // cf. https://firebase.google.com/docs/rules/data-validation
          // prettier-ignore
          const { id, definitions, frequency, translation, length, start, sentence, title, word, pos } = card;
          // prettier-ignore
          lessonsRef.doc(id).set({ definitions, frequency, translation, length, start, sentence, title, word, pos });
        })
      );

      const learningRef = firestore
        .collection('users')
        .doc(uid)
        .collection('stats')
        .doc('learning');

      await learningRef.set(
        {
          words: admin.firestore.FieldValue.arrayUnion(
            ...data.map((card) => card.word)
          ),
        },
        { merge: true }
      );
    }

    res.status(200).send();
  }
};

export default handler;
