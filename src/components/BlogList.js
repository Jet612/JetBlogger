import { Link } from "react-router-dom";
import WrittenBy from "./WrittenBy";

const BlogList = ({ blogs }) => {
  return ( 
    <div className="blog-list">
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} className="text-decoration-none" key={blog.id}>
          <div className='blog-preview'>
            <h2>{blog.title}</h2>
            <h5>{blog.body}</h5>
            <WrittenBy userId={blog.authorId} prefix="- " />
          </div>
        </Link>
      ))}
    </div>  
  );
}

export default BlogList;