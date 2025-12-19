import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import Sidebar from './Sidebar';
import Header from './Header';

const drawerWidth = 240;

const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
      {/* 1. Add Header */}
      <Header />
      
      {/* 2. Add Sidebar */}
      <Sidebar />
      
      {/* 3. Main Content Area */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: '#f5f5f5', minHeight: '100vh' }}>
        <Toolbar /> {/* Spacer to push content below Header */}
        <Outlet />  {/* This is where your page content renders */}
      </Box>
    </Box>
  );
};

export default MainLayout;