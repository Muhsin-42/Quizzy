import {FC, useState} from 'react'
import { SingleQuizCard } from "./SingleQuizCard";
import { useEffect } from "react";
import axios from '../../utils/axios'
import { logoutUser, setQuizzes } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

interface QuizListProps {
    difficulty: string
}


const QuizList: FC<QuizListProps> = ({ difficulty }) => {

  const [quizQuestions,setQuizQuestions] = useState([]);
  const token = useSelector((state:any)=>state?.token);
  const dispatch = useDispatch();

  const getAllQuizes = async () =>{
    try { 
        let res = await axios.get('api/student/quizzes',{
          headers:{
            "Content-Type": 'application/json',
            "Authorization": `Bearer ${token}`
          }
        });
        dispatch(setQuizzes(res.data));
        setQuizQuestions(res.data);
    } catch (error:any) {
        if(error?.response?.status===401) dispatch(logoutUser())
    }
  }

  useEffect(()=>{
    getAllQuizes();
  },[]);

    return (
      <>
        <div className="flex mb-20 gap-5 justify-around flex-wrap lg:w-9/12 md:w-10/12 sm:w-11/12 w-11/12 mx-auto">
          {quizQuestions.map((question:any, index) =>
            question?.difficulty === difficulty || difficulty==='all' ? (
              <SingleQuizCard key={index} question={question} />
            ) : null
          )}
        </div>
      </>
    );
  };
export default QuizList;