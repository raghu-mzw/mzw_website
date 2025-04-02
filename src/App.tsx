import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MainLayout from './components/layout/MainLayout';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';

// Create a theme instance
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a237e', // Deep blue
      light: '#534bae',
      dark: '#000051',
    },
    secondary: {
      main: '#c2185b', // Deep pink
      light: '#fa5788',
      dark: '#8c0032',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <MainLayout>
                <div>Dashboard Content</div>
              </MainLayout>
            }
          />
          <Route
            path="/profile"
            element={
              <MainLayout>
                <div>Profile Content</div>
              </MainLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <MainLayout>
                <div>Settings Content</div>
              </MainLayout>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
