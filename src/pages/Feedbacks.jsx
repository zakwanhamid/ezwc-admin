import React, { useEffect, useState } from 'react';
import SearchBar from '../components/Users/SearchBar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import FeedbacksTable from '../components/Feedbacks/FeedbacksTable';

const Feedbacks = () => {
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const feedbacksCollection = collection(db, 'feedbacks');
      const feedbacksSnapshot = await getDocs(feedbacksCollection);
      const feedbacksList = await Promise.all(
        feedbacksSnapshot.docs.map(async (feedbackDoc) => {
          const feedbackData = {
            id: feedbackDoc.id,
            ...feedbackDoc.data(),
          };
          const userDoc = await getDoc(doc(db, 'users', feedbackData.userId));

          return {
            id: feedbackDoc.id,
            userName: userDoc.exists() ? userDoc.data().name : 'Unknown',
            userEmail: userDoc.exists() ? userDoc.data().email : 'Unknown',
            feedbackTime: feedbackData.timestamp,
            feedback: feedbackData.feedback
          };
        })
      );

      setFeedbacks(feedbacksList);
    };

    fetchFeedbacks();
  }, []);

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user =>
        user.name.toLowerCase().startsWith(term.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  };

  return (
    <div className="p-4">
      <h1 className='text-2xl font-bold mb-4'>Feedbacks</h1>
      <SearchBar onSearch={handleSearch} />
      <FeedbacksTable feedbacks={feedbacks} />
    </div>
  );
};

export default Feedbacks;
