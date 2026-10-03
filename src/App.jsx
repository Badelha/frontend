import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// Components - الفريق
import Navbarpro from './components/Navbarpro';
import ProtectedRoute from './components/ProtectedRoute';

// Authentication - الفريق
import Login from './pages/Login';
import Register from './pages/register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';

// Main Pages - الفريق
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage.full';

// صفحاتك - Store
import Store from './pages/Store';
import AddProduct from './pages/AddProduct';
import ManageTags from './pages/ManageTags';
import CategoriesPage from './pages/CategoriesPage';

function App() {
  return (
    <div>
      <Navbarpro />

      <Routes>
        {/* ===== شغلك (Store) ===== */}
        <Route path="/" element={<Store />} />
        <Route path="/store" element={<Store />} />
        <Route path="/products" element={<Store />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/manage-tags" element={<ManageTags />} />
        <Route path="/categories" element={<CategoriesPage />} />

        {/* ===== Main Pages - الفريق ===== */}
        <Route path="/home" element={<Home />} />
        <Route path="/team" element={<Home />} />

        {/* ===== Authentication ===== */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* ===== Protected Routes ===== */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profilePage" element={<ProfilePage />} />
          <Route path="/profile" element={<Navigate to="/profilePage" replace />} />
          <Route path="/my-products" element={<Navigate to="/profilePage?tab=products" replace />} />
        </Route>

        {/* ===== Fallback ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;