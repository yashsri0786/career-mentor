export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0 bg-gray-900 rounded-lg p-2">
            <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V7.3l7-3.11v8.8z"/>
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">CareerMentor</h1>
            <p className="text-sm text-gray-600">AI-Powered Career Advisory Platform</p>
          </div>
        </div>
      </div>
    </header>
  );
}
