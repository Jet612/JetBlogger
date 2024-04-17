const BlogList = ({ blogs }) => {
    return ( 
        <div className="blog-list">
            <h1>All Blogs</h1>
            {blogs.map((blog) => (
                <div className='blog-preview' key={blog.id}>
                    <h2>{blog.title}</h2>
                    <h5>{blog.body.length >= 100 ? blog.body.substring(0, 100) + '...' : blog.body}</h5>
                    <p>- {blog.author}</p>
                </div>
            ))}
        </div>
    );
}

export default BlogList;