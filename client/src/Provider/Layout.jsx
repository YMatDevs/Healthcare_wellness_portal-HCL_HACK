import { Outlet } from "react-router-dom";
import { SimpleSidebar } from "../components/Sidebar";

export function DashboardLayout() {
  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <SimpleSidebar />

      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}
