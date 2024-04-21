import { useState } from 'react';
import BlogList from '../components/BlogList';
import useFetchBlogs from '../utils/useFetchBlogs';
import { useUserContext } from '../utils/UserContext';
import '../styles/home.css';

const Home = () => {
  const { authUser } = useUserContext();
  const [filter, setFilter] = useState(null);
  const { blogs, isPending, error } = useFetchBlogs(filter);

  const handleFilterAll = () => {
    setFilter(null);
  };

  const handleFilterUser = () => {
    setFilter(authUser.uid);
  };

  return (
    <div className="home">
      {authUser ? (
        <div className="filter-buttons">
          <button className={filter ? '' : 'active'} onClick={handleFilterAll}>
            All Blogs
          </button>
          <button className={filter ? 'active' : ''} onClick={handleFilterUser}>
            Your Blogs
          </button>
        </div>
      ) : (
        <h2>All Blogs</h2>
      )}
      <br></br>
      {error && <div>{error}</div>}
      {isPending && <h2>Loading...</h2>}
      {!isPending && blogs && (
        <BlogList blogs={blogs} />
      )}
    </div>
  );
}

export default Home;