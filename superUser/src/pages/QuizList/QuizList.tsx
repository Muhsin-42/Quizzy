import { useSelector } from 'react-redux';
import moment from 'moment';

const QuizzesList = () => {
  const quizzes = useSelector((state: any) => state?.quizzes);
  const formatDate = (dateString:string) => {
    const date = moment(dateString);
    return date.format('MMMM D');
  };
  return (
    <>
      <h1 className='mt-28 text-5xl  w-9/12 mx-auto my-5'>Quizzes</h1>
      <div className='flex justify-center mb-10'>
        <table className='w-full rounded-2xl overflow-hidden max-w-4xl bg-purple-300 border shadow-2xl  m-auto '>
          <thead className='table-header-group'>
            <tr>
              <th className='py-2 px-4 border-b'>Title</th>
              <th className='py-2 px-4 border-b'>Description</th>
              <th className='py-2 px-4 border-b'>Difficulty</th>
              <th className='py-2 px-4 border-b'>Tags</th>
              <th className='py-2 px-4 border-b'>Created Date</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {quizzes?.map((quiz: any, index: number) => (
              <tr key={index}>
                <td className='py-2 px-4 border-b'>{quiz?.title}</td>
                <td className='py-2 px-4 border-b'>{quiz?.description}</td>
                <td className='py-2 px-4 border-b'>{quiz?.difficulty}</td>
                <td className='py-2 px-4 border-b'>{quiz?.tags.join(', ')}</td>
                <td className='py-2 px-4 border-b'>{formatDate(quiz?.createdAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default QuizzesList;
