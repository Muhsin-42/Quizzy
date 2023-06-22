import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PageNotFound() {
  return (
    <div className="flex items-center justify-center px-2 md:px-0 min-h-screen">
      <div>
        <p className="text-xl  font-semibold text-black">404 error</p>
        <h1 className="mt-3 text-4xl font-semibold text-gray-800 md:text-5xl">
          We can&apos;t find that page
        </h1>
        <p className="mt-4 text-gray-500">
          Sorry, the page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-6 flex items-center space-x-3">
            <Link to={'/'}>
          <button
            type="button"
            className="inline-flex  items-center rounded-md border border-black px-3 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
            <ArrowLeft size={16} className="mr-2" />
            Go back
          </button>
              </Link>
        </div>
      </div>
    </div>
  )
}
