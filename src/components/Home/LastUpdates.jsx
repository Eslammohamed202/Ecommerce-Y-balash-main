import React from 'react'
import Link from 'next/link'

const LastUpdates = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 container lg:mb-12 mb-6">
      <h2 className="text-2xl font-bold mb-6">Latest Updates</h2>
      
      {/* Update 1 */}
      <div className="mb-1 pb-6 border-b border-gray-200">
        <h3 className="font-semibold text-lg mb-2">New Feature: Bulk Upload</h3>
        <p className="text-gray-600 mb-3">
          Upload multiple products at once using our new Excel template.
        </p>
        <p className="text-sm text-gray-400">2 hours ago</p>
      </div>
      
      {/* Update 2 */}
      <div className="mb-6 pb-6 border-b border-gray-200">
        <h3 className="font-semibold text-lg mb-2">Enhanced Analytics</h3>
        <p className="text-gray-600 mb-3">
          Check out the new analytics dashboard with more insights.
        </p>
        <p className="text-sm text-gray-400">1 day ago</p>
      </div>
      
      {/* View All Link */}
      <Link href="/Notifications" className="text-blue-500 hover:text-blue-700 font-medium">
        View All
      </Link>
    </div>
  )
}

export default LastUpdates