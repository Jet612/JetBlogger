import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@awesome.me/kit-a2ceb3a490/icons/classic/solid'


const Navbar = () => {
    return (
        <nav className="navbar">
            <a href="/" className="logo">
                <h1>Blogger</h1>
            </a>
            <div className="links">
                <button className="bubble">
                    New Blog <FontAwesomeIcon icon={faPlus} />
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
