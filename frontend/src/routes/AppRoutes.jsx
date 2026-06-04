import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';
import AdminDashboard from '../pages/AdminDashboard.jsx';
import CreateDocument from '../pages/CreateDocument.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Documents from '../pages/Documents.jsx';

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="documents" element={<Documents />} />
        <Route path="create-document" element={<CreateDocument />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
