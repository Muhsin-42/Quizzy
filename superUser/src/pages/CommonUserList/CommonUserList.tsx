import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const CommonUserList = () => {
  const students = useSelector((state: any) => state?.students);
  const faculties = useSelector((state: any) => state?.faculties);
  const location = useLocation();

  console.log('stuc ', students);

  return (
    <>
      <h1 className='mt-28 text-5xl  w-9/12 mx-auto my-5'>
        {location.pathname === '/faculties' ? 'Faculties' : 'Students'}
      </h1>
      <div className='flex justify-center'>
        <table className='w-full rounded-2xl overflow-hidden max-w-4xl bg-purple-300 border shadow-2xl  m-auto '>
          <thead className='table-header-group'>
            <tr>
              <th className='py-2 px-4 border-b'>No</th>
              <th className='py-2 px-4 border-b'>Name</th>
              <th className='py-2 px-4 border-b'>Email</th>
              <th className='py-2 px-4 border-b'>Role</th>
            </tr>
          </thead>
          <tbody className='text-center'>
            {location.pathname === '/faculties'
              ? faculties?.map((faculty: any, index: number) => (
                  <tr key={faculty?._id}>
                    <td className='py-2 px-4 border-b'>{index + 1}</td>
                    <td className='py-2 px-4 border-b'>{faculty?.fullname}</td>
                    <td className='py-2 px-4 border-b'>{faculty?.email}</td>
                    <td className='py-2 px-4 border-b'>Faculty</td>
                  </tr>
                ))
              : students?.map((student: any, index: number) => (
                  <tr key={student?._id}>
                    <td className='py-2 px-4 border-b'>{index + 1}</td>
                    <td className='py-2 px-4 border-b'>{student?.fullname}</td>
                    <td className='py-2 px-4 border-b'>{student?.email}</td>
                    <td className='py-2 px-4 border-b'>Student</td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CommonUserList;
