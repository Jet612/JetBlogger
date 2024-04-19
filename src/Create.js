import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

const Create = () => {
	const [title, setTitle] = useState('');
	const [body, setBody] = useState('');
	const [author, setAuthor] = useState('');
	const [isPending, setIsPending] = useState(false);
  const { authUser } = useUserContext();
	const navigate = useNavigate();

	const handleSubmit = (e) => {
		e.preventDefault();
		const blog = { title, body, author };
		setIsPending(true);

		fetch('https://blogger-api-livid.vercel.app/blogs', {
			method: 'POST',
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(blog)
		}).then(() => {
			console.log('New blog added');
			setIsPending(false);
			navigate('/');
		});
	};

  if (!authUser) {
    navigate('/');
  }

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
