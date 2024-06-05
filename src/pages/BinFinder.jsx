import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import BinInfo from '../components/BinFinder/BinInfo';
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';
import ModalCreateBin from '../components/BinFinder/ModalCreateBin';

const BinFinder = () => {
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [bins, setBins] = useState([]);
  const [showModalCreateBin, setShowModalCreateBin] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const fetchBins = async () => {
    const binsCollection = collection(db, 'bins');
    const binsSnapshot = await getDocs(binsCollection);
    const binsList = binsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBins(binsList);
  };

  useEffect(() => {
    fetchBins();
  }, []);

  return (
    <div className="p-4">
      <h1 className='text-2xl font-bold mb-4'>BinFinder</h1>
      <div>
        <button onClick={() => setShowModalCreateBin(true)} className='bg-green-600 text-white px-4 py-2 rounded shadow-md cursor-pointer outline-none border-none select-none hover:bg-green-500 mr-2'>
          Create New Bin
        </button>
      </div>
      <div className='mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {bins.map((bin) => (
          <BinInfo 
            key={bin.id}
            bin = {bin}
            fetchBins={fetchBins}
          />
        ))}
      </div>
      {showModalCreateBin && (
        <ModalCreateBin
          onClose={() => setShowModalCreateBin(false)}
          fetchBins={fetchBins}
        />
      )}
    </div>
  )
}

export default BinFinder