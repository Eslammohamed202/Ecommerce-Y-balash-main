import Navbar from '@/components/Navbar/Navbar'
import SalesCharts from '@/components/sales analytics/SalesCharts'
import SalesHeader from '@/components/sales analytics/SalesHeader'
import SalesHero from '@/components/sales analytics/SalesHero'
import TopSelling from '@/components/sales analytics/TopSelling'
import React from 'react'

const page = () => {
  return (
    <div>
         <Navbar />
        <SalesHeader/>
        <SalesHero/>
        <SalesCharts/>
        <TopSelling/>
    </div>
  )
}

export default page