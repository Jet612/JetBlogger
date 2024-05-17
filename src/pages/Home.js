import { useState } from 'react';
import BlogList from '../components/BlogList';
import useFetchBlogs from '../utils/useFetchBlogs';
import { useUserContext } from '../utils/UserContext';
import '../styles/home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid'; // Corrected import path

const Home = () => {
  const { authUser } = useUserContext();
  const [filter, setFilter] = useState(null);
  const [sortCriterion, setSortCriterion] = useState('date-desc');
  const { blogs, isPending, error } = useFetchBlogs(filter);

  const handleFilterAll = () => {
    setFilter(null);
  };

  const handleFilterUser = () => {
    setFilter(authUser.uid);
  };

  const handleSortChange = (event) => {
    setSortCriterion(event.target.value);
  };

  const sortBlogs = (blogs, criterion) => {
    if (!criterion || criterion === 'date-desc') return blogs;
    if (criterion === 'date-asc') return [...blogs].reverse();
    return blogs;  // default to date-desc
  };

  const sortedBlogs = sortBlogs(blogs, sortCriterion);

  return (
    <div className="home">
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
          <div className="sort-by">
            <select onChange={handleSortChange} value={sortCriterion}>
              <option value="date-desc">Date <FontAwesomeIcon icon={faArrowDown} /></option>
              <option value="date-asc">Date <FontAwesomeIcon icon={faArrowUp} /></option>
            </select>
          </div>
        </div>
      ) : (
        <h2>All Blogs</h2>
      )}
      {error && <div>{error}</div>}
      {isPending && <h2>Loading...</h2>}
      {!isPending && sortedBlogs && (
        <BlogList blogs={sortedBlogs} />
      )}
    </div>
  );
}

export default Home;