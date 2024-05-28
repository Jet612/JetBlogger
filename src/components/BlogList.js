import { Link } from "react-router-dom";
import DisplayUsername from "./DisplayUsername";
import showdown from 'showdown';

const BlogList = ({ blogs }) => {
  const markdownToPlainText = (markdown) => {
    const converter = new showdown.Converter();
    // Convert markdown to HTML
    const html = converter.makeHtml(markdown);
    // Remove any HTML tags to get plain text
    const plainText = html.replace(/<[^>]*>?/gm, '');
    return plainText;
  };

  return ( 
    <div className="blog-list">
      {blogs.length === 0 && <h2>Could not find any blogs!</h2>}
      {blogs.map((blog) => (
        <Link to={`/blogs/${blog.id}`} className="text-decoration-none" key={blog.id}>
          <div className='blog-preview'>
            <h2>{blog.title}</h2>
            <h5>{markdownToPlainText(blog.body)}</h5>
            <DisplayUsername userId={blog.authorId} prefix="- " timestamp={blog.timestamp} />
          </div>
        </Link>
      ))}
    </div>  
  );
}

export default BlogList;