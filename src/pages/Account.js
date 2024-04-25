import { useUserContext } from '../utils/UserContext';
import '../styles/account.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faFloppyDisk } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid';

const Account = () => {
  const navigate = useNavigate();
  const { authUser, isReady } = useUserContext();
  const [displayName, setDisplayName] = useState('');
  const [originalDisplayName, setOriginalDisplayName] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (isReady && !authUser) {
      navigate('/login');
    }
    if (authUser) {
      const getUserData = async () => {
        const userDoc = await getDoc(doc(db, 'users', authUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setDisplayName(userData.displayName);
          setOriginalDisplayName(userData.displayName);
        }
      };
      getUserData();
    }
  }, [authUser, navigate, isReady]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    const docRef = doc(db, 'users', authUser.uid);
    await updateDoc(docRef, {
      displayName: displayName
    });

    setIsPending(false);
    setOriginalDisplayName(displayName); // Reset originalDisplayName to current displayName
    setIsChanged(false); // Reset isChanged to false
    navigate('/account');
  }

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
    if (e.target.value !== originalDisplayName) {
      setIsChanged(true); // Set isChanged to true if displayName is different from originalDisplayName
    } else {
      setIsChanged(false);
    }
  }

  return (
    <>
    <Link to="/" className="text-decoration-none back-button">
      <FontAwesomeIcon icon={faArrowLeft} /> Back
    </Link>
    <div className="account-info">
      <h1>Account Information</h1>
      <form className="edit-account" onSubmit={handleSubmit}>
        <div className="section">
          <label>Email:</label>
          {!authUser ? (
            <input
            type="text"
            value="Loading..."
            disabled
            />
          ) : (
            <input type="text" value={authUser.email} disabled />
          )}
        </div>
        <div className="section">
          <label>Display Name:</label>
          {!authUser ? (
            <input
              type="text"
              value="Loading..."
              disabled
            />
          ) : (
            <input
              type="text"
              value={displayName}
              onChange={handleDisplayNameChange}
              required
              minLength="3"
              maxLength="50"
            />
          )}
        </div>
        {!isPending ? (
          <button type="submit" className="button" disabled={!isChanged || isPending}>
          Save Changes <FontAwesomeIcon icon={faFloppyDisk} />
        </button>
        ) : (
          <button disabled>Saving...</button>
        )}
        
      </form>
    </div>
    </>
  );
};

export default Account;