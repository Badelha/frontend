import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { isAdminUser } from '../utils/access';

export default function ProtectedRoute({ requiredRole = null }) {
  const { user, loading, restoreError } = useAuth();
  const location = useLocation();

  if (loading) {
    return <p className="p-8 text-center text-[#3b5869]">جارٍ التحقق من الجلسة...</p>;
  }

  if (restoreError && !user) {
    return (
      <div className="p-8 text-center text-red-600" role="alert">
        <p>{restoreError}</p>
        <Link className="mt-3 inline-block underline" to="/login">العودة إلى تسجيل الدخول</Link>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (requiredRole && requiredRole === 'ADMIN' && !isAdminUser(user)) {
    return <Navigate to="/homepage" replace state={{ from: location, message: 'غير مسموح لك بالوصول إلى هذه الصفحة' }} />;
  }

  return <Outlet />;
}
