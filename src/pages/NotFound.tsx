import { Link } from 'react-router-dom'
import { Leaf } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-navy-975 px-6 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-700">
        <Leaf className="h-7 w-7 text-white" />
      </div>
      <h1 className="mt-6 text-2xl font-extrabold text-white">Page not found</h1>
      <p className="mt-2 text-sm text-navy-500">The page you are looking for doesn&rsquo;t exist or was moved.</p>
      <Link
        to="/dashboard"
        className="mt-6 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-soft hover:shadow-lift"
      >
        Back to Dashboard
      </Link>
    </div>
  )
}
