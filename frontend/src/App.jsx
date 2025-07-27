import React from "react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext"; // Adjust path as needed
import HomePage from "./Pages/HomePage";
import ItemsFound from "./Pages/ItemsFound";
import SignUp from "./Components/SignUp";
import PickupGuidelines from "./Pages/PickupGuidelines";
import ReportItem from "./Components/ReportItem";
import Login from "./Components/Login";
import ContactUs from "./Pages/ContactUs";

const App = () => {
  return (
    <AuthProvider>
      <div className="text-xl w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pickup-guidelines" element={<PickupGuidelines />} />
          <Route path="/report" element={<ReportItem />} />
          <Route path="/browse" element={<ItemsFound />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </div>
    </AuthProvider>
  );
};

export default App;
