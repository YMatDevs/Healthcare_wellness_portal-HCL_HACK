import { Navigate, Outlet } from 'react-router-dom';
// import useProfileStore from '../stores/useProfileStore';

const RoleProtectedRoute = ({ allowedRole }) => {
  // const { user, isLoading } = useProfileStore();

  const user = { role: 'patient' }
  const isLoading = false

  if (isLoading) {
    return <div className="d-flex justify-content-center mt-5"><div className="spinner-border text-primary"></div></div>;
  }

  if (!user || !user.role) {
    return <Navigate to="/auth/login" replace />;
  }

  // 3. If the user's role doesn't match the required role, block access
  if (user.role !== allowedRole) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger shadow-sm">
          <h4 className="alert-heading">Access Denied</h4>
          <p>You do not have the required <strong>{allowedRole}</strong> permissions to view this page.</p>
          <hr />
          <button className="btn btn-outline-danger" onClick={() => window.history.back()}>Go Back</button>
        </div>
      </div>
    );
  }

  // 4. Everything looks good! Render the child routes
  return <Outlet />;
};

export default RoleProtectedRoute;