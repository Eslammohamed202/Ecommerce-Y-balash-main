import LowHeader from '@/components/Low Stock/LowHeader'
import LowHero from '@/components/Low Stock/LowHero'
import LowStockCard from '@/components/Low Stock/LowStockCard'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
         <Navbar />
        <LowHeader/>
        <LowHero/>
        <LowStockCard/>
    </div>
  )
}

export default page