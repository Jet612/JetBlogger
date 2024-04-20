import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const useFetchBlogs = (filter = null) => { // Accept filter as an optional parameter
  const [blogs, setBlogs] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsPending(true);
      try {
        let q;
        if (filter) { // If filter is provided, add a where clause to the query
          q = query(collection(db, 'blogs'), where("authorId", "==", filter), orderBy("timestamp", "desc"));
        } else {
          q = query(collection(db, 'blogs'), orderBy("timestamp", "desc"));
        }
        const querySnapshot = await getDocs(q);
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
  }, [filter]); // Add filter to the dependency array

  return { blogs, isPending, error };
};

export default useFetchBlogs;