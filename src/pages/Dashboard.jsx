import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import binMarkerIcon from '../assets/binMarker-selected.png'; // Adjust the path as needed

const customIcon = L.icon({
  iconUrl: binMarkerIcon,
  iconSize: [32, 40], // size of the icon
  iconAnchor: [16, 32], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -32] // point from which the popup should open relative to the iconAnchor
});

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [binCount, setBinCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [listingCount, setListingCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);
  const [bins, setBins] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchNumbers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const binsCollection = collection(db, 'bins');
        const postsCollection = collection(db, 'posts');
        const listingsCollection = collection(db, 'listings');
        const feedbacksCollection = collection(db, 'feedbacks');
        const usersSnapshot = await getDocs(usersCollection);
        const binsSnapshot = await getDocs(binsCollection);
        const postsSnapshot = await getDocs(postsCollection);
        const listingsSnapshot = await getDocs(listingsCollection);
        const feedbacksSnapshot = await getDocs(feedbacksCollection);
        const numberOfUsers = usersSnapshot.size; 
        const numberOfBins = binsSnapshot.size; 
        const numberOfPosts = postsSnapshot.size; 
        const numberOfListings = listingsSnapshot.size; 
        const numberOfFeedbacks = feedbacksSnapshot.size; 
        setUserCount(numberOfUsers);
        setBinCount(numberOfBins);
        setPostCount(numberOfPosts);
        setListingCount(numberOfListings);
        setFeedbackCount(numberOfFeedbacks);

        const binsList = binsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBins(binsList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchNumbers();
  }, []);

  return (
    <div>
      <div className="p-4">
        <h1 className='text-2xl font-bold'>Dashboard</h1>
      </div>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className='p-4 border border-green-300 rounded-lg mb-4 bg-white-300 shadow-lg'>
          <div>
              <h2 className="text-lg font-bold">Number of Users</h2>
              <p className="text-2xl text-gray-500">{userCount}</p>
          </div>
        </div>
        <div className='p-4 border border-green-300 rounded-lg mb-4 bg-white-300 shadow-lg'>
          <div>
              <h2 className="text-lg font-bold">Number of Bins</h2>
              <p className="text-2xl text-gray-500">{binCount}</p>
          </div>
        </div>
        <div className='p-4 border border-green-300 rounded-lg mb-4 bg-white-300 shadow-lg'>
          <div>
              <h2 className="text-lg font-bold">Number of Posts</h2>
              <p className="text-2xl text-gray-500">{postCount}</p>
          </div>
        </div>
        <div className='p-4 border border-green-300 rounded-lg mb-4 bg-white-300 shadow-lg'>
          <div>
              <h2 className="text-lg font-bold">Number of Listings</h2>
              <p className="text-2xl text-gray-500">{listingCount}</p>
          </div>
        </div>
        <div className='p-4 border border-green-300 rounded-lg mb-4 bg-white-300 shadow-lg'>
          <div>
              <h2 className="text-lg font-bold">Number of Feedbacks</h2>
              <p className="text-2xl text-gray-500">{feedbackCount}</p>
          </div>
        </div>
      </div> 
      <div className="mt-6">
        <MapContainer center={[5.3560, 100.2983]} zoom={16} style={{ height: '500px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {bins.map((bin) => (
            <Marker key={bin.id} position={[bin.latitude, bin.longitude]} icon={customIcon}>
              <Popup>
                <div>
                  <h2 className="font-bold">{bin.title}</h2>
                  <p>{bin.description}</p>
                  <p>Type: {bin.type}</p>
                  <p>Number of Bins: {bin.binNum}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default Dashboard;
