import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase from './firebase';

// https://usehooks.com/useAuth/
// - Renamed ProvideAuth to AuthProvider
// - Converted to async/await and arrow functions
// - Removed the return statements from signin, singup, and signout because they weren't being used
// - Added a formatUser 'middleware' to remove extraneous data from the firebase user object
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
