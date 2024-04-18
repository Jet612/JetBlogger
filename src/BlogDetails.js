import { useParams } from "react-router-dom";
import useFetch from "./useFetch";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const BlogDetails = () => {
	const { id } = useParams();
	const { data: blog, isPending, error } = useFetch('https://blogger-api-livid.vercel.app/blogs/' + id);
	const [confirmation, setConfirmation] = useState(false);
	
	const navigate = useNavigate();

	/* const handleClick = () => {
		setConfirmation(true);
	}

	const handleCancel = () => {
		setConfirmation(false);
	} */

	const handleDelete = (id) => {
		fetch('https://blogger-api-livid.vercel.app/blogs/' + id, {
			method: 'DELETE'
		}).then(() => {
			console.log('Blog deleted');
			navigate('/');
		});
	};

	return (
		<div className="blog-details">
			<Link to="/" className="text-decoration-none back-button">
				<FontAwesomeIcon icon={faArrowLeft} /> Back
			</Link>
			{isPending && <div>Loading...</div>}
			{error && <div>{error}</div>}
			{blog && !confirmation && (
				<article>
					<h2>{blog.title}</h2>
					<p>Written by {blog.author}</p>
					<p>{blog.body}</p>
					{blog.id !== 1 && blog.id !== 2 && (
						<button onClick={() => setConfirmation(true)}>
							<FontAwesomeIcon icon={faTrash} /> Delete
						</button>
					)}
				</article>
			)}
			{confirmation && (
				<div>
					<p>Are you sure you want to delete this blog?</p>
					<button onClick={() => handleDelete(blog.id)}>Yes, delete</button>
					<button onClick={() => setConfirmation(false)}>No, cancel</button>
				</div>
			)}
		</div>
	);
};

export default BlogDetails;
