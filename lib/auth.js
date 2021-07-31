import React, { useState, useEffect, useContext, createContext } from 'react';

import firebase from '@/utils/firebase';

// https://usehooks.com/useAuth/
const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

// todo: check for race conditions
const useAuthProvider = () => {
  const [user, setUser] = useState(null);

  const signin = async (email, password) => {
    const response = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);
    setUser(await formatUser(response.user));
  };

  const signup = async (email, password) => {
    const response = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    setUser(await formatUser(response.user));
  };

  const signout = async () => {
    await firebase.auth().signOut();
    setUser(false);
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        setUser(await formatUser(user));
      } else {
        setUser(false);
      }
    });

    return unsubscribe;
  }, []);

  return { user, signin, signup, signout };
};

/* HELPERS */
// github.com:leerob/fastfeedback:lib/auth.js
const formatUser = async (user) => {
  const token = await user.getIdToken();

  return { uid: user.uid, email: user.email, token };
};
