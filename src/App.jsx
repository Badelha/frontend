import Login from './pages/Login';
import './App.css';
import Register from './pages/register';
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import VerificationCode from './pages/VerificationCode';
import ResetPassword from './pages/ResetPassword';
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

// import Navbarpro from './pages/Navbarpro.full'

import api from './services/api';

function App() {
  return (
    <Routes>
      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route paths="/verification" element={<VerificationCode />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/listing" element={<Listing />} />
      <Route path="/addListing" element={<AddListing />} />

      {/* Home */}

      {/* Profile */}
      <Route path="/profilePage" element={<ProfilePage />} />
      <Route path="/personalinfoform" element={<Personalinfoform />} />

      {/* About */}
      {/* <Route path="/aboutUs" element={<AboutUs />} /> */}

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
    </Routes>
  );
}

export default App;
