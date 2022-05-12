import { useLocation, Navigate } from 'react-router';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const auth = true;
  if (!auth) {
    return <Navigate to="/welcome" state={{ from: location }} />;
  }
  return children;
};
