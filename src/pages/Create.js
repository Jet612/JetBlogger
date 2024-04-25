import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../utils/UserContext';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../utils/firebase';
import '../styles/create.css';

const Create = () => {
  const navigate = useNavigate();
  const { authUser } = useUserContext();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isPending, setIsPending] = useState(false);

  const textareaRef = useRef(null);

  // Redirect to home page only if `authUser` is null
  useEffect(() => {
      if (!authUser) {
          navigate('/');
      }
      if (textareaRef.current) {
        textareaRef.current.style.height = '150px'; // Reset height to auto initially
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to fit content
      }
  }, [authUser, navigate, body]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
  
    await addDoc(collection(db, 'blogs'), {
      title: title,
      body: body,
      authorId: authUser.uid,
      timestamp: serverTimestamp()
    });
  
    setIsPending(false);
    navigate('/');
  };

  // If `authUser` is null, return null and let useEffect handle the redirect
  // If `authUser` is not null, the user is logged in, so proceed with rendering
  if (!authUser) {
      return null;
  }

  return (
      <div className="create">
          <h2>Add a New Blog</h2>
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
                  ref={textareaRef}
              />
              {!isPending && (
                  <button type="submit">
                      Publish Blog <FontAwesomeIcon icon={faUpload} />
                  </button>
              )}
              {isPending && <button disabled>Publishing...</button>}
          </form>
      </div>
  );
};

export default Create;