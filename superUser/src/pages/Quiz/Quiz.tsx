import { FC, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

interface IQuestions {
    question: string;
    options: string[];
    answer: number;
}
interface IQuizzes {
    _id: string;
    difficulty: string;
    title: string;
    description: string;
    totalQuestions: number;
    tags: string[];
    questions: IQuestions[];
}

export const Quiz: FC = () => {
    const { quizid } = useParams();
    const quizQuestions: IQuizzes[] = useSelector((state: RootState) => state.quizzes);
    const questionSet: IQuizzes | undefined = quizQuestions.find((document: IQuizzes) => document._id === quizid);

    const questions = questionSet?.questions;
    const [currentIndex, setCurrentIndex] = useState<number>(0);


    const currentQuestion = questions && questions[currentIndex];
    const [score, setScore] = useState<number>(0);
    const [selectedButton, setSelectedButton] = useState<number | null>(null);
    const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    const selectOption = (option: string, index: number) => {
        setSelectedButton(index);
        setCorrectAnswer(currentQuestion.answer - 1);

        if (index === currentQuestion.answer - 1) setScore((current) => current + 1)

        setTimeout(() => {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedButton(null);
                setCorrectAnswer(null);
                console.log(score);
            } else {
                setShowResult(true);
            }
        }, 1000)

    }

    return (
        <>
            <div className="mt-28 bg-purple-600 m-auto lg:w-7/12 md:w-9/12 sm:w-11/12 w-11/12 shadow-2xl rounded-2xl py-10 lg:px-20 sm:px-1 md:px-16 px-1">
                <h1 className="lg:text-6xl md:text-5xl sm:text-7xl text-4xl text-center text-white font-bold mb-4 break-words">
                    {questionSet?.title}
                </h1>
                <div>
                    {
                        !showResult ?
                            (
                                <>
                                    <h2 className="text-center text-xl text-white ">Question: {currentIndex + 1}/{questionSet?.totalQuestions}</h2>
                                    <p className="text-center text-3xl text-white">{currentQuestion?.question}</p>
                                    <div className="options flex flex-col">
                                        {currentQuestion?.options.map((option: string, index: number) => (

                                            <button key={index} onClick={() => selectOption(option, index)}
                                                className={`rounded-md py-3 px-2 m-2 mx-auto lg:w-1/2 md:w-7/12 sm:w-11/12 w-11/12  font-bold hover:scale-105 delay-300 
                                                ${correctAnswer === index ? 'bg-green text-white' : 'bg-white'}
                                                ${selectedButton === index && selectedButton !== correctAnswer ? 'bg-red text-white' : 'bg-white'} `}>
                                                {option}
                                            </button>

                                        ))}
                                    </div>
                                </>
                            )
                            :
                            (
                                <>
                                    <h2 className="text-center text-white text-3xl underline mt-10">Result</h2>
                                    <h3 className="text-center text-white text-3xl">Score : {score} </h3>
                                    <h3 className="text-center text-white text-3xl">Outof : {questions.length} </h3>

                                    <Link to={'/'} className="mt-3 w-full block  underline w text-center text-xl">Go Home</Link>
                                </>
                            )
                    }
                </div>
            </div>
        </>
    );
};