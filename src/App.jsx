import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import Dashboard from './modules/dashboard/Dashboard';
import Login from './modules/auth/Login';
// 1. IMPORT THE NEW PAGE
import ForgotPassword from './modules/auth/ForgotPassword';

const FarmerList = () => <div>Farmer Management Module</div>;
const SubscriptionList = () => <div>Subscription Plans</div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* 2. ADD THE ROUTE HERE */}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Protected Admin Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="farmers" element={<FarmerList />} />
          <Route path="subscriptions" element={<SubscriptionList />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;