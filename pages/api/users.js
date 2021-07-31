import { firestore } from '@/utils/fireadmin';

const handler = async (req, res) => {
  // ? what if this fails, there will be entry in firebase auth but not firestore
  if (req.method === 'POST') {
    firestore.collection('users').doc(uid).set(data);
  }

  if (req.method === 'GET') {
    const snapshot = await firestore.collection('users').get();
    const users = [];

    snapshot.forEach((doc) => {
      users.push(doc.data());
    });

    res.status(200).json(users);
  }
};

export default handler;
