import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, Paper, CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import LandingLayout from '../components/layout/LandingLayout';

const LoginContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100%',
  padding: '20px',
});

const LoginPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  maxWidth: '400px',
  width: '100%',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const Login: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    const count = localStorage.getItem('visitorCount');
    if (count) {
      setVisitorCount(parseInt(count));
    }

    // Load Google Sign-In script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // @ts-ignore
      if (window.google && window.google.accounts) {
        // @ts-ignore
        window.google.accounts.id.initialize({
          client_id: '13155858407-2va1o0858h4mmfji9mabsfkarjj0bjh3.apps.googleusercontent.com',
          callback: handleGoogleCallback,
        });
        // @ts-ignore
        window.google.accounts.id.renderButton(
          document.getElementById('google-login-button'),
          { theme: 'outline', size: 'large' }
        );
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleGoogleCallback = (response: any) => {
    console.log('Google Sign-In response:', response);
    // Handle the Google Sign-In response here
    setIsLoading(false);
  };

  return (
    <LandingLayout>
      <LoginContainer>
        <LoginPaper>
          <Typography variant="h4" gutterBottom>
            Login
          </Typography>
          <Box sx={{ mt: 2, width: '100%' }}>
            <div id="google-login-button"></div>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Website Visitors: {visitorCount}
            </Typography>
          </Box>
        </LoginPaper>
      </LoginContainer>
    </LandingLayout>
  );
};

export default Login; 