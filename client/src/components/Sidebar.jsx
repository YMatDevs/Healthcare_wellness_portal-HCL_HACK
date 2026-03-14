import React from "react";
import { Link, useLocation } from "react-router-dom";
// import useProfileStore from "../stores/useProfileStore";

export function SimpleSidebar() {
  // const { user } = useProfileStore();
  const location = useLocation();

  const user = { role: 'patient' }

  // Helper to highlight the active tab
  const getLinkClass = (path) => {
    const baseClass = "nav-link p-2 rounded text-decoration-none ";
    return baseClass + (location.pathname.includes(path) 
      ? "bg-primary text-white shadow-sm" 
      : "text-dark hover-effect");
  };

  return (
    <div style={{ width: "240px", height: "100vh", position: "sticky", top: 0 }} className="bg-light border-end p-3 d-flex flex-column">
      <div className="mb-4 px-2">
        <h5 className="fw-bold color-accent">CarePulse+</h5>
        <small className="text-muted text-uppercase" style={{ fontSize: '10px' }}>
          {user?.role || 'Guest'} Portal
        </small>
      </div>

      <nav className="nav nav-pills flex-column gap-2 flex-grow-1">
        

        {/* PATIENT ONLY LINKS */}
        {user?.role === 'patient' && (
          <>
            <Link to="/patient/dashboard" className={getLinkClass("dashboard")}>Dashboard</Link>
            <Link to="/patient/profile" className={getLinkClass("profile")}>My Profile</Link>
          </>
        )}

        {/* PROVIDER ONLY LINKS */}
        {user?.role === 'provider' && (
          <>
            <Link to="/appointments" className={getLinkClass("appointments")}>Appointments</Link>
            <Link to="/patient-list" className={getLinkClass("patient-list")}>Patient Directory</Link>
          </>
        )}

        {/* SHARED LINKS (Available to everyone) */}
        

      </nav>

      {/* FOOTER ACTION */}
      <div className="mt-auto pt-3 border-top">
        <Link to="/logout" className="nav-link text-danger p-2">
          Logout
        </Link>
      </div>
    </div>
  );
}