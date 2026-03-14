import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";

import { Layout } from "./Provider/Layout";
import Protected from "./Provider/Protected";

import Login from './pages/Login'
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/Profile";

const router = createBrowserRouter([
  { path: 'auth/login', element: <Login /> },
  { path: 'auth/register', element: <Register /> },
  { 
    element: <Protected />,
    // element: <><Outlet /></>,
    children: [
      { element: <Layout />, children: [
        {path: 'patient', children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'profile', element: <ProfilePage /> }]},
      ], }
    ],
  }
]);

export default function App() {
  return <RouterProvider router={router} />;
}