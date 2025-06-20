import ProtectAdmin from "@/components/ProtectAdmin";
import AdminSidebar from "./sidebar/page";

interface AdminProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminProps) => {
  return (
    <div className="flex min-h-screen">
      <ProtectAdmin>
        {/* Sidebar */}
        <div className="fixed left-0 top-0 h-screen w-1/6 bg-[#1E2753] ">
          <AdminSidebar />
        </div>

        {/* Main Content with spacing */}
        <div className="w-full lg:w-5/6 lg:ml-[18%] overflow-y-auto p-6">
          {children}
        </div>
      </ProtectAdmin>
    </div>
  );
};
export default AdminLayout;
