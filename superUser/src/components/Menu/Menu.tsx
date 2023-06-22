import './menu-bar.scss';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/userSlice';

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
          <Link to="/students" style={{animationDelay: '0.5s'}} onClick={toggleMenu}>Students</Link>
          <Link to="/faculties" style={{animationDelay: '0.5s'}} onClick={toggleMenu}>Faculties</Link>
          <Link to="/quizzes" style={{animationDelay: '0.5s'}} onClick={toggleMenu}>Quizzes</Link>
          <Link to="/login" style={{animationDelay: '0.5s'}} onClick={handleLogout}>Logout</Link>
        </div>
      </div>
    </>
  );
}

export default MenuBar;
