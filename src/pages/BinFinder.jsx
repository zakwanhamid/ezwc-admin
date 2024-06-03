import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BinFinder = () => {
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
        <h1>BinFinder</h1>
      </div>
    </div>
  )
}

export default BinFinder