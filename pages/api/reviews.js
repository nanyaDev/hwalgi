import admin, { fireauth, firestore } from '@/utils/fireadmin';
import { getSRSInterval, decrementSRS } from '@/utils/srs';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { uid } = await fireauth.verifyIdToken(req.headers.token);

    const reviewsRef = firestore
      .collection('users')
      .doc(uid)
      .collection('reviews');
    const reviewsSnapshot = await reviewsRef.get();
    const reviews = reviewsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(reviews);
  }

  // todo: don't accept post requests if dueAt > now
  if (req.method === 'POST') {
    const { uid } = await fireauth.verifyIdToken(req.headers.token);

    const id = Object.keys(req.body)[0];
    const grade = Object.values(req.body)[0];

    const reviewRef = firestore
      .collection('users')
      .doc(uid)
      .collection('reviews')
      .doc(id);

    let { nIncorrect, srs } = (await reviewRef.get()).data();
    let dueAt;

    const now = new Date().getTime();

    /// the order of these declarations is important
    if (grade) {
      srs += 1;
      dueAt = admin.firestore.Timestamp.fromMillis(now + getSRSInterval(srs));
    } else {
      nIncorrect += 1;
      srs = decrementSRS(srs, nIncorrect);
      dueAt = admin.firestore.Timestamp.fromMillis(now + getSRSInterval(srs));
    }

    await reviewRef.update({ srs, nIncorrect, dueAt });

    res.status(200).send();
  }
};

export default handler;
