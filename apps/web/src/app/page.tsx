export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">
            Welcome to Laddrressa.ai
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-Powered Local Business Discovery Platform
          </p>
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              🚀 Deployment Successful!
            </h2>
            <p className="text-gray-600">
              Your Laddrressa.ai application is now live on Cloudflare Pages.
              Start building amazing local business discovery experiences.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}