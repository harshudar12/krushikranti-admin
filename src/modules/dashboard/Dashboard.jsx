import { 
  Box, Grid, Paper, Typography, LinearProgress, Avatar 
} from '@mui/material';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ComposedChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LayersIcon from '@mui/icons-material/Layers';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// --- DATA MOCKUPS ---
const cityData = [
  { name: 'Mumbai', placed: 85, demand: 10, lineVal: 95, label: '45%' },
  { name: 'Pune', placed: 65, demand: 20, lineVal: 85, label: '37%' },
  { name: 'Nashik', placed: 35, demand: 20, lineVal: 55, label: '41%' },
  { name: 'Nagpur', placed: 45, demand: 15, lineVal: 60, label: '47%' },
  { name: 'Kolhapur', placed: 30, demand: 10, lineVal: 40, label: '53%' },
  { name: 'Thane', placed: 25, demand: 25, lineVal: 50, label: '59%' },
  { name: 'Bengaluru', placed: 70, demand: 15, lineVal: 85, label: '87%' },
];

const pieData = [
  { name: 'Active', value: 85 },
  { name: 'Inactive', value: 15 },
];

const productsData = [
  { name: 'Tomato', value: 98, img: 'https://cdn-icons-png.flaticon.com/512/1202/1202125.png' },
  { name: 'Potato', value: 93, img: 'https://cdn-icons-png.flaticon.com/512/7396/7396149.png' },
  { name: 'Cereals', value: 88, img: 'https://cdn-icons-png.flaticon.com/512/3014/3014520.png' },
  { name: 'Onion', value: 95, img: 'https://cdn-icons-png.flaticon.com/512/765/765618.png' },
  { name: 'Banana', value: 99, img: 'https://cdn-icons-png.flaticon.com/512/2909/2909761.png' },
];

const PIE_COLORS = ['#FFC107', '#E0E0E0'];

// --- COMPONENTS ---

const CustomLineLabel = (props) => {
  const { x, y, index } = props;
  const labelText = cityData[index].label;
  return (
    <text x={x} y={y} dy={-10} fill="#000" fontSize={12} fontWeight="bold" textAnchor="middle">
      {labelText}
    </text>
  );
};

const StatusCard = ({ title, value, subtext, icon, color, borderColor }) => (
  <Paper sx={{ 
    p: 2, 
    border: `2px solid ${borderColor}`, 
    borderRadius: 3, 
    height: '100%',
    display: 'flex', alignItems: 'center', gap: 2,
    boxShadow: 'none'
  }}>
    <Box sx={{ p: 1.5, bgcolor: color, borderRadius: 2, color: '#fff', display: 'flex' }}>
      {icon}
    </Box>
    <Box>
      <Typography variant="body2" color="textSecondary" fontWeight="bold">{title}</Typography>
      <Typography variant="h6" fontWeight="bold">{value}</Typography>
      <Typography variant="caption" sx={{ color: 'green', fontWeight: 'bold' }}>{subtext}</Typography>
    </Box>
  </Paper>
);

