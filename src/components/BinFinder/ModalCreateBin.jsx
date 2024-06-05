import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { db } from '../../firebase.config';
import { collection, addDoc } from 'firebase/firestore';
import L from 'leaflet';
import binMarkerIcon from '../../assets/binMarker-selected.png';

// Define your custom icon
const customIcon = L.icon({
  iconUrl: binMarkerIcon, // Replace with your icon URL
  iconSize: [32, 40], // size of the icon
  iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
});

function ModalCreateBin({ onClose, fetchBins }) {
  const modalRef = useRef();
  const [position, setPosition] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [binNum, setBinNum] = useState('');

  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const handleSave = async () => {
    try {
      await addDoc(collection(db, 'bins'), {
        title,
        description,
        type,
        binNum: parseInt(binNum),
        latitude: position.lat,
        longitude: position.lng,
      });
      fetchBins(); // Refresh bins
      onClose();
      alert('Bin created successfully');
    } catch (error) {
      console.error("Error creating bin: ", error);
    }
  };

  function LocationMarker() {
    const map = useMapEvents({
      click(e) {
        setPosition(e.latlng);
        map.flyTo(e.latlng, map.getZoom());
        console.log('Latitude:', e.latlng.lat, 'Longitude:', e.latlng.lng);
      },
    });

    return position === null ? null : (
      <Marker position={position} icon={customIcon}></Marker>
    );
  }

  return (
    <div ref={modalRef} onClick={closeModal} className='fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-50'>
      <div className='relative flex flex-col gap-5 text-black bg-white px-5 py-5 flex justify-center items-center rounded-xl max-w-screen-md mx-auto w-full'>
        <h1 className='text-2xl font-extrabold'>Create New Bin</h1>
        <MapContainer center={[5.3560, 100.2983]} zoom={16} style={{ height: '300px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <LocationMarker />
        </MapContainer>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='w-full px-4 py-3 text-black border-gray-300 rounded-md shadow-md'
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='w-full px-4 py-3 text-black border-gray-300 rounded-md shadow-md'
        />
        <input
          type="text"
          placeholder="Type"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className='w-full px-4 py-3 text-black border-gray-300 rounded-md shadow-md'
        />
        <input
          type="number"
          placeholder="Number of Bins"
          value={binNum}
          onChange={(e) => setBinNum(e.target.value)}
          className='w-full px-4 py-3 text-black border-gray-300 rounded-md shadow-md'
        />
        <div>
          <button onClick={handleSave} className='bg-green-400 text-white px-4 py-2 rounded shadow-md cursor-pointer outline-none border-none select-none hover:bg-green-500 mr-2'>
            Save
          </button>
          <button onClick={onClose} className='bg-gray-400 text-white px-4 py-2 rounded shadow-md cursor-pointer outline-none border-none select-none hover:bg-gray-300'>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCreateBin;
