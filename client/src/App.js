import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import LoadingBar from "./components/LoadingBar";
import TripOverview from "./pages/TripOverview";
import "./App.css";

function App() {
  return (
    <Router>
      <LoadingBar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/trip/:id" element={<TripOverview />} />

      </Routes>
    </Router>
  );
}

export default App;


