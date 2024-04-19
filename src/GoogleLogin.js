import { getAuth, signInWithPopup } from "firebase/auth";
import { provider } from "./firebase";
import { useUserContext } from './UserContext';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@awesome.me/kit-a2ceb3a490/icons/classic/brands'

const GoogleLogin = () => {
    const auth = getAuth();
    const { setUser } = useUserContext();

    const handleGoogleLogin = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
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
