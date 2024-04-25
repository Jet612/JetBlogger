import React, { useState, useRef, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash, faPenToSquare } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid';
import { doc, deleteDoc, collection, serverTimestamp, addDoc } from 'firebase/firestore';
import { db } from '../utils/firebase';
import { useUserContext } from '../utils/UserContext';
import useFetchBlog from '../utils/useFetchBlog';
import '../styles/blogDetails.css';
import DisplayUsername from '../components/DisplayUsername';
import showdown from 'showdown'; // Import showdown
import DOMPurify from 'dompurify';

const BlogDetails = () => {
  const { id } = useParams();
  const { blog, comments, isPending, error } = useFetchBlog(id);
  const { authUser } = useUserContext();
  const navigate = useNavigate();

  const [confirmation, setConfirmation] = useState(false);
  const [isPendingDelete, setIsPendingDelete] = useState(false);
  const [comment, setComment] = useState('');
  const textareaRef = useRef(null);

  // Determine if the authenticated user can delete the blog post
  const canEdit = blog && authUser && blog.authorId === authUser.uid;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '20px'; // Reset height to auto initially
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight - 20}px`; // Set height to fit content
    }
  }, [comment]); // Re-run the effect whenever the comment state changes

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

  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const newComment = {
      text: comment, // Assuming 'comment' is the state variable with the comment text
      authorId: authUser.uid,
      timestamp: serverTimestamp()
    };

    try {
      const commentsRef = collection(db, 'blogs', id, 'comments');
      await addDoc(commentsRef, newComment); 
      setComment(''); // Clear the input field
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const commentRef = doc(db, 'blogs', id, 'comments', commentId);
      await deleteDoc(commentRef);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // Function to convert markdown to HTML
  const markdownToHTML = (markdown) => {
    const converter = new showdown.Converter();
    converter.setOption("strikethrough", true);
    converter.setOption("tables", true);
    converter.setOption("tasklists", true);
    converter.setOption("ghCodeBlocks", true);
    return converter.makeHtml(markdown);
  };

  return (
    <>
    <Link to="/" className="text-decoration-none back-button">
      <FontAwesomeIcon icon={faArrowLeft} /> Back
    </Link>
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {blog && (
        <article>
          <h2 className='title'>{blog.title}</h2>
          <DisplayUsername userId={blog.authorId} prefix="Written by " />
          {/* Render the HTML safely */}
          <div className='body' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(markdownToHTML(blog.body)) }} />
          {canEdit && !confirmation && (
            <div>
              <button onClick={() => setConfirmation(true)} className="edit-button">
                <FontAwesomeIcon icon={faTrash} /> Delete
              </button>
              <button onClick={() => navigate(`/blogs/edit/${id}`)} className="edit-button">
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
              <button onClick={handleDelete} className="edit-button">Yes, delete</button>
              <button onClick={() => setConfirmation(false)} className="edit-button">No, cancel</button>
            </>
          )}
        </div>
      )}
      <div className="comments">
        <h2 className="header">Comments</h2>
        {authUser && ( // Check if user is authenticated
          <form className='add-comment' onSubmit={handleSubmit}>
            <textarea 
              ref={textareaRef}
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              maxLength={500}
            ></textarea>
            <button type="submit" disabled={!comment.trim()} className={!comment.trim() ? 'disabled' : ''}>Comment</button>
          </form>
        )}
        {comments && comments.length > 0 ? ( 
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.text}</p>
              <div className="author"> 
                <DisplayUsername userId={comment.authorId} prefix="- " />
              </div>
              {/* Add delete button conditionally */}
              {authUser && authUser.uid === comment.authorId && (
                <button className="delete-comment-button" onClick={() => handleDeleteComment(comment.id)}>
                  <FontAwesomeIcon icon={faTrash} /> 
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-comments">No comments yet</p>
        )}
      </div>
    </div>
    </>
  );
};

export default BlogDetails;