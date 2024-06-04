import React, { useRef } from 'react'
import { RiTailwindCssFill } from "react-icons/ri";
import { db } from '../../firebase.config';
import { doc, updateDoc } from 'firebase/firestore';

function ModalIgnore({onClose, reportId, onReportUpdate}) {
    const modalRef = useRef();
    const closeModal = (e) => {
        if (modalRef.current === e.target) {
            onClose();
        }
    }

    const handleIgnore = async () => {
        try {
            const reportRef = doc(db, 'reports', reportId);
            
            // Update the report in Firestore
            await updateDoc(reportRef, {
                action: 'ignored',
                reportStat: 'resolved'
            });

            onReportUpdate({ id: reportId });
            onClose();
            alert('Report Igored');

        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };


  return (
    <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center '>
        <div className='mt-10 flex flex-col gap-5 text-black bg-white px-5 py-5 flex justify-center items-center rounded-xl'>
            <RiTailwindCssFill size={50}/>
            
            <h1 className='text-3xl font-extrabold'>Confirm Ignore</h1>
            <p className='text-center'> Are you sure you want to ignore this report? <br/> This action will ignore the post and it will still publish in public</p>
            <div>
                <button onClick={handleIgnore} className='bg-blue-400 text-white px-4 py-2 rounded shadow-md cursor-pointer outline-none border-none select-none hover:bg-blue-300 mr-2'>
                    Ignore
                </button>
                <button onClick={onClose} className='bg-gray-400 text-white px-4 py-2 rounded shadow-md cursor-pointer outline-none border-none select-none hover:bg-gray-300'>
                    Cancel
                </button>
            </div>
        </div>
    </div> 
  )
}

export default ModalIgnore