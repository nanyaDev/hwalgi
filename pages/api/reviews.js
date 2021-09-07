import { fireauth, firestore } from '@/utils/fireadmin';

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

  if (req.method === 'POST') {
    res.status(200).send();
  }
};

export default handler;
