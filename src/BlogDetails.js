import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash, faPenToSquare } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useUserContext } from './UserContext';
import useFetchBlog from './useFetchBlog';

const BlogDetails = () => {
  const { id } = useParams();
  const { blog, isPending, error } = useFetchBlog(id);
  const { authUser } = useUserContext();
  const navigate = useNavigate();

  const [confirmation, setConfirmation] = useState(false);
  const [isPendingDelete, setIsPendingDelete] = useState(false);

  // Determine if the authenticated user can delete the blog post
  const canEdit = blog && authUser && blog.authorId === authUser.uid;

  const handleDelete = async () => {
    setIsPendingDelete(true);
    try {
      // Use the Firebase SDK to delete the blog post
      await deleteDoc(doc(db, 'blogs', id));
      // Navigate back to the home page after deletion
      navigate('/');
    } catch (error) {
      console.error('Error deleting blog post:', error);
    } finally {
      setIsPendingDelete(false);
    }
  };

  return (
    <div className="blog-details">
      <Link to="/" className="text-decoration-none back-button">
        <FontAwesomeIcon icon={faArrowLeft} /> Back
      </Link>
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <p>{blog.body}</p>
          {canEdit && (
            <div>
              <button onClick={() => setConfirmation(true)}>
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
              <button onClick={() => navigate(`/blogs/edit/${id}`)}>
                <FontAwesomeIcon icon={faPenToSquare} /> Edit
              </button>
            </div>
          )}
        </article>
      )}
      {confirmation && (
        <div>
          {isPendingDelete ? (
            <p>Deleting...</p>
          ) : (
            <>
              <p>Are you sure you want to delete this blog post?</p>
              <button onClick={handleDelete}>Yes, delete</button>
              <button onClick={() => setConfirmation(false)}>No, cancel</button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogDetails;