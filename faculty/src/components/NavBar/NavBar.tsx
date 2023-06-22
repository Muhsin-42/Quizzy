import './navBar.scss';
import './main.js';
import MenuBar from '../Menu/Menu.tsx';
import { Link } from 'react-router-dom';

export const NavBar = () => {
    return (
        <>
            <nav id="navbar" className="navbarM">
                <div className="left-nav">
                    <MenuBar />
                    <a data-scroll="home" href="#home" className="active mx-10 text-3xl truncate"> Quizzy </a>
                </div>
                <div className="right-nav">
                    <Link to={'/addquiz'}>
                        <span className='text-purple-500 font-bold text-xl cursor-pointer'>Add Quiz</span>
                    </Link>
                </div>
            </nav>
        </>
    );
}