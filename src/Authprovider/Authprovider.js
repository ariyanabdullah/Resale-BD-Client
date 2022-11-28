import React, { createContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const authcontext = createContext();
const auth = getAuth(app);

const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  //==Create User
  const RegisterUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ==login User
  const LoginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //==Google User
  const GoogleProvider = new GoogleAuthProvider();
  const GoogleUser = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  //== updateUSer

  const updateUser = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
    });
  };

  //== LogOut

  const LogOut = () => {
    return signOut(auth);
  };

  //==DeleteUSer

  const DeleteAUSer = (user) => {
    return deleteUser(user);
  };

  // ==user control
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const allInfo = {
    user,
    RegisterUser,
    LogOut,
    LoginUser,
    updateUser,
    GoogleUser,
    DeleteAUSer,
    loading,
  };

  return (
    <div>
      <authcontext.Provider value={allInfo}>{children}</authcontext.Provider>
    </div>
  );
};

export default Authprovider;
