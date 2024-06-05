import React, { useDebugValue, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase.config';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [userCount, setUserCount] = useState(0);
  const [binCount, setBinCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [listingCount, setListingCount] = useState(0);
  const [feedbackCount, setFeedbackCount] = useState(0);

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
      } catch (error) {
        console.error("Error fetching user count: ", error);
      }
    };

    fetchNumbers();
  }, []);



  return (
    <div>
      <div className="p-4">
        <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
      </div>
      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className='relative flex flex-row justify-between items-center p-4 border border-gray-300 rounded-lg mb-4 bg-green-300 bg-opacity-60 shadow'>
          <div>
              <h2 className="text-lg font-bold">Number of users</h2>
              <p className="text-2xl text-gray-500">{userCount}</p>
          </div>
        </div>
        <div className='relative flex flex-row justify-between items-center p-4 border border-gray-300 rounded-lg mb-4 bg-green-300 bg-opacity-60 shadow'>
          <div>
              <h2 className="text-lg font-bold">Number of bins</h2>
              <p className="text-2xl text-gray-500">{binCount}</p>
          </div>
        </div>
        <div className='relative flex flex-row justify-between items-center p-4 border border-gray-300 rounded-lg mb-4 bg-green-300 bg-opacity-60 shadow'>
          <div>
              <h2 className="text-lg font-bold">Number of posts</h2>
              <p className="text-2xl text-gray-500">{postCount}</p>
          </div>
        </div>
        <div className='relative flex flex-row justify-between items-center p-4 border border-gray-300 rounded-lg mb-4 bg-green-300 bg-opacity-60 shadow'>
          <div>
              <h2 className="text-lg font-bold">Number of listings</h2>
              <p className="text-2xl text-gray-500">{listingCount}</p>
          </div>
        </div>
        <div className='relative flex flex-row justify-between items-center p-4 border border-gray-300 rounded-lg mb-4 bg-green-300 bg-opacity-60 shadow'>
          <div>
              <h2 className="text-lg font-bold">Number of feedbacks</h2>
              <p className="text-2xl text-gray-500">{feedbackCount}</p>
          </div>
        </div>
      </div> 
    </div>
    


  )
}

export default Dashboard