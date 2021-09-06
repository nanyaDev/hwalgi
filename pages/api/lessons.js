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
    // res.status(200).json({});
    res.status(200).send();
  }
};

export default handler;
