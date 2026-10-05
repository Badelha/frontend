import Login from './pages/Login';
import './App.css';
import Register from './pages/register';
import { Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage.full';
import ProductDetail from './pages/ProductDetail';
import RequestsPage from './pages/RequestsPage';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Orders from './pages/Orders';
import PurchaseOrders from './pages/PurchaseOrders';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/homepage" element={<Home />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/notifications" element={<Notifications />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/messages/:requestId" element={<Messages />} />
      <Route path="/purchase-orders" element={<PurchaseOrders />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/profile" element={<Navigate to="/profilePage" replace />} />
        <Route path="/add-product" element={<Navigate to="/profilePage?tab=products&addProduct=1" replace />} />
        <Route path="/my-products" element={<Navigate to="/profilePage?tab=products" replace />} />
        <Route path="/requests" element={<RequestsPage />} />
      </Route>

      <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
