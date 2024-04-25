import { Link } from "react-router-dom";
import DisplayUsername from "./DisplayUsername";

const BlogList = ({ blogs }) => {
  return ( 
    <div className="blog-list">
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} className="text-decoration-none" key={blog.id}>
          <div className='blog-preview'>
            <h2>{blog.title}</h2>
            <h5>{blog.body}</h5>
            <DisplayUsername userId={blog.authorId} prefix="- " timestamp={blog.timestamp} />
          </div>
        </Link>
      ))}
    </div>  
  );
}

export default BlogList;