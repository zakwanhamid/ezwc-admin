import React from 'react';

const FeedbacksTable = ({ feedbacks }) => {
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
          {feedbacks.map((feedback, index) => (
            <tr key={feedback.id} className="bg-white">
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b">{feedback.userName}</td>
              <td className="py-2 px-4 border-b">{feedback.userEmail}</td>
              <td className="py-2 px-4 border-b">{feedback.feedback}</td>
              <td className="py-2 px-4 border-b text-center">{feedback.feedbackTime.toDate().toLocaleString('en-US')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbacksTable;
