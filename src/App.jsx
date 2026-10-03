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