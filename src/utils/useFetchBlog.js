import { useState, useEffect } from 'react';
import { doc, getDoc, collection, orderBy, query, onSnapshot } from 'firebase/firestore';
import { db } from './firebase'; // Assuming you have your Firebase config in 'firebase.js'

const useFetchBlog = (blogId) => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogAndComments = async () => {
      setIsPending(true);
      setError(null); // Reset error on new fetch attempt

      try {
        // Fetch Blog Document
        const blogRef = doc(db, 'blogs', blogId);
        const blogSnap = await getDoc(blogRef);

        if (!blogSnap.exists()) {
          throw new Error('Blog not found'); 
        } 

        // Fetch Comments with Real-Time Updates
        const commentsRef = collection(db, 'blogs', blogId, 'comments');
        const q = query(commentsRef, orderBy('timestamp')); // Add ordering if desired

        const unsub = onSnapshot(q, (querySnapshot) => {
          const fetchedComments = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
          }));
          setComments(fetchedComments);
        }, (error) => { 
          console.error('Error fetching comments:', error);
          setError(error); 
        });

        // Update States on Successful Fetch
        setBlog({ id: blogSnap.id, ...blogSnap.data() });
        setIsPending(false);

        return () => unsub(); // Cleanup function for the real-time listener
      } catch (err) {
        console.error('Error fetching blog or comments:', err);
        setError(err); 
        setIsPending(false);
      } 
    };

    fetchBlogAndComments();
  }, [blogId]);

  return { blog, comments, isPending, error }; 
};

export default useFetchBlog;