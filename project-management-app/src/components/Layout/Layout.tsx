import { Outlet } from 'react-router';
import { Footer } from '../Footer/Footer';

export const Layout = () => {
  return (
    <div>
      <Outlet />
      <Footer />
    </div>
  );
};
