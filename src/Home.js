import { useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogList from './BlogList';
import useFetchBlogs from './useFetchBlogs';
import { useUserContext } from './UserContext';

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