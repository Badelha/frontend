
import Login from './pages/Login';
import './App.css';
import Register from './pages/register';
import { Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage.full';
import ProtectedRoute from './components/ProtectedRoute';

import Layout from './pages/components/Layout';
import Dashboard from './pages/Dashboard';
import Ads from './pages/Ads';
import Messages from './pages/Messages';
import MessagesEmpty from './pages/MessagesEmpty';
import Notifications from './pages/Notifications';
import Orders from './pages/Orders';
import PurchaseOrders from './pages/PurchaseOrders';
import Users from './pages/Users';

function App() {
  return (
    <Routes>
      {/* الصفحات العامة */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/home" element={<Home />} />

      {/* الصفحات المحمية */}
      <Route element={<ProtectedRoute />}>
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route
          path="/profile"
          element={<Navigate to="/profilePage" replace />}
        />
        <Route
          path="/add-product"
          element={
            <Navigate
              to="/profilePage?tab=products&addProduct=1"
              replace
            />
          }
        />
        <Route
          path="/my-products"
          element={
            <Navigate
              to="/profilePage?tab=products"
              replace
            />
          }
        />
      </Route>

      {/* صفحات لوحة التحكم */}
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

      {/* أي رابط غير موجود يرجع للرئيسية */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;


