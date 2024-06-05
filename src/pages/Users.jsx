import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SearchBar from '../components/Users/SearchBar';
import UsersTable from '../components/Users/UserTables';
import { db } from '../firebase.config';
import { collection, getDocs } from 'firebase/firestore';

const Users = () => {
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const userSnapshot = await getDocs(usersCollection);
      const userList = userSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setUsers(userList);
      setFilteredUsers(userList);
    };

    fetchUsers();
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
      <h1 className='text-2xl font-bold'>Users' Informations</h1>
      <SearchBar onSearch={handleSearch} />
      <UsersTable users={filteredUsers} />
    </div>
    
  )
}

export default Users