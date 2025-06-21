import RecentOrders from '@/components/Home/RecentOrders';
import Navbar from '@/components/Navbar/Navbar';
import CustomDropdowns from '@/components/orders/CustomDropdowns';
import OrdersHeader from '@/components/orders/OrdersHeader';
import OrdersHero from '@/components/orders/OrdersHero';
import React from 'react'

const page = () => {
    return (
        <div className=' '>
            <Navbar />
            <OrdersHeader />
            <div className='container'>
                <OrdersHero />
                <div className='lg:mx-8'>
                    <RecentOrders />
                </div>

            </div>
        </div>
    )
}

export default page