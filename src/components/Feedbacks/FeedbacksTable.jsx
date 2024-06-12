import React, { useState } from 'react';

const FeedbacksTable = ({ feedbacks }) => {
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
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-6 w-full">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="py-2 px-4 border-b">No.</th>
            <th className="py-2 px-4 border-b">User Name</th>
            <th className="py-2 px-4 border-b">User Email</th>
            <th className="py-2 px-4 border-b">Feedback</th>
            <th className="py-2 px-4 border-b">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((feedback, index) => (
              <tr key={feedback.id} className="bg-white">
                <td className="py-2 px-4 border-b text-center">{page * rowsPerPage + index + 1}</td>
                <td className="py-2 px-4 border-b">{feedback.userName}</td>
                <td className="py-2 px-4 border-b">{feedback.userEmail}</td>
                <td className="py-2 px-4 border-b">{feedback.feedback}</td>
                <td className="py-2 px-4 border-b text-center">
                  {feedback.feedbackTime.toDate().toLocaleString('en-US')}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
            disabled={page >= Math.ceil(feedbacks.length / rowsPerPage) - 1}
            className="p-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbacksTable;
