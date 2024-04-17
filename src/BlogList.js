const BlogList = ({ blogs, handleDelete }) => {
    return ( 
        <div className="blog-list">
            <h1>All Blogs</h1>
            {blogs.map((blog) => (
                <div className='blog-preview' key={blog.id}>
                    <h2>{blog.title}</h2>
                    <p>Written by {blog.author}</p>
                    <button onClick={() => handleDelete(blog.id)}>Delete blog</button>
                </div>
            ))}
        </div>
    );
}

export default BlogList;