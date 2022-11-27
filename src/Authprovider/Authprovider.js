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

  //==Create User
  const RegisterUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ==login User
  const LoginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  //==Google User
  const GoogleProvider = new GoogleAuthProvider();
  const GoogleUser = () => {
    return signInWithPopup(auth, GoogleProvider);
  };

  //== updateUSer

  const updateUser = (name) => {
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
  };

  return (
    <div>
      <authcontext.Provider value={allInfo}>{children}</authcontext.Provider>
    </div>
  );
};

export default Authprovider;
