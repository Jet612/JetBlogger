import { useParams } from "react-router-dom";
import useFetchBlog from "./useFetchBlog";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faTrash } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

const BlogDetails = () => {
	const { id } = useParams();
	const { blog, isPending, error } = useFetchBlog(id);
	const [confirmation, setConfirmation] = useState(false);
  const [isPendingDelete, setIsPendingDelete] = useState(false);
	
	const navigate = useNavigate();

	/* const handleClick = () => {
		setConfirmation(true);
	}

	const handleCancel = () => {
		setConfirmation(false);
	} */

	const handleDelete = (id) => {
    setIsPendingDelete(true);

    const createBlog = async () => {
      await deleteDoc(doc(db, "blogs", id), {
        title: blog.title,
        body: blog.body,
        author: blog.author
      })
      setIsPendingDelete(false);
			navigate('/');
    };

    createBlog();

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
					{blog.id !== "9zvmJ2BLhLjUypWV32e2" && blog.id !== "KQiU1vVlMM49wN7UqLjn" && (
						<button onClick={() => setConfirmation(true)}>
							<FontAwesomeIcon icon={faTrash} /> Delete
						</button>
					)}
				</article>
			)}
			{confirmation && (
        isPendingDelete ? (
          <p>Deleting...</p>
        ) : (
          <div>
            <p>Are you sure you want to delete this blog?</p>
            <button onClick={() => handleDelete(blog.id)}>Yes, delete</button>
            <button onClick={() => setConfirmation(false)}>No, cancel</button>
          </div>
        )
      )}
		</div>
	);
};

export default BlogDetails;
