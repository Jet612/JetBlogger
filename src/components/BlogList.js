import { Link } from "react-router-dom";
import DisplayUsername from "./DisplayUsername";
import showdown from 'showdown'; // Import showdown

const BlogList = ({ blogs }) => {
  // Function to convert markdown to plain text
  const markdownToPlainText = (markdown) => {
    // Create a showdown converter
    const converter = new showdown.Converter();
    // Convert markdown to HTML
    const html = converter.makeHtml(markdown);
    // Remove any HTML tags to get plain text
    const plainText = html.replace(/<[^>]*>?/gm, '');
    return plainText;
  };

  return ( 
    <div className="blog-list">
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} className="text-decoration-none" key={blog.id}>
          <div className='blog-preview'>
            <h2>{blog.title}</h2>
            {/* Render the plain text body */}
            <h5>{markdownToPlainText(blog.body)}</h5>
            <DisplayUsername userId={blog.authorId} prefix="- " timestamp={blog.timestamp} />
          </div>
        </Link>
      ))}
    </div>  
  );
}

export default BlogList;