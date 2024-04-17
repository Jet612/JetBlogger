import { useState } from 'react';
import BlogList from './BlogList';

const Home = () => {
    const [blogs, setBlogs] = useState([
        { title: 'Welcome to Blogger!', body: 'Try creating a new blog post by clicking the button in the top right corner.', author: 'Jackson T', id: 1},
        { title: 'This is a test blog post', body: 'This is the body of the test blog post.', author: 'Author Unknown', id: 2},
    ]);

    const handleDelete = (id) => {        
        const newBlogs = blogs.filter(blog => blog.id !== id);
        setBlogs(newBlogs);
    }

    return (
        <div className="home">
            <BlogList blogs={blogs} handleDelete={handleDelete} />
        </div>
    );
}

export default Home;