import { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const useFetchBlogs = (filter = null, searchQuery = '') => {
  const [blogs, setBlogs] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      setIsPending(true);
      try {
        let q;
        if (filter) {
          q = query(
            collection(db, 'blogs'),
            where("authorId", "==", filter),
            orderBy("timestamp", "desc")
          );
        } else {
          q = query(
            collection(db, 'blogs'),
            orderBy("timestamp", "desc")
          );
        }

        const querySnapshot = await getDocs(q);
        let blogsData = [];
        querySnapshot.forEach((doc) => {
          blogsData.push({ id: doc.id, ...doc.data() });
        });

        if (searchQuery) {
          const searchLower = searchQuery.toLowerCase();
          blogsData = blogsData.filter(blog =>
            blog.title?.toLowerCase().includes(searchLower) || // Use optional chaining
            blog.content?.toLowerCase().includes(searchLower) // Use optional chaining
          );
        }

        setBlogs(blogsData);
        setError(null);
      } catch (err) {
        console.error("Error fetching blogs: ", err);
        setError(err.message); // Ensure error is a string
      } finally {
        setIsPending(false);
      }
    };

    fetchBlogs();
  }, [filter, searchQuery]);

  return { blogs, isPending, error };
};

export default useFetchBlogs;