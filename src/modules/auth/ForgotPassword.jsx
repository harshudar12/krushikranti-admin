import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  Box, Button, TextField, Typography, Paper, 
  Container, InputAdornment, IconButton, Alert, CssBaseline 
} from '@mui/material';
import { Visibility, VisibilityOff, PersonOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Reuse the same background image
import bgImage from '../../assets/images/login-bg.png'; 

// Validation Schema for the 4 fields
const validationSchema = Yup.object({
  identifier: Yup.string().required('Email or Phone Number is required'),
  otp: Yup.string().required('OTP is required').length(6, 'OTP must be 6 digits'), // Assuming 6 digit OTP
  newPassword: Yup.string().min(6, 'Password must be at least 6 characters').required('New Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const formik = useFormik({
    initialValues: {
      identifier: '',
      otp: '',
      newPassword: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError('');
      setSuccess('');
      try {
        console.log('Reset Attempt:', values);
        // Simulate API Call
        setTimeout(() => {
          setSuccess('Password Reset Successfully! Redirecting to login...');
          setTimeout(() => navigate('/login'), 2000);
        }, 1000);
      } catch (err) {
        console.error('Reset Failed', err);
        setError('Failed to reset password. Please check OTP.');
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
              p: 4, // Slightly less padding to fit more fields
              borderRadius: 4,
              textAlign: 'center',
              backgroundColor: '#ffffff',
              maxWidth: '400px',
              mx: 'auto'
            }}
          >
            {/* Green Profile Icon */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1 }}>
              <Box
                sx={{
                  width: 60,
                  height: 60,
                  borderRadius: '50%',
                  border: '3px solid #32CD32',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <PersonOutline sx={{ fontSize: 35, color: '#32CD32' }} />
              </Box>
            </Box>

            <Typography variant="h5" sx={{ fontWeight: '800', mb: 0.5, color: '#000' }}>
              Admin
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, fontWeight: 500, color: '#000' }}>
              KrushiKranti Administration Portal
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <form onSubmit={formik.handleSubmit}>
              
              {/* Field 1: Email / Phone */}
              <Box sx={{ textAlign: 'left', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: '500', mb: 0.5, color: '#000' }}>
                  Email / Phone No
                </Typography>
                <TextField
                  fullWidth
                  id="identifier"
                  name="identifier"
                  placeholder="Enter Your Email or Phone No"
                  variant="outlined"
                  size="small"
                  value={formik.values.identifier}
                  onChange={formik.handleChange}
                  error={formik.touched.identifier && Boolean(formik.errors.identifier)}
                  helperText={formik.touched.identifier && formik.errors.identifier}
                  sx={inputStyle}
                />
              </Box>

              {/* Field 2: Enter OTP */}
              <Box sx={{ textAlign: 'left', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: '500', mb: 0.5, color: '#000' }}>
                  Enter OTP
                </Typography>
                <TextField
                  fullWidth
                  id="otp"
                  name="otp"
                  placeholder="Enter Your OTP"
                  variant="outlined"
                  size="small"
                  value={formik.values.otp}
                  onChange={formik.handleChange}
                  error={formik.touched.otp && Boolean(formik.errors.otp)}
                  helperText={formik.touched.otp && formik.errors.otp}
                  sx={inputStyle}
                />
              </Box>

              {/* Field 3: New Password */}
              <Box sx={{ textAlign: 'left', mb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: '500', mb: 0.5, color: '#000' }}>
                  New Password
                </Typography>
                <TextField
                  fullWidth
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create Your New Password"
                  variant="outlined"
                  size="small"
                  value={formik.values.newPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                  helperText={formik.touched.newPassword && formik.errors.newPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyle}
                />
              </Box>

              {/* Field 4: Confirm Password */}
              <Box sx={{ textAlign: 'left', mb: 3 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: '500', mb: 0.5, color: '#000' }}>
                  Confirm Password
                </Typography>
                <TextField
                  fullWidth
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm Your Password"
                  variant="outlined"
                  size="small"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                  helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end" size="small">
                          {showConfirmPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={inputStyle}
                />
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
                  fontSize: '1rem',
                  py: 1,
                  borderRadius: 2,
                  '&:hover': { bgcolor: '#28a745' },
                }}
              >
                Register
              </Button>

              <Button 
                onClick={() => navigate('/login')}
                sx={{ mt: 2, textTransform: 'none', color: '#666' }}
              >
                Back to Login
              </Button>

            </form>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

// Reusable Style for the Gray Inputs
const inputStyle = {
  '& .MuiOutlinedInput-root': {
    backgroundColor: '#F0F0F0',
    borderRadius: 2,
    '& fieldset': { border: 'none' },
    '&:hover fieldset': { border: 'none' },
    '&.Mui-focused fieldset': { border: '1px solid #32CD32' },
  },
  '& input': { py: 1.2, px: 2 }
};

export default ForgotPassword;