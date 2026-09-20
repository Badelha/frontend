import Login from './pages/Login';
import './App.css';
import Register from './pages/register';
import { Routes, Route } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import VerificationCode from './pages/VerificationCode';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import ProfilePage from './pages/ProfilePage.full';
// import Navbarpro from './pages/Navbarpro.full'

import api from './services/api';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verification" element={<VerificationCode />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profilePage" element={<ProfilePage />} />
      {/* <Route path="/navbarpro" element={<Navbarpro />} /> */}
    </Routes>
  );
}

export default App;
