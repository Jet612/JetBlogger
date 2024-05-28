import React, { useState } from 'react';
import BlogList from '../components/BlogList';
import useFetchBlogs from '../utils/useFetchBlogs';
import { useUserContext } from '../utils/UserContext';
import '../styles/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid';

const Home = () => {
  const { authUser } = useUserContext();
  const [filter, setFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentQuery, setCurrentQuery] = useState('');
  const { blogs, isPending, error } = useFetchBlogs(filter, currentQuery);

  const handleFilterAll = () => {
    setFilter(null);
  };

  const handleFilterUser = () => {
    setFilter(authUser.uid);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setCurrentQuery(searchQuery);
  };

  return (
    <div className="home">
      {authUser ? (
        <div className="home-header">
          <div className="filter-buttons">
            <button className={!filter ? 'active' : ''} onClick={handleFilterAll}>
              All Blogs
            </button>
            <button className={filter ? 'active' : ''} onClick={handleFilterUser}>
              Your Blogs
            </button>
          </div>
          <div className="search">
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', width: '100%' }}>
              <div className="search-wrapper">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <h2>All Blogs</h2>
      )}
      {error && <div>{error}</div>}
      {isPending && <h2>Loading...</h2>}
      {!isPending && blogs && <BlogList blogs={blogs} />}
    </div>
  );
};

export default Home;