import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CropDetectionLayout from '../../components/general/cropImageDetection/CropDetectionLayout'

function CropImageDetection() {
  const userEmail = JSON.parse(localStorage.getItem("user")).email;
  const userName = JSON.parse(localStorage.getItem("user")).name;
  const userRole = JSON.parse(localStorage.getItem("user")).role;
  return (
    <>
        <Navbar />
        <CropDetectionLayout user={{ email: userEmail, name: userName, role: userRole }} />
        <Footer />
    </>
  )
}

export default CropImageDetection