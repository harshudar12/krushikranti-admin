import { 
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Toolbar, Divider, Box 
} from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import PeopleIcon from '@mui/icons-material/People'; // Farmers
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Subscriptions
import LocalShippingIcon from '@mui/icons-material/LocalShipping'; // Logistics
import InventoryIcon from '@mui/icons-material/Inventory'; // Inventory
import DashboardIcon from '@mui/icons-material/Dashboard'; // Dashboard
import PaymentIcon from '@mui/icons-material/Payment'; // Finance

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
  { text: 'Farmer Management', path: '/farmers', icon: <PeopleIcon /> },
  { text: 'Subscriptions', path: '/subscriptions', icon: <ShoppingCartIcon /> },
  { text: 'Logistics & Hubs', path: '/logistics', icon: <LocalShippingIcon /> },
  { text: 'Inventory', path: '/inventory', icon: <InventoryIcon /> },
  { text: 'Payments & Wallet', path: '/finance', icon: <PaymentIcon /> },
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
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Toolbar>
        {/* Logo Area */}
        <Box sx={{ fontWeight: 'bold', fontSize: '1.2rem', color: '#2E7D32' }}>
          KRUSHI KRANTI
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton 
              selected={location.pathname.startsWith(item.path)}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon sx={{ 
                color: location.pathname.startsWith(item.path) ? '#2E7D32' : 'inherit' 
              }}>
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;