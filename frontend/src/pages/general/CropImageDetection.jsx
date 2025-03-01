import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CropDetectionLayout from '../../components/general/cropImageDetection/CropDetectionLayout'

function CropImageDetection() {
  const getUser = () => {
    const user = localStorage.getItem("user");
    return user ? true : false;
  };
  const user = getUser(); 
  return (
    <>
        <Navbar />
        <CropDetectionLayout user={{ email: user.email, name: user.name, role: user.role }} />
        <Footer />
    </>
  )
}

export default CropImageDetection
