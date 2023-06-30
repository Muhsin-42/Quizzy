import './navBar.scss';
import './main.js';
import MenuBar from '../Menu/Menu.tsx';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../store/slices/userSlice.ts';

export const NavBar = () => {
    
    const dispatch = useDispatch();

    const handleLogout = () =>{
        dispatch(logoutUser());
    }
    return (
        <>
            <nav id="navbar" className="navbarM">
                <div className="left-nav">
                    <MenuBar />
                    <Link data-scroll="home" to="/" className="active mx-10 text-3xl truncate"> Quizzy </Link>
                </div>
                <div className="right-nav">
                    <Link to={'/addquiz'}>
                        <span className='text-purple-500 font-bold text-xl cursor-pointer'>Add Quiz</span>
                        <span onClick={handleLogout}>Logout</span>

                    </Link>
                </div>
            </nav>
        </>
    );
}