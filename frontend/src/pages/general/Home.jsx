import React from "react";
import Navbar from "../../components/Navbar";
import Banner from "../../components/general/home/Banner";
import Footer from "../../components/Footer";
import Intro from "../../components/general/home/Intro";
import Services from "../../components/general/home/Services";
import Contact from "../../components/general/home/Contact";

function Home() {
  return (
    <>
      <Navbar />
      <Banner />
      <Intro />
      <Services />
      <Contact />
      <Footer />
    </>
  );
}

export default Home;
