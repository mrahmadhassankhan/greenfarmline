import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CropDetectionLayout from '../../components/general/cropImageDetection/CropDetectionLayout'

function CropImageDetection() {
  const userEmail = localStorage.getItem('email');
  const userName = localStorage.getItem('name');
  const userRole = localStorage.getItem('role');
  return (
    <>
        <Navbar />
        <CropDetectionLayout user={{ email: userEmail, name: userName, role: userRole }} />
        <Footer />
    </>
  )
}

export default CropImageDetection