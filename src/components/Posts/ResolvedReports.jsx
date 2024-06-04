import React, { useEffect, useState } from 'react'

export default function PendingReports({reports}) {
  const [filteredReports, setFilteredReports] = useState(reports);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [expandedRow, setExpandedRow] = useState(null);
  const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true };

//   useEffect(() => {
//     // Filter out resolved reports
//     setFilteredReports(reports.filter(report => report.reportStat === 'resolved'));
//   }, [reports]);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleChangePage = (newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    // Log the reports prop to inspect its contents
    console.log("PendingReports - reports prop:", reports);
  }, [reports]);

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-6 mt-4 w-full">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-green-500 text-white">
            <th className="py-2 px-4 border-b">No.</th>
            <th className="py-2 px-4 border-b">Post ID</th>
            <th className="py-2 px-4 border-b">Posted By</th>
            <th className="py-2 px-4 border-b">Reported By</th>
            <th className="py-2 px-4 border-b text-center">Action</th>
            <th className="py-2 px-4 border-b">Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((report, index) => (
                <React.Fragment key={report.id}>
                <tr className="cursor-pointer" onClick={() => handleRowClick(index)}>
                  <td className="py-2 px-4 border-b text-center">{page * rowsPerPage + index + 1}</td>
                  <td className="py-2 px-4 border-b">{report.postId}</td>
                  <td className="py-2 px-4 border-b text-center">{report.posterName}</td>
                  <td className="py-2 px-4 border-b text-center">{report.reporterName}</td>
                  <td className="py-2 px-4 border-b text-center">{report.action == 'deleted' ? `DELETED` : 'IGNORED'}</td>
                  <td className="py-2 px-4 border-b text-center">{report.reportTime.toDate().toLocaleString('en-US', options)}</td>
                </tr>
                {expandedRow === index && (
                  <tr className="bg-green-100">
                    <td colSpan="6" className="p-4">
                      <div className='relative'>
                        <div className='flex flex-row'>
                            <div className='mr-12'>
                                <div><strong>Poster name:</strong> {report.posterName}</div>
                                <div><strong>Poster Email:</strong> {report.posterEmail}</div>
                            </div>
                            <div>
                                <div><strong>Reporter name:</strong> {report.reporterName}</div>
                                <div><strong>Reporter email:</strong> {report.reporterEmail}</div>
                            </div>
                        </div>
                        <div>
                            <div><strong>Post time:</strong> {report.postTime.toDate().toLocaleString('en-US', options)}</div>
                            <div><strong>Post content:</strong> {report.postText}</div>
                            <div className='flex flex-row'>
                            <strong>Post images:</strong> 
                            {report.postImages && report.postImages.length > 0 ?
                                report.postImages.map((imageUri, index) => (
                                    <img src={imageUri} alt="" className="w-52 h-32 rounded m-2 " key={index} />
                                )) :
                                <span className="text-gray-500 ml-1">N/A</span>}
                            </div>
                        </div>
                        <div>
                            <div><strong>Reason:</strong> {report.reason}</div>
                        </div>
                      </div>
                      {/* Add more details as needed*/}
                    </td>
                  </tr>
                )}
              </React.Fragment>
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
            disabled={page >= Math.ceil(reports.length / rowsPerPage) - 1}
            className="p-2 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      
    </div>
  )
}
