import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase.config';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import PendingReports from '../components/Posts/PendingReports';
import ResolvedReports from '../components/Posts/ResolvedReports';

const Posts = () => {
  const navigate = useNavigate();
  const { user, userData } = useAuth();
  const [reports, setReports] = useState([]);
  const [pendingReports, setPendingReports] = useState([]);
  const [resolvedReports, setResolvedReports] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [dataChanged, setDataChanged] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    const fetchReports = async () => {
      const reportsCollection = collection(db, 'reports');
      const reportsSnapshot = await getDocs(reportsCollection);
      const reportsList = await Promise.all(
        reportsSnapshot.docs.map(async (reportDoc) => {
          const reportData = {
            id: reportDoc.id,
            ...reportDoc.data(),
          };
          const reporterDoc = await getDoc(doc(db, 'users', reportData.reportedBy));
          const postDoc = await getDoc(doc(db, 'posts', reportData.postId));
          console.log('postdocc:',postDoc.data().userId)

          console.log('reportdata:',reportData)
          return {
            id: reportDoc.id,
            postId: reportData.postId,
            posterName: postDoc.exists() ? postDoc.data().userName : 'Unknown', 
            posterEmail: postDoc.exists() ? postDoc.data().userEmail : 'Unknown',
            reporterName: reporterDoc.exists() ? reporterDoc.data().name : 'Unknown',
            reporterEmail: reporterDoc.exists() ? reporterDoc.data().email : 'Unknown',
            numImages: postDoc.exists() ? postDoc.data().images.length : 0,
            reportTime: reportData.timestamp,
            postTime: postDoc.exists() ? postDoc.data().timestamp : null,
            postText: postDoc.exists() ? postDoc.data().text : null,
            postImages: postDoc.exists() ? postDoc.data().images : null,
            status: reportData.reportStat,
            action: reportData.action,
            reason: reportData.reason
          };
        })
      );

      console.log("Reports Listsd: ", reportsList[0]);  // Log to check the reportsLis

      const pending = reportsList
      .filter(report => {
        console.log("Filtering Pending: ", report.status);
        return report.status === 'pending';
      })
      .sort((a, b) => a.timestamp - b.timestamp);  // Ascending order

    const resolved = reportsList
      .filter(report => {
        console.log("Filtering Resolved: ", report.status);
        return report.status === 'resolved';
      })
      .sort((a, b) => b.timestamp - a.timestamp);  // Descending order
      
      setReports(reportsList);
      setPendingReports(pending);
      setResolvedReports(resolved);




      // setReports(reportsList);
      // setPendingReports(reportsList.filter(report => report.status === 'pending'));
      // setResolvedReports(reportsList.filter(report => report.status === 'resolved'));
    };

    fetchReports();
  }, [dataChanged]);

  const handleReportUpdate = (updatedReport) => {
    setReports(prevReports => {
      const newReports = prevReports.map(report => report.id === updatedReport.id ? updatedReport : report);

      const pending = newReports.filter(report => report.status === 'pending').sort((a, b) => a.timestamp - b.timestamp);
      const resolved = newReports.filter(report => report.status === 'resolved').sort((a, b) => b.timestamp - a.timestamp);

      setPendingReports(pending);
      setResolvedReports(resolved);

      return newReports;
    });
    setDataChanged(prev => !prev);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Post Reports</h1>
      <div className="flex mb-4">
        <button
          className={`px-4 py-2 ${activeTab === 0 ? 'bg-blue-500 text-white rounded-xl hover:bg-blue-600' : 'bg-gray-300 rounded-xl hover:bg-gray-200'}`}
          onClick={() => setActiveTab(0)}
        >
          Pending
        </button>
        <button
          className={`px-4 py-2 ml-2 ${activeTab === 1 ? 'bg-blue-500 text-white rounded-xl hover:bg-blue-600' : 'bg-gray-300 rounded-xl hover:bg-gray-200'}`}
          onClick={() => setActiveTab(1)}
        >
          Resolved
        </button>
      </div>
      {activeTab === 0 && <PendingReports reports={pendingReports} onReportUpdate={handleReportUpdate} />}
      {activeTab === 1 && <ResolvedReports reports={resolvedReports}  />}
    </div>
  )
}

export default Posts