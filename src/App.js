import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import MainScreen from "./components/MainScreen";
import BinFinder from "./pages/BinFinder";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import Listings from "./pages/Listings";
import Dashboard from "./pages/Dashboard";
import Feedbacks from "./pages/Feedbacks";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainScreen />}>
          <Route index element={<Dashboard/>}/>
          <Route path="users" element={<Users/>}/>
          <Route path="posts" element={<Posts/>}/>
          <Route path="listings" element={<Listings/>}/>
          <Route path="binFinder" element={<BinFinder/>}/>
          <Route path="feedback" element={<Feedbacks/>}/>
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
