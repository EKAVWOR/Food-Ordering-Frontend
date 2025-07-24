// src/pages/Home.jsx

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import SliderSection from "../components/SliderSection";
import Footer from "../components/Footer";
import Swipe from "../components/Swipe";
import Header from "../components/Header";
import Analysis from "../components/Analysis";
import Partner from "../components/Partner";

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <Navbar />
      <Hero />
      <Swipe/>
      <SliderSection /> 
      <Partner/>    
      <Analysis/>
      <Footer />
    </div>
  );
};

export default Home;
