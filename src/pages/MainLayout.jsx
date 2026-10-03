import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Navbarpro from '../components/Navbarpro';
import Footer from '../components/Footer';

const MainLayout = () => {
  const location = useLocation();

  const isLoggedIn = !!localStorage.getItem('user');

  // هيدر الملف الشخصي للصفحة الخاصة بالمستخدم
  const isLoggedInHome = location.pathname === '/homeLoggedIn';

  return (
    <div className="min-h-screen flex flex-col">
      {isLoggedInHome || isLoggedIn ? <Navbarpro /> : <Navbar />}

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;
