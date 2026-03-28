import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import GradientBackground from '../shared/GradientBackground';

const Layout = () => {
  return (
    <GradientBackground className="min-h-screen">
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 pt-20">
          <Outlet />
        </main>
        <Footer />
      </div>
    </GradientBackground>
  );
};

export default Layout;
