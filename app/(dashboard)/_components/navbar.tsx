import NavbarRoutes from "@/components/navbar-routes";
import MobileSidebar from "./mobile-sidebar";

const Navbar = () => {
  return (
    <div className="p-4 border-b h-full flex items-center justify-between bg-white shadow-sm">
      <div>
        <MobileSidebar />
      </div>

      <div>
        <NavbarRoutes />
      </div>
    </div>
  );
};

export default Navbar;
