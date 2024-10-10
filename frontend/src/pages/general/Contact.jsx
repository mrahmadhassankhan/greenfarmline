import React from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import ContactBanner from '../../components/general/contact/ContactBanner'
import ContactForm from '../../components/general/contact/ContactForm'
import ContactInfo from '../../components/general/contact/ContactInfo'

function Contact() {
  return (
    <>
        <Navbar />
        <ContactBanner />
        <ContactForm />
        <ContactInfo />
        <Footer />
    </>
  )
}

export default Contact