import React, { useState } from 'react'
import { IoTrashOutline } from "react-icons/io5";
import ModalDeleteBin from './ModalDeleteBin';

export default function BinInfo({bin, fetchBins}) {
    const [showModalDeleteBin, setShowModalDeleteBin] = useState(false);

    const handleDeleteClick = () => {
        setShowModalDeleteBin(true);
      };

  return (
    <div className='relative flex flex-row justify-between items-center p-4 border border-gray-300 rounded-lg mb-4 bg-white shadow'>
        <div>
            <h2 className="text-lg font-bold">{bin.title}</h2>
            <p className="text-sm text-gray-500">{bin.description}</p>
            <p className="text-sm">
            No. of Bin Available <br />
            <span className="text-xl font-bold">{bin.binNum}</span> ({bin.type})
            </p>
        </div>
        <button onClick={handleDeleteClick} className="absolute top-2 right-2 text-red-500">
            <IoTrashOutline size={23} />
        </button>

        {showModalDeleteBin && (
        <ModalDeleteBin
            bin={bin}
            onClose={() => setShowModalDeleteBin(false)}
            fetchBins={fetchBins}  
        />)}
    </div>
  )
}
