import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';

const Create = () => {
  const navigate = useNavigate();
  const { authUser } = useUserContext();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [author, setAuthor] = useState(authUser ? authUser.displayName : '');
  const [isPending, setIsPending] = useState(false);

  // Redirect to home page only if `authUser` is null
  useEffect(() => {
      if (!authUser) {
          navigate('/');
      }
  }, [authUser, navigate]);

  const handleSubmit = async (e) => {
      e.preventDefault();
      setIsPending(true);

      await addDoc(collection(db, 'blogs'), {
          title: title,
          body: body,
          author: author,
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
                      Publish Blog <FontAwesomeIcon icon={faUpload} />
                  </button>
              )}
              {isPending && <button disabled>Publishing...</button>}
          </form>
      </div>
  );
};

export default Create;