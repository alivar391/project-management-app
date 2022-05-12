import { Outlet } from 'react-router';
import { Footer } from '../Footer/Footer';
import './layout.css';

export const Layout = () => {
  return (
    <div className="app-contain">
      <div className="content-container">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};
