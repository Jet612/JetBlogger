import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid'
import { Link } from 'react-router-dom';


const Navbar = () => {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                <h1 className="madimi-one-regular">Blogger</h1>
            </Link>
            <div className="links">
                <Link to="/create" className="bubble">New Blog <FontAwesomeIcon icon={faPlus} /></Link>
            </div>
        </nav>
    );
}

export default Navbar;
