import { FC, useState} from "react";
import { Box, TextField, Select, MenuItem, Autocomplete} from '@mui/material';
import axios from '../../utils/axios'
import { useSelector } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

interface QuizQuestion {
    question: string;
    options: string[];
    answer: number;
}

const AddQuiz: FC = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [totalQuestions, setTotalQuestion] = useState(0);
    const [tags, setTags] = useState<string[]>([]);
    const faculty = useSelector((state: any) => state.user);
    const token = useSelector((state: any) => state.token);
    const dispatch = useDispatch();
    const navigate = useNavigate();
  
  
      const handleQuestionChange = (
        index: number,
        field: string,
        value: string
      ) => {
        setQuestions((prevQuestions) => {
          const updatedQuestions = [...prevQuestions];
          updatedQuestions[index] = {
            ...updatedQuestions[index],
            [field]: value,
          };
          return updatedQuestions;
        });
      };
    
      const handleAnswerChange = (index: number, answer: string) => {
        setQuestions((prevQuestions) => {
          const updatedQuestions = [...prevQuestions];
          updatedQuestions[index].answer = Number(answer);
          return updatedQuestions;
        });
      };
    
      const handleOptionChange = (
        index: number,
        optionIndex: number,
        value: string
      ) => {
        setQuestions((prevQuestions) => {
          const updatedQuestions = [...prevQuestions];
          const options = updatedQuestions[index].options || [];
          options[optionIndex] = value;
          updatedQuestions[index].options = options;
          return updatedQuestions;
        });
      };
    
      const handleSubmit = async (event: React.FormEvent) => {
        try {
          event.preventDefault();
    
          const quizSet = {
            title,
            description,
            difficulty,
            totalQuestions,
            tags,
            questions,
          };
    
          if(faculty){
              await axios.post(
                `api/faculty/quiz/${faculty?._id}`,
                quizSet,
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
          } 
          navigate('/');
          
        } catch (error:any) {
          if (error?.response?.status === 401) dispatch(logoutUser());
        }
      };
    
      const handleChange = (event: any) => {
        setDifficulty(event.target.value as string);
      };
    
    const handleKeyDown = (event:any) => {
        if (event.key === ' ' && event.target.value.trim() !== '') {
            setTags([...tags, event.target.value.trim()]);
            event.target.value = '';
        }
    };
    
    return (
        <>
            <div id="addQuiz" className="mt-28 shadow-2xl rounded-lg p-10 lg:w-7/12 mx-auto flex flex-col  ">
                <Box component="form" className=" w-full  flex flex-col gap-4 " onSubmit={handleSubmit} noValidate >
                    <TextField value={title} onChange={(e) => setTitle(e.target.value)} required fullWidth className="w-9/12 bg-white rounded-xl " id="outlined-required" label="Title" defaultValue="" />
                    <TextField value={description} onChange={(e) => setDescription(e.target.value)} required fullWidth id="outlined-required" label="description" defaultValue="" />
                    <Select labelId="demo-simple-select-label" id="demo-simple-select" value={difficulty} label="Difficulty" placeholder="difficulty" onChange={handleChange}>
                        <MenuItem value={'easy'}>Easy</MenuItem>
                        <MenuItem value={'medium'}>Medium</MenuItem>
                        <MenuItem value={'hard'}>Hard</MenuItem>
                    </Select>

                    <Autocomplete multiple limitTags={2} id="multiple-limit-tags" options={tags}
                        getOptionLabel={(option) => option} value={tags}
                        onChange={(_event, newValue) => { setTags(newValue) }}
                        renderInput={(params) => (
                            <TextField  {...params} label="Tags" placeholder="Enter Tags" onKeyDown={handleKeyDown} />
                        )}
                    />
                    <TextField id="outlined-number" label="Total Questions" value={totalQuestions} onChange={(e) => setTotalQuestion(parseInt(e.target.value))} type="number" InputLabelProps={{ shrink: true, }} inputProps={{
                        min: 1,
                        max: 15,
                    }} />
                    {
                        Array.from({ length: totalQuestions }).map((_, index) => (
                            <div key={index} className="flex flex-col gap-1 shadow-xl my-3">
                                <TextField
                                    label={`Q${index + 1}`}
                                    onChange={(event) => handleQuestionChange(index, 'question', event.target.value)}
                                />
                                <div className="flex flex-wrap">
                                    {
                                        Array.from({ length: 4 }).map((_, optionIndex) => (
                                            <TextField
                                                key={optionIndex}
                                                className="w-6/12"
                                                label={`Option ${optionIndex + 1}`}
                                                onChange={(event) => handleOptionChange(index, optionIndex, event.target.value)}
                                            />
                                        ))
                                    }
                                    <TextField
                                        className="w-full"
                                        label={`Answer`}
                                        type="number"
                                        onChange={(event) => handleAnswerChange(index, event.target.value)}
                                        inputProps={{
                                            min: 1,
                                            max: 4,
                                        }}
                                    />
                                </div>
                            </div>
                        ))
                    }
                    <button type="submit" className="bg-green-500 px-4 py-2 rounded-lg text-white font-bold">CREATE QUIZ</button>
                </Box>
            </div>


        </>
    )
}


export default AddQuiz;