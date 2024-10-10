import React from "react";
import { Routes, Route } from "react-router-dom"
import Home from "./pages/general/Home";
import Contact from "./pages/general/Contact";
import About from "./pages/general/About";
import PrivacyPolicy from "./pages/general/PrivacyPolicy";
import Terms from "./pages/general/Terms";
import FAQ from "./pages/general/FAQ";
import RegisterUser from "./pages/general/RegisterUser";
import Login from "./pages/general/Login";

const App = () => {
  return (
    <>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />

        </Routes>
    </>
  )
}

export default App