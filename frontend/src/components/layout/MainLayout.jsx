import { Outlet } from 'react-router-dom';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

function MainLayout() {
  return (
    <div className="min-h-screen bg-legal-50 text-ink-900">
      <Sidebar />
      <div className="min-h-screen lg:pl-52">
        <Header />
        <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
