import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl sm:text-8xl font-bold text-primary-600 mb-4">404</h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link
          href="/"
          className="inline-block bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  )
}
