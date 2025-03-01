import React, { Suspense, lazy, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import TriangleLoader from "./components/seller/TriangleLoader";
import PrivateRoute from "./privateRoute";

// Lazy load components
const Home = lazy(() => import("./pages/general/Home"));
const Contact = lazy(() => import("./pages/general/Contact"));
const About = lazy(() => import("./pages/general/About"));
const PrivacyPolicy = lazy(() => import("./pages/general/PrivacyPolicy"));
const Terms = lazy(() => import("./pages/general/Terms"));
const FAQ = lazy(() => import("./pages/general/FAQ"));
const RegisterUser = lazy(() => import("./pages/general/RegisterUser"));
const Login = lazy(() => import("./pages/general/Login"));
const ForgetPassword = lazy(() => import("./pages/general/ForgetPassword"));
const OTPVerification = lazy(() => import("./pages/general/OTPVerification"));
const ErrorPage = lazy(() => import("./pages/sellerpages/pages/ErrorPage"));
const AdminLogin = lazy(() => import("./pages/sellerpages/pages/AdminLogin"));
const UserDashboard = lazy(() =>
  import("./pages/user/dashboard/UserDashboard")
);
const DiscussionForum = lazy(() => import("./pages/general/DiscussionForum"));
const MyOrders = lazy(() => import("./pages/sellerpages/pages/MyOrders"));
const EcommerceStore = lazy(() =>
  import("./pages/sellerpages/pages/EcommerceStore")
);
const UserForumView = lazy(() =>
  import("./pages/user/discussionForum/UserForumView")
);
const PostQuery = lazy(() => import("./pages/user/discussionForum/PostQuery"));
const QueryDetailedView = lazy(() =>
  import("./pages/user/discussionForum/QueryDetailedView")
);
const UserQueries = lazy(() =>
  import("./pages/user/discussionForum/UserQueries")
);
const ExpertDashboard = lazy(() =>
  import("./pages/expert/dashboard/ExpertDashboard")
);
const ExpertForumView = lazy(() =>
  import("./pages/expert/discussionforum/ExpertForumView")
);
const ExpertAnswerView = lazy(() =>
  import("./pages/expert/discussionforum/ExpertAnswerView")
);
const ExpertAnsweredQueries = lazy(() =>
  import("./pages/expert/discussionforum/ExpertAnsweredQueries")
);
const PendingQueries = lazy(() =>
  import("./pages/admin/discussionforum/PendingQueries")
);
const ApprovedQueries = lazy(() =>
  import("./pages/admin/discussionforum/ApprovedQueries")
);
const RejectedQueries = lazy(() =>
  import("./pages/admin/discussionforum/RejectedQueries")
);
const CropImageDetection = lazy(() =>
  import("./pages/general/CropImageDetection")
);
const CropImageModel = lazy(() =>
  import("./pages/user/cropImageModel/userCropImageModel")
);
const ProductDetails = lazy(() =>
  import("./pages/sellerpages/pages/ProductDetails")
);
const Product = lazy(() => import("./pages/sellerpages/pages/Product"));
const CartLayout = lazy(() => import("./pages/sellerpages/pages/CartLayout"));
const AdminLayout = lazy(() => import("./pages/sellerpages/pages/AdminLayout"));
const AdminRoute = lazy(() => import("./utils/adminRoute"));
const CustomerList = lazy(() =>
  import("./pages/sellerpages/pages/CustomerList")
);
const CouponList = lazy(() => import("./pages/sellerpages/pages/CouponList"));
const AdminOrders = lazy(() => import("./pages/sellerpages/pages/AdminOrders"));
const AdminProductList = lazy(() =>
  import("./pages/sellerpages/pages/AdminProductList")
);
const AddProducts = lazy(() => import("./pages/sellerpages/pages/AddProducts"));
const UpdateProducts = lazy(() =>
  import("./pages/sellerpages/pages/UpdateProducts")
);
const BrandList = lazy(() => import("./pages/sellerpages/pages/BrandList"));
const CategoryList = lazy(() =>
  import("./pages/sellerpages/pages/CategoryList")
);
const ProfileLayout = lazy(() =>
  import("./pages/sellerpages/pages/ProfileLayout")
);
const Dashboard = lazy(() => import("./pages/sellerpages/pages/Dashboard"));
const CheckoutSuccess = lazy(() =>
  import("./pages/sellerpages/pages/CheckoutSuccess")
);
const ProtectedRoute = lazy(() => import("./utils/protectedRoute"));
const AdminDashboard = lazy(() =>
  import("./pages/admin/dashboard/AdminDashboard")
);
const SellerManagement = lazy(() =>
  import("./pages/admin/seller-control/SellerManagement")
);
const UserManagement = lazy(() =>
  import("./pages/admin/user-control/UserManagement")
);
const YourProfile = lazy(() => import("./pages/YourProfile"));
const Settings = lazy(() => import("./pages/Settings"));
const UserOrders = lazy(() => import("./pages/user/e-commerce/Orders"));

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top functionality
  const ScrollToTop = () => {
    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location.pathname]);
    return null;
  };

  return (
    <div className="bg-white text-black dark:bg-slate-900 dark:text-white">
      <Suspense fallback={<TriangleLoader height="100vh" />}>
        <ScrollToTop />
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
          <Route path="/discussionforum" element={<DiscussionForum />} />
          <Route path="/ecommerce-store" element={<EcommerceStore />} />
          <Route path="/image-detection" element={<CropImageDetection />} />
          <Route path="products" element={<Product />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="product/:slug" element={<ProductDetails />} />
          <Route path="/*" element={<ErrorPage />} />

          <Route element={<PrivateRoute />}>
            <Route path="/your-queries" element={<UserQueries />} />
            <Route path="/userdashboard" element={<UserDashboard />} />
            <Route path="/userforumview" element={<UserForumView />} />
            <Route path="/post-query" element={<PostQuery />} />
            <Route
              path="/query-detailed-view"
              element={<QueryDetailedView />}
            />
            <Route path="/expert" element={<ExpertDashboard />} />
            <Route path="/expertforumview" element={<ExpertForumView />} />
            <Route path="/write-your-answer" element={<ExpertAnswerView />} />
            <Route path="/profile" element={<YourProfile />} />
            <Route path="/settings" element={<Settings />} />
            <Route
              path="/your-answered-queries"
              element={<ExpertAnsweredQueries />}
            />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/pending-queries" element={<PendingQueries />} />
            <Route path="/seller-management" element={<SellerManagement />} />
            <Route path="/user-management" element={<UserManagement />} />
            <Route path="/approved-queries" element={<ApprovedQueries />} />
            <Route path="/rejected-queries" element={<RejectedQueries />} />
            <Route path="/orders" element={<MyOrders />} />
            <Route path="/user-orders" element={<UserOrders />} />
            <Route path="/crop-image-model" element={<CropImageModel />} />
            <Route path="/admin-layout" element={<AdminLayout />}>
              <Route path="customers" element={<CustomerList />} />
              <Route path="coupons" element={<CouponList />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="products" element={<AdminProductList />} />
              <Route path="product/add" element={<AddProducts />} />
              <Route path="product/update/:slug" element={<UpdateProducts />} />
              <Route path="brands" element={<BrandList />} />
              <Route path="category" element={<CategoryList />} />
            </Route>
            <Route path="cart" element={<CartLayout />} />
            <Route path="/orders" element={<ProfileLayout />}>
              <Route index element={<MyOrders />} />
            </Route>
            <Route path="/seller" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="customers" element={<CustomerList />} />
              <Route path="coupons" element={<CouponList />} />
              <Route path="orders" element={<AdminOrders />} />
              <Route path="products" element={<AdminProductList />} />
              <Route path="product/add" element={<AddProducts />} />
              <Route path="product/update/:slug" element={<UpdateProducts />} />
              <Route path="brands" element={<BrandList />} />
              <Route path="category" element={<CategoryList />} />
            </Route>
            <Route path="checkout-success" element={<CheckoutSuccess />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
