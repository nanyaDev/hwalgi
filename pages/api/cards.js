import admin, { fireauth, firestore } from '@/utils/fireadmin';

// todo: improve html response with more details (perhaps from firebase response)
const handler = async (req, res) => {
  if (req.method === 'POST') {
    const { uid } = await fireauth.verifyIdToken(req.headers.token);

    const { destination, data } = req.body;

    if (destination === 'known') {
      const wordStatsRef = firestore.collection('wordStats').doc(uid);
      await wordStatsRef.set(
        {
          known: admin.firestore.FieldValue.arrayUnion(
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
          // prettier-ignore
          const { id, definitions, frequency, translation, length, start, sentence, title, word, pos } = card;
          // prettier-ignore
          lessonsRef.doc(id).set({ definitions, frequency, translation, length, start, sentence, title, word, pos });
        })
      );

      const wordStatsRef = firestore.collection('wordStats').doc(uid);
      await wordStatsRef.set(
        {
          learning: admin.firestore.FieldValue.arrayUnion(
            ...data.map((card) => card.word)
          ),
        },
        { merge: true }
      );
    }

    res.status(200).send();
  }

  if (req.method === 'GET') {
    const { uid } = await fireauth.verifyIdToken(req.headers.token);

    const wordStatsRef = firestore.collection('wordStats').doc(uid);
    const doc = await wordStatsRef.get();

    // todo: conditional chaining seems hacky
    res.status(200).json(doc?.data());
  }
};

export default handler;
