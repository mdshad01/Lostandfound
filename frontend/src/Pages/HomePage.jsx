import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import PickupGuidelines from "./PickupGuidelines";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <PickupGuidelines />
    </div>
  );
};

export default HomePage;
