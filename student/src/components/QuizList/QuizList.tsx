import {FC, useState} from 'react'
import { SingleQuizCard } from "./SingleQuizCard";
import { useEffect } from "react";
import axios from '../../utils/axios'
import { setQuizzes } from '../../store/slices/userSlice';
import { useDispatch } from 'react-redux';

interface QuizListProps {
    difficulty: string
}


const QuizList: FC<QuizListProps> = ({ difficulty }) => {

  const [quizQuestions,setQuizQuestions] = useState([]);
  const dispatch = useDispatch();

  const getAllQuizes = async () =>{
    let res = await axios.get('api/student/quizzes');
    console.log('res ',res.data);
    dispatch(setQuizzes(res.data));
    setQuizQuestions(res.data);
  }

  useEffect(()=>{
    getAllQuizes();
  },[]);

    return (
      <>
        <div className="flex gap-4 justify-around flex-wrap">
          {quizQuestions.map((question, index) =>
            question?.difficulty === difficulty || difficulty==='all' ? (
              <SingleQuizCard key={index} question={question} />
            ) : null
          )}
        </div>
      </>
    );
  };
export default QuizList;