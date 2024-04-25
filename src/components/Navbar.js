import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faCircleUser } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid'
import { Link } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import { useUserContext } from '../utils/UserContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { authUser } = useUserContext();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <h1 className="madimi-one-regular">JetBlogger</h1>
      </Link>
      <div className="links">
        {!authUser ? (
          <GoogleLogin />
        ) : (
          <>
            <Link to="/create" className="bubble">
              New Blog <FontAwesomeIcon icon={faPlus} />
            </Link>
            <Link
              className="account-button-container"
              to="/account"
            >
              <button className="account-button">
                <FontAwesomeIcon icon={faCircleUser} />
              </button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
