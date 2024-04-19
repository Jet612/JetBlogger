import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const useFetchBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsPending(true);
      try {
        const q = query(collection(db, 'blogs'), orderBy("timestamp", "desc"));
        const querySnapshot = await await getDocs(q)
        const blogsData = [];
        querySnapshot.forEach((doc) => {
          blogsData.push({ id: doc.id, ...doc.data() });
        });
        setBlogs(blogsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching blogs: ", err);
        setError(err);
      } finally {
        setIsPending(false);
      }
    };

    fetchBlogs();
  }, []);

  return { blogs, isPending, error };
};

export default useFetchBlogs;
