import  { useState, FC, useEffect, useSyncExternalStore } from 'react';
import QuizList from '../../components/QuizList/QuizList';
import { Link } from 'react-router-dom';
import axios from '../../utils/axios'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logoutUser, setFaculties, setQuizzes, setStudents } from '../../store/slices/userSlice';
const Home: FC = () => {
  const [activeDifficulty, setActiveDifficulty] = useState<string>('all');
  const quizzSet = useSelector(state=>state?.quizzes);
  
  const faculties = useSelector(state=>state?.faculties);
  console.log('aa ',faculties);
  const students = useSelector(state=>state?.students);
  
  const token = useSelector(state=>state?.token);
  const dispatch = useDispatch();

  const getAllStudents = async () =>{
    try { 
      let res = await axios.get('api/student/students',{
        headers:{
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}`
        }
      });
      console.log('reso ',res.data);

      dispatch(setStudents(res.data));
    } catch (error) {
        if(error?.response?.status===401) dispatch(logoutUser())
    }
  }
  const getAllFaculties = async () =>{
    try { 
      let res = await axios.get('api/faculty/faculties',{
        headers:{
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}`
        }
      });
      dispatch(setFaculties(res.data));
    } catch (error) {
        if(error?.response?.status===401) dispatch(logoutUser())
    }
  }

  const getAllQuizzes = async () =>{
    try { 
        let res = await axios.get('api/student/quizzes',{
          headers:{
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
          }
        });
        dispatch(setQuizzes(res.data));
        
    } catch (error) {
        if(error?.response?.status===401) dispatch(logoutUser())
    }
  }


  useEffect(()=>{
    getAllStudents();
    getAllFaculties();
    getAllQuizzes();
  },[]);

  return (
    <>
      <div className='mt-24'>
        <h1 className='mb-5 text-4xl font-bold mx-auto lg:w-9/12 md:w-10/12 sm:w-11/12 w-11/12'>Dashboard</h1>
        <div className="mb-5 flex gap-3 lg:w-9/12 md:w-10/12 sm:w-11/12 w-11/12 mx-auto justify-around flex-wrap">
            <Link to='/students' className=' cursor-pointer flex flex-col px-8 py-8 shadow-xl rounded-lg lg:w-3/12 sm:w-11/12 md:w-6/12 w-11/12 '> <span className='font-bold text-4xl text-center'>Students</span> <span className='text-center text-2xl mt-3'>{students?.length}</span> </Link>
            <Link to='/faculties' className=' cursor-pointer flex flex-col px-8 py-8 shadow-xl rounded-lg lg:w-3/12 sm:w-11/12 md:w-6/12 w-11/12 '> <span className='font-bold text-4xl text-center'>Faculties</span> <span className='text-center text-2xl mt-3'>{faculties?.length}</span> </Link>
            <Link to='/quizzes' className=' cursor-pointer flex flex-col px-8 py-8 shadow-xl rounded-lg lg:w-3/12 sm:w-11/12 md:w-6/12 w-11/12 '> <span className='font-bold text-4xl text-center'>Quizzes</span> <span className='text-center text-2xl mt-3'>{quizzSet?.length}</span> </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
