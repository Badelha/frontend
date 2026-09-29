import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      {/* الهيدر والـ Navbar تبعك */}

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;