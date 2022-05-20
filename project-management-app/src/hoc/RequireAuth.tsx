import { useLocation, Navigate } from 'react-router';
import { useAppSelector } from '../store/hooks';

export const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const token = useAppSelector((state) => state.userInfo.token.token);
  if (!token) {
    return <Navigate to="/welcome" state={{ from: location }} />;
  }
  return children;
};
