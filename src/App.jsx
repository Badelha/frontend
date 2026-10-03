<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Components
import Navbarpro from './components/Navbarpro'; // ← بس هاد

// Store
import Store from './pages/Store';
import AddProduct from './pages/AddProduct';
import ManageTags from './pages/ManageTags';
import CategoriesPage from './pages/CategoriesPage';

// Authentication
import Login from './pages/Login';
import Register from './pages/register';
import ForgotPassword from './pages/ForgotPassword';
import VerificationCode from './pages/VerificationCode';
import ResetPassword from './pages/ResetPassword';

// Main Pages
import Home from './pages/Home';
import HomeLoggedIn from './pages/HomeLoggedIn';
import AboutUs from './pages/AboutUs';

// Profile
import ProfilePage from './pages/ProfilePage.full';
import Personalinfoform from './pages/Personalinfoform';

function AppContent() {
  return (
    <div>
      <Navbarpro /> {/* ← استدعينا تبع الفريق */}

      <Routes>
        <Route path="/" element={<Store />} />
        <Route path="/products" element={<Store />} />
        <Route path="/add-product" element={<AddProduct />} />

        <Route path="/manage-tags" element={<ManageTags />} />
        <Route path="/categories" element={<CategoriesPage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verification" element={<VerificationCode />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        <Route path="/home" element={<Home />} />
        <Route path="/homeLoggedIn" element={<HomeLoggedIn />} />
        <Route path="/aboutUs" element={<AboutUs />} />

        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/personalinfoform" element={<Personalinfoform />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
=======
import Login from './pages/Login';
import './App.css';
import Register from './pages/register';
import { Navigate, Route, Routes } from 'react-router-dom';

import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';

import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage.full';

import Personalinfoform from './pages/Personalinfoform';
import HomeLoggedIn from './pages/HomeLoggedIn';
import AboutUs from './pages/AboutUs';
import HelpCenter from './pages/HelpCenter';
import PlatformRules from './pages/PlatformRules';
import Reportaproblem from './pages/Reportaproblem';
import Privacy from './pages/Privacy';
import MainLayout from './pages/MainLayout';

import Listing from './pages/Listing';
import AddListing from './pages/AddListing';

import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* Listing */}
      <Route path="/listing" element={<Listing />} />
      <Route path="/addListing" element={<AddListing />} />

      {/* Protected Profile */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/profile" element={<Navigate to="/profilePage" replace />} />
        <Route
          path="/add-product"
          element={<Navigate to="/profilePage?tab=products&addProduct=1" replace />}
        />
        <Route path="/my-products" element={<Navigate to="/profilePage?tab=products" replace />} />

        <Route path="/personalinfoform" element={<Personalinfoform />} />
      </Route>

      {/* Shared Pages */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/homeLoggedIn" element={<HomeLoggedIn />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/helpCenter" element={<HelpCenter />} />
        <Route path="/platformRules" element={<PlatformRules />} />
        <Route path="/reportaproblem" element={<Reportaproblem />} />
      </Route>

      {/* Any unknown route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
>>>>>>> origin/develop
