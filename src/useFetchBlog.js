import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const useFetchBlogById = (blogId) => {
  const [blog, setBlog] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setIsPending(true);
      try {
        const blogRef = doc(db, 'blogs', blogId);
        const docSnap = await getDoc(blogRef);

        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError(new Error('Blog not found'));
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching blog: ", err);
        setError(err);
      } finally {
        setIsPending(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  return { blog, isPending, error };
};

export default useFetchBlogById;
