import { useState } from 'react';
import BlogList from '../components/BlogList';
import SearchBox from '../components/SearchBox'; // Import the SearchBox component
import useFetchBlogs from '../utils/useFetchBlogs';
import { useUserContext } from '../utils/UserContext';
import '../styles/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid';

const Home = () => {
  const { authUser } = useUserContext();
  const [filter, setFilter] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { blogs, isPending, error } = useFetchBlogs(filter, searchQuery);
  const [showSearch, setShowSearch] = useState(false);

  const handleFilterAll = () => {
    setFilter(null);
  };

  const handleFilterUser = () => {
    setFilter(authUser.uid);
  };

  const handleSearchClick = () => {
    setShowSearch(!showSearch);
  };

  const handleCloseSearch = () => {
    setShowSearch(false);
  };

  return (
    <div className="home">
      {showSearch && (
        <SearchBox
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onClose={handleCloseSearch}
        />
      )}
      {authUser ? (
        <div className="home-header">
          <div className="filter-buttons">
            <button className={filter ? '' : 'active'} onClick={handleFilterAll}>
              All Blogs
            </button>
            <button className={filter ? 'active' : ''} onClick={handleFilterUser}>
              Your Blogs
            </button>
          </div>
          <div className="search">
            <button onClick={handleSearchClick}>
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
          </div>
        </div>
      ) : (
        <h2>All Blogs</h2>
      )}
      {error && <div>{error}</div>} {/* Ensure error is displayed as string */}
      {isPending && <h2>Loading...</h2>}
      {!isPending && blogs && <BlogList blogs={blogs} />}
    </div>
  );
}

export default Home;