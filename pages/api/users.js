import admin, { fireauth, firestore } from '@/utils/fireadmin';

// todo: send error messages if req.method is of wrong type (for all api endpoints)
const handler = async (req, res) => {
  // ? what if this fails, there will be entry in firebase auth but not in firestore
  if (req.method === 'POST') {
    const { uid, email } = await fireauth.verifyIdToken(req.headers.token);

    const data = {
      email,
      created: admin.firestore.FieldValue.serverTimestamp(),
      access: 'basic',
    };

    await firestore.collection('users').doc(uid).set(data);
    res.status(200).json(data);
  }
};

export default handler;
