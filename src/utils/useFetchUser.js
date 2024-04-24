import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const useFetchUser = (userId) => { // Accept filter as an optional parameter
  const [user, setUser] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsPending(true);
      try {
        const userRef = doc(db, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          throw new Error('User not found'); 
        } 

        setUser(userSnap.data(), { id: userId });
        setError(null);
      } catch (err) {
        console.error("Error fetching user: ", err);
        setError(err);
      } finally {
        setIsPending(false);
      }
    };

    fetchBlogs();
  }, [userId]); // Add filter to the dependency array

  return { user, isPending, error };
};

export default useFetchUser;