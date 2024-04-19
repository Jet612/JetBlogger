import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid'
import { Link } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import { useUserContext } from './UserContext';

const Navbar = () => {
  const { authUser, handleSignOut } = useUserContext();

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
            <button className="bubble" onClick={handleSignOut}>
              Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
