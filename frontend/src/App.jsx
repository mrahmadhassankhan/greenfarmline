import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/general/Home";
import Contact from "./pages/general/Contact";
import About from "./pages/general/About";
import PrivacyPolicy from "./pages/general/PrivacyPolicy";
import Terms from "./pages/general/Terms";
import FAQ from "./pages/general/FAQ";
import RegisterUser from "./pages/general/RegisterUser";
import Login from "./pages/general/Login";
import ForgetPassword from "./pages/general/ForgetPassword";
import OTPVerification from "./pages/general/OTPVerification";
import DiscussionForum from "./pages/general/DiscussionForum";
import UserForumView from "./pages/user/discussionForum/UserForumView";
import UserDashboard from "./pages/user/dashboard/UserDashboard";
import PostQuery from "./pages/user/discussionForum/PostQuery";
import QueryDetailedView from "./pages/user/discussionForum/QueryDetailedView";
import UserQueries from "./pages/user/discussionForum/UserQueries";
import ExpertDashboard from "./pages/expert/dashboard/ExpertDashboard";
import ExpertForumView from "./pages/expert/discussionforum/ExpertForumView";
import ExpertAnswerView from "./pages/expert/discussionforum/ExpertAnswerView";
import ExpertAnsweredQueries from "./pages/expert/discussionforum/ExpertAnsweredQueries";
import AdminDashboard from "./pages/admin/dashboard/AdminDashboard";
import PendingQueries from "./pages/admin/discussionforum/PendingQueries";
import { ToastContainer, toast } from "react-toastify";
import ApprovedQueries from "./pages/admin/discussionforum/ApprovedQueries";
import RejectedQueries from "./pages/admin/discussionforum/RejectedQueries";
import SellerDashboard from "./pages/seller/dashboard/SellerDashboard";
import EcommerceStore from "./pages/general/EcommerceStore";

const App = () => {
  return (
    <>
      <div className=" bg-white text-black dark:bg-slate-900 dark:text-white">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/verify" element={<OTPVerification />} />


          {/* All Discussion Forum Related Routes Below */}
          <Route path="/discussionforum" element={<DiscussionForum />} />
          
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/userforumview" element={<UserForumView />} />
          <Route path="/post-query" element={<PostQuery />} />
          <Route path="/query-detailed-view" element={<QueryDetailedView />} />
          <Route path="/your-queries" element={<UserQueries />} />

          <Route path="/expertdashboard" element={<ExpertDashboard />} />
          <Route path="/expertforumview" element={<ExpertForumView />} />
          <Route path="/write-your-answer" element={<ExpertAnswerView />} />
          <Route path="/your-answered-queries" element={<ExpertAnsweredQueries />} />

          <Route path="/admin-panel" element={<AdminDashboard />} />
          <Route path="/pending-queries" element={<PendingQueries />} />
          <Route path="/approved-queries" element={<ApprovedQueries />} />
          <Route path="/rejected-queries" element={<RejectedQueries />} />

          {/* All Ecommerce Related Routes Below */}
          <Route path="/ecommerce-store" element={<EcommerceStore />} />

          <Route path="/sellerdashboard" element={<SellerDashboard />} />

        </Routes>
      </div>
    </>
  );
};

export default App;
