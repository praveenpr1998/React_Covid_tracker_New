import React from "react";
import "./Home.scss";
import Header from "../Header/Header";
import HomeContent from "../HomeContent/HomeContent";

function Home(props) {
  return (
    <div className="Home">
      <Header />
      <HomeContent />
    </div>
  );
}

export default Home;
