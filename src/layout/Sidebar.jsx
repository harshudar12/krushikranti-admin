import { 
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Box, Typography 
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard'; // Dashboard
import PeopleIcon from '@mui/icons-material/People'; // Farmer
import SellIcon from '@mui/icons-material/Sell'; // Product & Pricing
import Inventory2Icon from '@mui/icons-material/Inventory2'; // Inventory
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Order & Logistics
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'; // Payment & Finance
import PersonIcon from '@mui/icons-material/Person'; // User
import SupportAgentIcon from '@mui/icons-material/SupportAgent'; // Support
import SettingsIcon from '@mui/icons-material/Settings'; // Configurations

const drawerWidth = 260;

const menuItems = [
  { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { text: 'Farmer', path: '/farmers', icon: <PeopleIcon /> },
  { text: 'Product & Pricing', path: '/products', icon: <SellIcon /> },
  { text: 'Inventory', path: '/inventory', icon: <Inventory2Icon /> },
  { text: 'Order & logistics', path: '/logistics', icon: <LocalShippingIcon /> },
  { text: 'Payment & Finance', path: '/finance', icon: <AccountBalanceWalletIcon /> },
  { text: 'User', path: '/users', icon: <PersonIcon /> },
  { text: 'Support', path: '/support', icon: <SupportAgentIcon /> },
  { text: 'Configurations', path: '/settings', icon: <SettingsIcon /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { 
          width: drawerWidth, 
          boxSizing: 'border-box',
          bgcolor: '#1E7537', // The Green Theme Color
          color: 'white',
          borderRight: 'none',
          borderTopRightRadius: '30px',
          borderBottomRightRadius: '30px',
          mt: 2, // Margin top for aesthetic
          mb: 2,
          height: 'calc(100% - 32px)',
          overflowX: 'hidden'
        },
      }}
    >
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
        {/* Logo Placeholder */}
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#fff' }}>
          KrushiKranti
        </Typography>
      </Box>

      <List sx={{ px: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname.startsWith(item.path);
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton 
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: '12px',
                  bgcolor: isActive ? '#ffffff' : 'transparent',
                  color: isActive ? '#1E7537' : '#ffffff',
                  '&:hover': {
                    bgcolor: isActive ? '#ffffff' : 'rgba(255,255,255,0.1)',
                  },
                  boxShadow: isActive ? '0px 4px 10px rgba(0,0,0,0.1)' : 'none',
                }}
              >
                <ListItemIcon sx={{ 
                  color: isActive ? '#1E7537' : '#ffffff',
                  minWidth: '40px' 
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontSize: '0.95rem', 
                    fontWeight: isActive ? 600 : 400 
                  }} 
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;