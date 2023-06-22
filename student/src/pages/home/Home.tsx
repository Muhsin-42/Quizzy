import  { useState, FC } from 'react';
import QuizList from '../../components/QuizList/QuizList';

const Home: FC = () => {
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');

  return (
    <>
      <div className='mt-24'>
        <h1 className='mb-5 text-4xl font-bold mx-auto lg:w-9/12 md:w-10/12 sm:w-11/12 w-11/12'>Quizzes</h1>
        <div className="mb-5 flex gap-3 lg:w-9/12 md:w-10/12 sm:w-11/12 w-11/12 mx-auto">
          <button className={`${activeDifficulty==='all'?'bg-purple-500 text-white':'bg-purple-300'} px-3 py-1 rounded-xl `} onClick={() => setActiveDifficulty('all')}>All</button>
          <button className={`${activeDifficulty==='easy'?'bg-purple-500 text-white':'bg-purple-300'} px-3 py-1 rounded-xl `} onClick={() => setActiveDifficulty('easy')}>Easy</button>
          <button className={`${activeDifficulty==='medium'?'bg-purple-500 text-white':'bg-purple-300'} px-3 py-1 rounded-xl `} onClick={() => setActiveDifficulty('medium')}>Medium</button>
          <button className={`${activeDifficulty==='hard'?'bg-purple-500 text-white':'bg-purple-300'} px-3 py-1 rounded-xl `} onClick={() => setActiveDifficulty('hard')}>Hard</button>
        </div>
        <QuizList difficulty={activeDifficulty} />
      </div>
    </>
  );
};

export default Home;
