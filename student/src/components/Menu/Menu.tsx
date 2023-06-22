import './menu-bar.scss';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

function MenuBar() {
  const toggleMenu = () => document.body.classList.toggle('open');
  return (
    <>
      <button className="burger" onClick={toggleMenu}>
        <MenuIcon />
      </button>

      <div className="background"></div>
      <div className="menu menu-toggle">
        <div className='nav'>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="#profile" style={{animationDelay: '0.3s'}} onClick={toggleMenu}>Profile</Link>
          <Link to="#contactus" style={{animationDelay: '0.5s'}} onClick={toggleMenu}>Contact Us</Link>
        </div>
      </div>
    </>
  );
}

export default MenuBar;
