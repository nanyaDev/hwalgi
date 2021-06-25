import React, { useState, useEffect, useContext, createContext } from 'react';
import { useRouter } from 'next/router';
import firebase from './firebase';

// https://usehooks.com/useAuth/
// - Rename ProvideAuth to AuthProvider
// - Convert to async/await and arrow functions
// - Remove the return statements from signin, singup, and signout because they aren't being used
// - Add a formatUser 'middleware' to remove extraneous data from the firebase user object
// - Redirect to dashboard after auth with useRouter()
const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  const signin = async (email, password) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    setUser(await formatUser(response.user));
    router.push('/dashboard');
  };

  const signup = async (email, password) => {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    setUser(await formatUser(response.user));
    router.push('/dashboard');
  };

  const signout = async () => {
    // ? - would putting router.push() at end cause race condition
    // ?   with the reroute caused by useRequireAuth()
    router.push('/landing');
    await firebase.auth().signOut();
    setUser(false);
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any
  // component that utilizes this hook to re-render with the
  // latest auth object.
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return { user, signin, signup, signout };
};

/* HELPERS */
// github.com:leerob/fastfeedback:lib/auth.js
const formatUser = async (user) => {
  const token = await user.getIdToken();

  return { uid: user.uid, email: user.email, token };
};
