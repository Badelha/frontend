import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const ADMIN_NAV_ITEMS = [
  { label: 'لوحة التحكم', href: '/admin/dashboard', icon: '📊' },
  { label: 'إدارة المستخدمين', href: '/admin/users', icon: '👥' },
  { label: 'إدارة الفئات', href: '/admin/categories', icon: '📁' },
  { label: 'إدارة الوسوم', href: '/admin/tags', icon: '🏷️' },
  { label: 'إدارة الإعلانات', href: '/admin/ads', icon: '📢' },
];

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch {
      // Ignore
    }
    navigate('/login');
  };

  return (
    <header dir="rtl" className="fixed top-0 left-0 right-0 z-50 bg-[#16384F] text-white shadow-md">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo & Badge */}
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="flex items-center gap-2 text-xl font-bold text-white">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#4F9D9E] text-white">
                🛡️
              </span>
              <span>لوحة الإدارة</span>
            </Link>
            <span className="rounded-full bg-[#4F9D9E]/30 px-3 py-1 text-xs font-semibold text-[#8BE0E2]">
              ADMIN
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-2">
            {ADMIN_NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-[#4F9D9E] text-white shadow-sm'
                      : 'text-white/80 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Info & Actions */}
          <div className="flex items-center gap-3">
            <Link
              to="/market"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/20 px-3 py-1.5 text-xs font-semibold text-white/90 hover:bg-white/10"
            >
              <span>🛒</span>
              <span>زيارة السوق</span>
            </Link>

            <div className="flex items-center gap-2 border-r border-white/10 pr-3">
              <span className="hidden sm:inline text-xs font-medium text-white/80">
                {user?.full_name || 'المدير'}
              </span>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-xl bg-red-500/20 px-3 py-1.5 text-xs font-bold text-red-300 hover:bg-red-500 hover:text-white transition"
              >
                خروج
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
