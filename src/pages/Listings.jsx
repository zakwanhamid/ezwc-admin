import React, { useEffect, useState  } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase.config';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import PendingReportListing from '../components/Listings/PendingReportListing';
import ResolvedReportListing from '../components/Listings/ResolvedReportListing';

const Listings = () => {
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
      const reportsCollection = collection(db, 'reportsListing');
      const reportsSnapshot = await getDocs(reportsCollection);
      const reportsList = await Promise.all(
        reportsSnapshot.docs.map(async (reportDoc) => {
          const reportData = {
            id: reportDoc.id,
            ...reportDoc.data(),
          };
          const reporterDoc = await getDoc(doc(db, 'users', reportData.reportedBy));
          const listingDoc = await getDoc(doc(db, 'listings', reportData.listingId));
          console.log('listingdochb:',listingDoc.data().userEmail)

          console.log('reportdata:',reportData.timestamp)
          console.log('reportersdata:',reporterDoc.data().reason)
          console.log('rlisitngssdata:',listingDoc.data().price)
          return {
            id: reportDoc.id,
            listingId: reportData.listingId,
            sellerName: listingDoc.exists() ? listingDoc.data().userName : 'Unknown',
            sellerEmail: listingDoc.exists() ? listingDoc.data().userEmail : 'Unknown',
            reporterName: reporterDoc.exists() ? reporterDoc.data().name : 'Unknown',
            reporterEmail: reporterDoc.exists() ? reporterDoc.data().email : 'Unknown',
            listingCategory: listingDoc.exists() ? listingDoc.data().category: 'Unknown',
            reportTime: reportData.timestamp,
            listingTime: listingDoc.exists() ? listingDoc.data().timestamp : null,
            listingTitle: listingDoc.exists() ? listingDoc.data().title : null,
            listingDesc: listingDoc.exists() ? listingDoc.data().desc : null,
            listingImage: listingDoc.exists() ? listingDoc.data().image : null,
            listingPrice: listingDoc.exists() ? listingDoc.data().price : null,
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


      console.log("Pending Filtered Reports: ", pending);  // Log pending filtered reportew
      console.log("Resolved Filtered Report: ", resolved);  // Log resolved filtered report

      setReports(reportsList);
      setPendingReports(pending);
      setResolvedReports(resolved);
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
      <h1 className="text-2xl font-bold mb-4">Listing Reports</h1>
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
      {activeTab === 0 && <PendingReportListing reports={pendingReports} onReportUpdate={handleReportUpdate} />}
      {activeTab === 1 && <ResolvedReportListing reports={resolvedReports}  />}
    </div>
  )
}

export default Listings