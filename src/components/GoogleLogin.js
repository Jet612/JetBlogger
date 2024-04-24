import { getAuth, signInWithPopup } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { provider } from "../utils/firebase"; // Assuming you have Firebase config in 'firebase.js'
import { useUserContext } from '../utils/UserContext'; 
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@awesome.me/kit-a2ceb3a490/icons/classic/brands'
import { db } from '../utils/firebase';

const GoogleLogin = () => {
  const auth = getAuth();
  const { setUser } = useUserContext();

  const handleGoogleLogin = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        const userRef = doc(db, 'users', user.uid);

        const userDocSnap = await getDoc(userRef);

        if (!userDocSnap.exists()) { 
          await setDoc(userRef, {
            displayName: user.displayName
          });
        }

        setUser(user);
      })
      .catch((error) => {
        console.error('Login error:', error);
      });
  };

  return (
    <button onClick={handleGoogleLogin} className="bubble">
      <FontAwesomeIcon icon={faGoogle} /> Login
    </button>
  );
};

export default GoogleLogin;