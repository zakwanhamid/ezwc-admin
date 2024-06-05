import * as React from 'react';
import { HiOutlineSearch } from "react-icons/hi";


export default function SearchBar({ onSearch }) {
    const handleInputChange = (event) => {
        onSearch(event.target.value);
        };

  return (
    <div className='pb-4'>
        <div className='bg-white w-80 rounded-lg h-[12] p-2 shadow-lg flex items-center mt-6 border border-green-300'>
            <HiOutlineSearch className='text-ezwcColor cursor-pointer'/>
            <input 
                type="text" 
                placeholder='Search by name' 
                className='bg-transparent border-none outline-none text-m ml-1 flex-1'
                onChange={handleInputChange}
            />
        </div>
    </div>
    
  );
}
