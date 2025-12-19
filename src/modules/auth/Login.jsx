import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  Box, Button, TextField, Typography, Paper, 
  Container, InputAdornment, IconButton, Alert, CssBaseline 
} from '@mui/material';
import { Visibility, VisibilityOff, PersonOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// 1. IMPORT YOUR LOCAL IMAGE
import bgImage from '../../assets/images/login-bg.png'; 

const validationSchema = Yup.object({
  identifier: Yup.string().required('Email or Phone Number is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const formik = useFormik({
    initialValues: { identifier: '', password: '' },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError('');
      try {
        console.log('Login Attempt:', values);
        localStorage.setItem('kk_admin_token', 'mock-jwt-token-12345');
        navigate('/dashboard');
      } catch (err) {
        console.error('Login Failed', err);
        setError('Invalid credentials. Please try again.');
      }
    },
  });

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          margin: 0,
          padding: 0,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          // 2. USE THE LOCAL VARIABLE
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <Container maxWidth="xs">
          <Paper
            elevation={6}
            sx={{
              p: 5,
              borderRadius: 4,
              textAlign: 'center',
              backgroundColor: '#ffffff',
              maxWidth: '400px',
              mx: 'auto'
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
              <Box
                sx={{
                  width: 70,
                  height: 70,
                  borderRadius: '50%',
                  border: '3px solid #32CD32',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  bgcolor: 'transparent'
                }}
              >
                <PersonOutline sx={{ fontSize: 45, color: '#32CD32' }} />
              </Box>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: '800', mb: 1, color: '#000' }}>
              Admin
            </Typography>
            <Typography variant="body2" sx={{ mb: 4, fontWeight: 500, color: '#000' }}>
              KrushiKranti Administration Portal
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            <form onSubmit={formik.handleSubmit}>
              <Box sx={{ textAlign: 'left', mb: 2.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: '500', mb: 0.8, color: '#000' }}>
                  Email / Phone No
                </Typography>
                <TextField
                  fullWidth
                  id="identifier"
                  name="identifier"
                  placeholder="Enter Your Email or Phone No"
                  variant="outlined"
                  value={formik.values.identifier}
                  onChange={formik.handleChange}
                  error={formik.touched.identifier && Boolean(formik.errors.identifier)}
                  helperText={formik.touched.identifier && formik.errors.identifier}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#F0F0F0',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': { border: '1px solid #32CD32' },
                    },
                    '& input': { py: 1.5, px: 2 }
                  }}
                />
              </Box>

              <Box sx={{ textAlign: 'left', mb: 1 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: '500', mb: 0.8, color: '#000' }}>
                  Password
                </Typography>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Your Password"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#F0F0F0',
                      borderRadius: 2,
                      '& fieldset': { border: 'none' },
                      '&:hover fieldset': { border: 'none' },
                      '&.Mui-focused fieldset': { border: '1px solid #32CD32' },
                    },
                    '& input': { py: 1.5, px: 2 }
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 4 }}>
                <Typography
                  variant="caption"
                  onClick={() => navigate('/forgot-password')} 
                  sx={{ 
                    color: '#666', 
                    cursor: 'pointer', 
                    fontWeight: 500,
                    '&:hover': { color: '#32CD32' }
                  }}
                >
                  Forget Password ?
                </Typography>
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                disableElevation
                sx={{
                  bgcolor: '#32CD32',
                  color: '#fff',
                  textTransform: 'none',
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  py: 1.2,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#28a745' },
                }}
              >
                Log in
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default Login;