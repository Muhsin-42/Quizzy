import './menu-bar.scss';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { logoutUser } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';

function MenuBar() {
  const toggleMenu = () => document.body.classList.toggle('open');
  
  const dispatch = useDispatch();
    
  const handleLogout = () =>{
      dispatch(logoutUser());
  }

  return (
    <>
      <button className="burger" onClick={toggleMenu}>
        <MenuIcon />
      </button>

      <div className="background"></div>
      <div className="menu menu-toggle">
        <div className='nav'>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/addquiz" style={{animationDelay: '0.3s'}} onClick={toggleMenu}>Add Quiz</Link>
          <Link to="#contactus" style={{animationDelay: '0.5s'}} onClick={toggleMenu}>Contact Us</Link>
          <Link to="/login" style={{animationDelay: '0.5s'}} onClick={handleLogout}>Logout</Link>
        </div>
      </div>
    </>
  );
} 

export default MenuBar;
