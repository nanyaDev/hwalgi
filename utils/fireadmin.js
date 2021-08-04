import admin from 'firebase-admin';

// There are some weird gotchas when copying the private_key envvar to vercel
// cf. https://github.com/vercel/vercel/issues/749#issuecomment-707515089
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_ADMIN_PRIVATE_KEY,
    }),
  });
}

export default admin;
export const firestore = admin.firestore();
export const fireauth = admin.auth();
