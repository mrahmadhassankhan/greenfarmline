import React from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import CropDetectionLayout from '../../components/general/cropImageDetection/CropDetectionLayout'

function CropImageDetection() {
  return (
    <>
        <Navbar />
        <CropDetectionLayout user={{ id: '123', name: 'John Doe', role: 'farmer' }} />
        <Footer />
    </>
  )
}

export default CropImageDetection