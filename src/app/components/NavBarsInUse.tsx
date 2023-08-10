import AdminNavbar from "@/components/AdminNavbar/AdminNavbar";
import Navbar from "@/components/Navbar/Navbar";
import { User } from "../../context";

interface NavBarsInUseProps {
  user: User | null;
}

const NavBarsInUse = ({ user }: NavBarsInUseProps) => {
  if (!user || !user.is_admin) {
    return <Navbar />;
  }
  return <AdminNavbar />;
};

export default NavBarsInUse;
