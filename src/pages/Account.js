import { useUserContext } from '../utils/UserContext';
import '../styles/account.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';

const Account = () => {
  const navigate = useNavigate();
  const { authUser } = useUserContext();
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    if (!authUser) {
      navigate('/');
    } else {
      const fetchData = async () => {
        try {
          const userRef = doc(db, 'users', authUser.uid);
          const userSnap = await getDoc(userRef);
  
          if (!userSnap.exists()) {
            throw new Error('User not found');
          }
  
          setDisplayName(userSnap.data().displayName);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle error as needed
        }
      };
  
      fetchData();
    }
  }, [authUser, navigate]);

  return (
    <div className="account-info">
      <h2>Account Information</h2>
      <form>
        <label>Email:</label>
        {!authUser ? (
          <p>Loading...</p>
        ) : (
          <input type="text" value={authUser.email} disabled />
        )}
        <label>Display Name:</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
      </form>
    </div>
  );
};

export default Account;