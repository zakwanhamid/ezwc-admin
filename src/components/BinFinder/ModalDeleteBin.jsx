import React, { useRef, useState } from 'react'
import { IoTrashOutline } from "react-icons/io5";
import { db } from '../../firebase.config';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';

function ModalDeleteBin({bin, onClose, fetchBins}) {
  const modalRef = useRef();

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
        onClose();
    }
  }
    
  const handleDelete = async () => {
    try {
        const binRef = doc(db, 'bins', bin.id);
        await deleteDoc(binRef);
        fetchBins(); // Re-fetch bins after deletion
        onClose();
        alert('Bin deleted');
    } catch (error) {
        console.error("Error deleting document: ", error);
    }
  };

  return (
    <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50'>
        <div className='mt-10 flex flex-col gap-5 text-black bg-white px-5 py-5 flex justify-center items-center rounded-xl'>
            <IoTrashOutline size={50}/>
            
            <h1 className='text-3xl font-extrabold'>Confirm Delete</h1>
            <p className='text-center'> Are you sure you want to delete this bin?</p>
            <div>
                <button onClick={handleDelete} className='bg-red-400 text-white px-4 py-2 rounded shadow-md cursor-pointer outline-none border-none select-none hover:bg-red-500 mr-2'>
                    Delete
                </button>
                <button onClick={onClose} className='bg-gray-400 text-white px-4 py-2 rounded shadow-md cursor-pointer outline-none border-none select-none hover:bg-gray-300'>
                    Cancel
                </button>
            </div>
        </div>
    </div> 
  )
}

export default ModalDeleteBin