import { fireauth, firestore } from '@/utils/fireadmin';

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { uid } = await fireauth.verifyIdToken(req.headers.token);

    const lessonsRef = firestore
      .collection('users')
      .doc(uid)
      .collection('lessons');
    const lessonsSnapshot = await lessonsRef.get();
    const lessons = lessonsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    res.status(200).json(lessons);
  }

  if (req.method === 'POST') {
    const { uid } = await fireauth.verifyIdToken(req.headers.token);

    const [id] = req.body;

    // Move from lessons to reviews subcollection:
    //   a. Get card from lessons
    //   b. Add card to reviews
    //   c. Delete card from lessons
    const lessonRef = firestore
      .collection('users')
      .doc(uid)
      .collection('lessons')
      .doc(id);

    const reviewRef = firestore
      .collection('users')
      .doc(uid)
      .collection('reviews')
      .doc(id);

    const data = (await lessonRef.get()).data();

    const batch = firestore.batch();
    batch.set(reviewRef, data);
    batch.delete(lessonRef);
    await batch.commit();

    res.status(200).send();
  }
};

export default handler;
