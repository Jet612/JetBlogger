import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faArrowLeft } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid';
import { doc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';
import { useUserContext } from './UserContext';


const Edit = () => {
  const { id } = useParams(); // Get the blog post ID from the route parameters
  const navigate = useNavigate();
  const { authUser } = useUserContext();

  // State variables to hold the current blog post details and form inputs
  const [blog, setBlog] = useState(null);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState('');
  const [isPending, setIsPending] = useState(false);

  // Fetch the existing blog post details based on the ID
  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, 'blogs', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const blogData = docSnap.data();
        setBlog(blogData);
        setTitle(blogData.title);
        setBody(blogData.body);
        setAuthor(blogData.author);
      } else {
        // If the blog post does not exist, navigate back to home
        navigate('/');
      }
    };
    fetchBlog();
  }, [id, navigate]);

  // Redirect if the user is not authorized to edit the blog post
  useEffect(() => {
    if (blog && authUser && blog.authorId !== authUser.uid) {
      navigate(`/blogs/${id}`);
    }
  }, [blog, authUser, id, navigate]);

  // Handle the form submission to update the blog post
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);

    // Update the existing blog post document in Firestore
    const docRef = doc(db, 'blogs', id);
    await updateDoc(docRef, {
      title: title,
      body: body,
      author: author,
      updatedAt: serverTimestamp(), // Update the timestamp field
    });

    setIsPending(false);
    navigate(`/blogs/${id}`); // Redirect to the updated blog post
  };

  // Render the form for editing the blog post
  return (
    <div className="create">
      <Link to={"/blogs/" + id} className="text-decoration-none back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      <h2>Edit Blog Post</h2>
      {blog && authUser && blog.authorId === authUser.uid ? (
        <form onSubmit={handleSubmit}>
          <label>Blog title:</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Blog body:</label>
          <textarea
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <label>Blog author:</label>
          <input
            type="text"
            required
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          {!isPending && (
            <button type="submit">
              Save Changes <FontAwesomeIcon icon={faSave} />
            </button>
          )}
          {isPending && <button disabled>Saving...</button>}
        </form>
      ) : (
        // If the blog post is not available, return null to let useEffect handle the redirect
        null
      )}
    </div>
  );
};

export default Edit;
