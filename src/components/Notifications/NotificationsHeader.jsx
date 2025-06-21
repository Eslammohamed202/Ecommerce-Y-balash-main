import React from 'react'

const NotificationsHeader = () => {
    return (
        <div className='w-full bg-gray-50'>
            <div className="container flex justify-between  px-4  flex-col lg:flex-row items-center gap-4  p-4 rounded-xl shadow-sm">
                <h2 className="lg:text-2xl md:text-lg text-md text-Main font-bold lg:mb-4 mb-2">Notifications</h2>
                <div className='flex gap-2'>
                    <button className="text-blue-500 hover:underline  py-1 px-2 items-center justify-center  rounded-lg">Mark all as read</button>
                    <button className="bg-Main text-white hover:underline py-1 px-2 items-center justify-center  rounded-lg">All</button>
                    <button className="bg-gray-200 hover:underline py-1 px-2 items-center justify-center  rounded-lg">Unread</button>
                    <button className="bg-gray-200 hover:underline py-1 px-2 items-center justify-center  rounded-lg">read</button>


                </div>
            </div>
        </div>

    )
}

export default NotificationsHeader