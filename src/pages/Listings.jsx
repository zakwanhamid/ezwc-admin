import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Listings = () => {
  const navigate = useNavigate();
  const { user, userData } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div className="dashboard">
      <div className="content">
        <h1>Listings</h1>
      </div>
    </div>
  )
}

export default Listings