import React, { useRef, useState } from 'react'
import { IoTrashOutline } from "react-icons/io5";
import { db } from '../../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';

function ModalDeleteListing({onClose, reportId, listingId, onReportUpdate}) {
    const modalRef = useRef();
    const [reason, setReason] = useState('');

    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    const handleDelete = async () => {
        try {
            const reportRef = doc(db, 'reportsListing', reportId);
            const listingRef = doc(db, 'listings', listingId);
            
            // Update the report in Firestore
            await updateDoc(reportRef, {
                reason: reason,
                action: 'deleted',
                reportStat: 'resolved'
            });

            // Update the post status in Firestore
            await updateDoc(listingRef, {
                status: 'inactive'
            });

            onReportUpdate({ id: reportId });
            onClose();
            alert('Post deleted');

        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

  return (
    <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
        <div className='mt-10 flex flex-col gap-5 text-black bg-white px-5 py-5 flex justify-center items-center rounded-xl'>
            <IoTrashOutline size={50}/>
            
            <h1 className='text-3xl font-extrabold'>Confirm Delete</h1>
            <p className='text-center'> Are you sure you want to delete this listing? <br/> It will not be delete permanently but deactivated</p>
            <input 
                type="text" 
                placeholder='Reason to delete?'
                required
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className='w-full px-4 py-3 text-black border-gray-300 rounded-md shadow-md'
            />
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

export default ModalDeleteListing