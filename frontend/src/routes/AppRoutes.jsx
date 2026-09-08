import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

import Home from "../pages/public/Home";
import Categories from "../pages/public/Categories";
import Businesses from "../pages/public/Businesses";
import Offers from "../pages/public/Offers";
import About from "../pages/public/About";
import BusinessDetails from "../pages/public/BusinessDetails";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import VerifyEmail from "../pages/auth/VerifyEmail";
import UserProfile from "../pages/auth/Profile";

import Dashboard from "../pages/business/Dashboard";
import Profile from "../pages/business/Profile";
import Posts from "../pages/business/Posts";
import BusinessOffers from "../pages/business/Offers";
import Verification from "../pages/business/Verification";

import NotFound from "../pages/errors/NotFound";
import PrivacyPolicy from "../pages/public/PrivacyPolicy";
import TermsConditions from "../pages/public/TermsConditions";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/businesses" element={<Businesses />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/about" element={<About />} />
        <Route path="/business/:id" element={<BusinessDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/profile" element={<UserProfile />} />

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/profile" element={<Profile />} />
        <Route path="/dashboard/posts" element={<Posts />} />
        <Route path="/dashboard/offers" element={<BusinessOffers />} />
        <Route path="/dashboard/verification" element={<Verification />} />

        <Route path="*" element={<NotFound />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsConditions />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;