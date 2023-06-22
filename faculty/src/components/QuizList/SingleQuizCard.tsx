import { FC } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'


export const SingleQuizCard: FC = ({ question }) => {
  return (
    <>
      <div className="w-[300px] rounded-2xl border shadow-2xl cursor-pointer tilt-effects  hover:scale-105 delay-200 ease-in-out">
        <div className="p-10">
          <h1 className="inline-flex items-center text-lg font-semibold">{question?.title}</h1>
          <p className="mt-3 text-sm text-gray-600">{question?.description}</p>
          <div className="mt-4">
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-1xl font-semibold text-gray-900">
              #{question?.difficulty.toUpperCase()}
            </span>
          </div>
          <Link to={`/quiz/${question?._id}`}>
            <button
              type="button"
              className="mt-4 w-full rounded-sm bg-purple-600  px-2 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-700  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Take Quiz
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}
