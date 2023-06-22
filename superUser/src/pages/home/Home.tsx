import  { useState, FC } from 'react';
import QuizList from '../../components/QuizList/QuizList';
import { Link } from 'react-router-dom';
const Home: FC = () => {
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');

  return (
    <>
      <div className='mt-24'>
        <h1 className='mb-5 text-4xl font-bold mx-auto lg:w-9/12 md:w-10/12 sm:w-11/12 w-11/12'>Dashboard</h1>
        <div className="mb-5 flex gap-3 lg:w-9/12 md:w-10/12 sm:w-11/12 w-11/12 mx-auto justify-around flex-wrap">
            <Link to='/students' className=' cursor-pointer flex flex-col px-8 py-8 shadow-xl rounded-lg lg:w-3/12 sm:w-11/12 md:w-6/12 w-11/12 '> <span className='font-bold text-4xl text-center'>Students</span> <span className='text-center text-2xl mt-3'>23</span> </Link>
            <Link to='/faculties' className=' cursor-pointer flex flex-col px-8 py-8 shadow-xl rounded-lg lg:w-3/12 sm:w-11/12 md:w-6/12 w-11/12 '> <span className='font-bold text-4xl text-center'>Faculties</span> <span className='text-center text-2xl mt-3'>23</span> </Link>
            <Link to='/quizzes' className=' cursor-pointer flex flex-col px-8 py-8 shadow-xl rounded-lg lg:w-3/12 sm:w-11/12 md:w-6/12 w-11/12 '> <span className='font-bold text-4xl text-center'>Quizzes</span> <span className='text-center text-2xl mt-3'>23</span> </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
