import { Grid, Paper, Typography, Box } from '@mui/material';

const StatCard = ({ title, value, color }) => (
  <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', height: 140, borderLeft: `5px solid ${color}` }}>
    <Typography color="textSecondary" variant="subtitle2" textTransform="uppercase">
      {title}
    </Typography>
    <Typography variant="h3" sx={{ mt: 2, fontWeight: 'bold' }}>
      {value}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold' }}>
        Overview
      </Typography>
      
      <Grid container spacing={3}>
        {/* Mock Data based on SOP Scale */}
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Farmers" value="1,240" color="#2E7D32" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Pending Subs" value="45" color="#FF9800" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Daily Milk (L)" value="850" color="#1976D2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Hubs" value="8" color="#D32F2F" />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;