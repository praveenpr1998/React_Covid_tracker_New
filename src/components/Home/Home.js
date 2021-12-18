import React from "react";
import "./Home.scss";
import Header from "../Header/Header";
import HomeContent from "../HomeContent/HomeContent";

function Home() {

  // Home component has 2 child components 
  // Header component
  // Other contents part component
  
  return (
    <div className="Home">
      <Header />
      <HomeContent />
    </div>
  );
}

export default Home;
