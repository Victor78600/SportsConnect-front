import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
function Layout() {
  return (
    <>
      <Navbar />
      {/* If you are logged in display a search bar to search users to talk with */}
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
