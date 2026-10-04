import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

// ===== Authentication =====
import Login from './pages/Login';
import Register from './pages/register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';

// ===== Main Pages =====
import Home from './pages/Home';
import HomeLoggedIn from './pages/HomeLoggedIn';
import ProfilePage from './pages/ProfilePage.full';
import Personalinfoform from './pages/Personalinfoform';
import AboutUs from './pages/AboutUs';
import HelpCenter from './pages/HelpCenter';
import PlatformRules from './pages/PlatformRules';
import Reportaproblem from './pages/Reportaproblem';
import Privacy from './pages/Privacy';
import MainLayout from './pages/MainLayout';

// ===== Listing Pages =====
import Listing from './pages/Listing';
import AddListing from './pages/AddListing';
import AddProduct from './pages/AddProduct';
import Market from './pages/Market';

// ===== Store Pages =====
import Store from './pages/Store';
import ManageTags from './pages/ManageTags';
import CategoriesPage from './pages/CategoriesPage';

// ===== Dashboard Pages =====
import Layout from './pages/components/Layout';
import Dashboard from './pages/Dashboard';
import Ads from './pages/Ads';
import Messages from './pages/Messages';
import MessagesEmpty from './pages/MessagesEmpty';
import Notifications from './pages/Notifications';
import Orders from './pages/Orders';
import PurchaseOrders from './pages/PurchaseOrders';
import Users from './pages/Users';

// ===== Components =====
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* ========== Auth ========== */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      {/* ========== Store ========== */}
      <Route path="/store" element={<Store />} />
      <Route path="/products" element={<Store />} />
      <Route path="/manage-tags" element={<ManageTags />} />
      <Route path="/categories" element={<CategoriesPage />} />

      {/* ========== Listing ========== */}
      <Route path="/listing" element={<Listing />} />
      <Route path="/addListing" element={<AddListing />} />

      {/* ========== Protected Profile ========== */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/profile" element={<Navigate to="/profilePage" replace />} />
        <Route
          path="/add-product"
          element={<Navigate to="/profilePage?tab=products&addProduct=1" replace />}
        />
      </Route>

      <Route path="/my-products" element={<Navigate to="/profilePage?tab=products" replace />} />

      <Route path="/personalinfoform" element={<Personalinfoform />} />
      <Route path="/addproduct" element={<AddProduct />} />

      {/* ========== Dashboard ========== */}
      <Route
        path="/dashboard"
        element={
          <Layout>
            <Dashboard />
          </Layout>
        }
      />

      <Route
        path="/ads"
        element={
          <Layout>
            <Ads />
          </Layout>
        }
      />

      <Route
        path="/messages"
        element={
          <Layout>
            <Messages />
          </Layout>
        }
      />

      <Route
        path="/messages-empty"
        element={
          <Layout>
            <MessagesEmpty />
          </Layout>
        }
      />

      <Route
        path="/notifications"
        element={
          <Layout>
            <Notifications />
          </Layout>
        }
      />

      <Route
        path="/orders"
        element={
          <Layout>
            <Orders />
          </Layout>
        }
      />

      <Route
        path="/purchase-orders"
        element={
          <Layout>
            <PurchaseOrders />
          </Layout>
        }
      />

      <Route
        path="/users"
        element={
          <Layout>
            <Users />
          </Layout>
        }
      />

      {/* ========== Shared Pages ========== */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/homeLoggedIn" element={<HomeLoggedIn />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/helpCenter" element={<HelpCenter />} />
        <Route path="/platformRules" element={<PlatformRules />} />
        <Route path="/reportaproblem" element={<Reportaproblem />} />
        <Route path="/market" element={<Market />} />
      </Route>

      {/* ========== Fallback ========== */}
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
