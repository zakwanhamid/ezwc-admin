import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase.config';

export default function UsersTable({ users }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div className="">
      <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-6">
        <table className="min-w-full bg-white">
          <thead className='bg-green-500 text-white'>
            <tr>
              <th className="py-2 px-4 border-b">No.</th>
              <th className="py-2 px-4 border-b">User Name</th>
              <th className="py-2 px-4 border-b">User Email</th>
              <th className="py-2 px-4 border-b">User Phone Number</th>
              <th className="py-2 px-4 border-b">User Bio</th>
            </tr>
          </thead>
          <tbody>
            {users
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((user, index) => (
                <tr key={user.id}>
                  <td className="py-2 px-4 border-b">{page * rowsPerPage + index + 1}</td>
                  <td className="py-2 px-4 border-b">{user.name}</td>
                  <td className="py-2 px-4 border-b">{user.email}</td>
                  <td className="py-2 px-4 border-b text-center">{user.userHP ? `0${user.userHP}` : <span className="text-gray-500">N/A</span>}</td>
                  <td className="py-2 px-4 border-b">{user.bio ? `${user.bio}` : <span className="text-gray-500">N/A</span>}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <label>
            Rows per page:
            <select
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
              className="ml-2 border rounded p-1"
            >
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={100}>100</option>
            </select>
          </label>
        </div>
        <div>
          <button
            onClick={() => handleChangePage(page - 1)}
            disabled={page === 0}
            className="mr-2 p-2 border rounded disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={() => handleChangePage(page + 1)}
            disabled={page >= Math.ceil(users.length / rowsPerPage) - 1}
            className="p-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
