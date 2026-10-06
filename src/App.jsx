import Login from './pages/Login';
import './App.css';
import Register from './pages/register';
import { Navigate, Route, Routes } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import VerifyEmail from './pages/VerifyEmail';
import Home from './pages/Home';
import MarketplacePage from './pages/MarketplacePage';
import ProfilePage from './pages/ProfilePage.full';
import ProductDetail from './pages/ProductDetail';
import AddProduct from './pages/AddProduct';
import RequestsPage from './pages/RequestsPage';
import Messages from './pages/Messages';
import Notifications from './pages/Notifications';
import Orders from './pages/Orders';
import PurchaseOrders from './pages/PurchaseOrders';
import AdminDashboard from './pages/AdminDashboard';
import Users from './pages/Users';
import CategoriesPage from './pages/CategoriesPage';
import ManageTags from './pages/ManageTags';
import Ads from './pages/Ads';
import Reportaproblem from './pages/Reportaproblem';
import Personalinfoform from './pages/Personalinfoform';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/homepage" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/market" element={<MarketplacePage />} />
      <Route path="/marketplace" element={<MarketplacePage />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/report" element={<Reportaproblem />} />
      <Route path="/reportaproblem" element={<Reportaproblem />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/profile" element={<Navigate to="/profilePage" replace />} />
        <Route path="/edit-profile" element={<Personalinfoform />} />
        <Route path="/personal-info" element={<Personalinfoform />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/my-products" element={<Navigate to="/profilePage?tab=products" replace />} />
        <Route path="/requests" element={<RequestsPage />} />
        <Route path="/orders" element={<RequestsPage />} />
        <Route path="/purchase-orders" element={<RequestsPage />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messages/:requestId" element={<Messages />} />
        <Route path="/notifications" element={<Notifications />} />
      </Route>

      <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/categories" element={<CategoriesPage />} />
        <Route path="/admin/tags" element={<ManageTags />} />
        <Route path="/admin/ads" element={<Ads />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

