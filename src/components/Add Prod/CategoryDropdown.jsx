"use client"
import { useState } from 'react'
import { IoChevronDown } from 'react-icons/io5'  

const CategoryDropdown = () => {
  const [selectedCategory, setSelectedCategory] = useState('Select a category')
  const [isOpen, setIsOpen] = useState(false)

  const categories = ['Clothing', 'Electronics', 'Home', 'Books', 'Sports']

  return (
    <div className="w-full">
      <h1 className="text-Main font-bold lg:text-3xl text-2xl mb-4">Category</h1>

      {/* Dropdown container */}
      <div className="relative lg:w-3/4 w-full">
        {/* Button to toggle the dropdown */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-[70px] rounded-md bg-white px-4 text-left shadow-sm text-gray-700 font-medium border border-gray-300 focus:outline-none flex justify-between items-center"
        >
          <span>{selectedCategory}</span> 
          <IoChevronDown className="text-[#1C573E] lg:text-3xl text-xl" />  
        </button>

        {/* Dropdown options */}
        {isOpen && (
          <div className="absolute mt-1 w-full rounded-md bg-white shadow-lg z-10 max-h-60 overflow-auto">
            {categories.map((category, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setSelectedCategory(category)
                  setIsOpen(false)
                }}
                className="cursor-pointer select-none px-4 py-3 text-gray-700 hover:bg-[#1C573E] hover:text-white"
              >
                {category}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default CategoryDropdown
