import './navBar.scss';
import './main.js';
import MenuBar from '../Menu/Menu.tsx';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/userSlice';
export const NavBar = () => {

    const dispatch = useDispatch();

    const handleLogout = () =>{
        dispatch(logoutUser());
    }

    return (
        <>
            <nav id="navbar" className="navbarM z-50">
                <div className="left-nav">
                    <MenuBar />
                    <Link data-scroll="home" to="/" className="active mx-10 text-3xl truncate"> Quizzy </Link>
                </div>
                <div className="right-nav">
                    <span onClick={handleLogout}>Logout</span>
                </div>  
            </nav>
        </>
    );
}