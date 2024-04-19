import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';
import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebase';


const Create = () => {
  const navigate = useNavigate();
  const { authUser } = useUserContext();
  if (!authUser) {
    navigate('/');
  }
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [author, setAuthor] = useState(authUser.displayName);
	const [isPending, setIsPending] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setIsPending(true);

    const createBlog = async () => {
      await addDoc(collection(db, 'blogs'), {
        title: title,
        body: body,
        author: author
      })
      setIsPending(false);
			navigate('/');
    };

    createBlog();
	};

	return (
		<div className="create">
			<h2>Add a New Blog</h2>
			<form onSubmit={handleSubmit}>
				<label>Blog title:</label>
				<input
					type='text'
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
					type='text'
					required
					value={author}
					onChange={(e) => setAuthor(e.target.value)}
				/>
				{!isPending && (
					<button>
						Publish Blog <FontAwesomeIcon icon={faUpload} />
					</button>
				)}
				{isPending && <button disabled>Publishing...</button>}
			</form>
		</div>
	);
};

export default Create;
