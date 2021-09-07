import firebase, { fireauth, firestore } from '@/utils/fireadmin';

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

    // 1. Move from lessons to reviews subcollection:
    //   a. Get card from lessons
    //   b. Add card to reviews
    //   c. Delete card from lessons
    // 2. Add relevent SRS fields
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

    const lesson = (await lessonRef.get()).data();
    const srs = 1;
    const now = new Date().getTime();
    const learnedAt = firebase.firestore.Timestamp.fromMillis(now);
    const dueAt = firebase.firestore.Timestamp.fromMillis(
      now + 4 * 60 * 60 * 1000
    );

    const batch = firestore.batch();
    batch.set(reviewRef, { ...lesson, srs, learnedAt, dueAt });
    batch.delete(lessonRef);
    await batch.commit();

    res.status(200).send();
  }
};

export default handler;
