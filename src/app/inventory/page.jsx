// import CustomDropdownsIn from '@/components/inventory/CustomDropDownIn'
import InventoryHeader from '@/components/inventory/InventoryHeader'
import InventoryHero from '@/components/inventory/InventoryHero'
import Product from '@/components/inventory/Product'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

const page = () => {
  return (
    <div>
         <Navbar />
      <InventoryHeader/>
      <InventoryHero/>
      {/* <CustomDropdownsIn/> */}
      <Product/>
    </div>
  )
}

export default page