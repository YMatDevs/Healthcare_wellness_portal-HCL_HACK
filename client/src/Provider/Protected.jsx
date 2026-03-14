import { Outlet, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

const getCookie = (name) => {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
};

export default function Protected() {
  const [token, setToken] = useState(getCookie("token"));

  useEffect(() => {
    const refreshSession = async () => {
      try {
        const res = await fetch("/auth/verify", {
          method: "POST",
          credentials: "include", 
        });

        if (!res.ok) {
          setToken(null);
        } else {
          setToken(getCookie("token"));
        }
      } catch (err) {
        console.error("Session refresh failed", err);
      }
    };

    const interval = setInterval(refreshSession, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, []);

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
}