const ProgressBar = ({ label, value, img }) => (
  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
    <img src={img} alt="" style={{ width: 22, height: 22, objectFit: 'contain' }} />
    <Box sx={{ flexGrow: 1 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
        <Typography variant="caption" fontWeight="bold" noWrap>{label}</Typography>
        <Typography variant="caption" fontWeight="bold">{value}%</Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={value} 
        sx={{ 
          height: 8, 
          borderRadius: 5, 
          bgcolor: '#dfffe0',
          '& .MuiLinearProgress-bar': { bgcolor: '#32CD32' } 
        }} 
      />
    </Box>
  </Box>
);

const CityAvatar = ({ name, img }) => (
  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <Avatar 
      src={img} 
      alt={name}
      sx={{ width: 50, height: 50, mb: 1, border: '2px solid #fff', boxShadow: 3 }} 
    />
    <Typography variant="caption" fontWeight="bold">{name}</Typography>
  </Box>
);

const Dashboard = () => {
  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold' }}>
        Active Farmers & Customers
      </Typography>

      {/* --- TOP SECTION --- */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%', boxShadow: 1 }}>
            <Typography variant="subtitle1" fontWeight="bold" mb={2}>Active Farmers & Overview</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
              <Box>
                <Typography variant="caption" color="green">Farmer Growth</Typography>
                <LinearProgress variant="determinate" value={70} sx={{ width: 100, height: 8, borderRadius: 5, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: '#4CAF50' } }} />
              </Box>
              <Box sx={{ position: 'relative', width: 160, height: 160 }}>
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={pieData} innerRadius={50} outerRadius={70} startAngle={90} endAngle={-270} dataKey="value">
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                  <Typography variant="h5" fontWeight="bold">85 %</Typography>
                </Box>
              </Box>
              <Box>
                <Typography variant="caption" color="orange">Active Customers</Typography>
                <LinearProgress variant="determinate" value={60} sx={{ width: 100, height: 8, borderRadius: 5, bgcolor: '#e0e0e0', '& .MuiLinearProgress-bar': { bgcolor: '#FFC107' } }} />
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 3, borderRadius: 3, height: '100%', boxShadow: 1 }}>
            <Box sx={{ bgcolor: 'red', p: 1, borderRadius: 1, mb: 2 }}>
              <Typography sx={{ color: 'white', fontWeight: 'bold', textAlign: 'center' }}>IMMEDIATE ACTION REQUIRED</Typography>
            </Box>
            <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
              <li><Typography variant="body2" fontWeight="600">Vcp Has Low Stock</Typography></li>
              <li><Typography variant="body2" fontWeight="600">Low Fertilizers Stock At Distributor C</Typography></li>
            </ul>
          </Paper>
        </Grid>
      </Grid>

      {/* --- CARDS SECTION --- */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Supply Chain & Orders</Typography>
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}><StatusCard title="Farmer - to - Hub Sell" value="$450k Month" subtext="Last Month +8%" icon={<AgricultureIcon />} color="#2E7D32" borderColor="#2E7D32" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatusCard title="Hub - to - City Sell" value="$450k Month" subtext="Last Month +8%" icon={<LocalShippingIcon />} color="#FF9800" borderColor="#FF9800" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatusCard title="Total Revenue" value="Hub ($500k)" subtext="City ($6700k)" icon={<LayersIcon />} color="#1976D2" borderColor="#1976D2" /></Grid>
        <Grid item xs={12} sm={6} md={3}><StatusCard title="Active Subscription" value="Active" subtext="Last Month +8%" icon={<CheckCircleIcon />} color="#9C27B0" borderColor="#9C27B0" /></Grid>
      </Grid>

      {/* --- CITYWISE PERFORMANCE --- */}
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>Citywise Performance</Typography>
      
      {/* GRID UPDATE: 
         - alignItems="stretch" ensures Left Chart and Right Widgets represent equal height 
         - lg={9} (75%) vs lg={3} (25%) split
      */}
      <Grid container spacing={50} alignItems="stretch">
        
        {/* LEFT: MAIN CHART */}
        <Grid item xs={12} lg={9}>
          <Paper sx={{ 
            p: 3, 
            borderRadius: 3, 
            boxShadow: 1, 
            height: '100%', 
            width: '200%', 
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2, gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: '#2196F3' }} />
                <Typography variant="caption" fontWeight="bold">Orders (%)</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: '#32CD32' }} />
                <Typography variant="caption" fontWeight="bold">Order Placed</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box sx={{ width: 12, height: 12, bgcolor: '#FFC107' }} />
                <Typography variant="caption" fontWeight="bold">Demand</Typography>
              </Box>
            </Box>

            <Box sx={{ flexGrow: 1, minHeight: '350px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart 
                  data={cityData} 
                  margin={{ top: 20, right: 0, bottom: 20, left: 0 }} // CHANGED: Zero margins to stretch
                  barCategoryGap="20%" // CHANGED: Allows bars to fill 80% of space dynamically
                >
                  <CartesianGrid stroke="#e0e0e0" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    dy={10} 
                    style={{ fontWeight: 'bold', fontSize: '12px' }} 
                    interval={0}
                    padding={{ left: 30, right: 30 }} // Padding inside axis so labels don't cut off
                  />
                  <YAxis axisLine={false} tickLine={false} ticks={[0, 25, 50, 75, 100]} tickFormatter={(tick) => `${tick}%`} style={{ fontSize: '12px' }} />
                  <Tooltip />
                  
                  {/* REMOVED fixed barSize so they stretch */}
                  <Bar dataKey="placed" stackId="a" fill="#32CD32" radius={[0, 0, 0, 0]} />
                  <Bar dataKey="demand" stackId="a" fill="#FFC107" radius={[5, 5, 0, 0]} />
                  
                  <Line 
                    type="monotone" 
                    dataKey="lineVal" 
                    stroke="#2196F3" 
                    strokeWidth={2} 
                    dot={{ r: 4, fill: '#2196F3', strokeWidth: 2, stroke: '#fff' }}
                    label={<CustomLineLabel />}
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT: WIDGETS */}
        <Grid item xs={12} lg={3}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, height: '100%' }}>
            
            <Paper sx={{ p: 2, borderRadius: 3, boxShadow: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={1} align="center" fontSize="0.9rem">Top 3 Saleing Cities</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start', mt: 1 }}>
                <CityAvatar name="Mumbai" img="https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=150&h=150&fit=crop" />
                <CityAvatar name="Pune" img="https://images.unsplash.com/photo-1596422846543-75c6fc197f07?w=150&h=150&fit=crop" />
                <CityAvatar name="Nashik" img="https://images.unsplash.com/photo-1625900293049-d10243168233?w=150&h=150&fit=crop" />
              </Box>
            </Paper>

            <Paper sx={{ 
              p: 2, 
              borderRadius: 3, 
              boxShadow: 1, 
              flexGrow: 1, // Pushes this card to fill all remaining vertical space
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}>
              <Typography variant="subtitle1" fontWeight="bold" mb={2} align="center" fontSize="0.9rem">Top 5 Saleing Products</Typography>
              {productsData.map((prod) => (
                <ProgressBar key={prod.name} label={prod.name} value={prod.value} img={prod.img} />
              ))}
            </Paper>

          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;