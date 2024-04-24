import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faLeftFromBracket, faCircleUser, faX } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid'
import { Link } from 'react-router-dom';
import GoogleLogin from './GoogleLogin';
import { useUserContext } from '../utils/UserContext';
import { useState } from 'react';
import '../styles/navbar.css';
import DisplayUsername from './DisplayUsername';

const Navbar = () => {
  const { authUser, handleSignOut } = useUserContext();
  const [isAccountBoxVisible, setIsAccountBoxVisible] = useState(false);

  const toggleAccountBoxVisibility = () => {
    setIsAccountBoxVisible((prevVisibility) => !prevVisibility);
  };

  const onSignOut = () => {
    handleSignOut();
    setIsAccountBoxVisible(false);
  }

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
            <div
              className="account-button-container"
              onClick={toggleAccountBoxVisibility}
            >
              <button className="account-button">
                <FontAwesomeIcon icon={faCircleUser} />
              </button>
            </div>
          </>
        )}
        {isAccountBoxVisible && authUser && (
          <div className="account-box-container">
            <div className="account-box">
              <button onClick={toggleAccountBoxVisibility} className='account-box-close'>
                <FontAwesomeIcon icon={faX} />
              </button>
              <h2>Account Information</h2>
              <div className="account-box-text">
                <p>Email: {authUser.email}</p>
                <DisplayUsername userId={authUser.uid} prefix="Display Name: " />
              </div>
              <button className="bubble" onClick={onSignOut}>
                  Sign Out <FontAwesomeIcon icon={faLeftFromBracket} />
                </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
