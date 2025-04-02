import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, ListItem, ListItemIcon, ListItemText, Menu, MenuItem, Avatar, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { hi } from 'date-fns/locale';
import { useNavigate, useLocation } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Facebook, Twitter, LinkedIn, LocationOn, Logout, PhoneAndroid, DesktopWindows } from '@mui/icons-material';

const Header = styled(Paper)(({ theme }) => ({
  height: 'auto',
  minHeight: '10vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: '0 20px',
  },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '10px',
  [theme.breakpoints.up('sm')]: {
    marginBottom: 0,
  },
}));

const Logo = styled('img')(({ theme }) => ({
  height: '40px',
  width: 'auto',
  [theme.breakpoints.up('sm')]: {
    height: '50px',
  },
}));

const HeaderInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(1),
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    gap: theme.spacing(2),
  },
}));

const LeftPane = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: theme.spacing(1),
  backgroundColor: theme.palette.grey[100],
  overflowX: 'auto',
  [theme.breakpoints.up('sm')]: {
    width: '10%',
    height: '85vh',
    flexDirection: 'column',
    padding: '20px 0',
    overflowX: 'hidden',
  },
}));

const MainContent = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: 'auto',
  minHeight: '85vh',
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.default,
  position: 'relative',
  overflow: 'auto',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundImage: 'url("/images/background.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: 0.3,
    zIndex: 0,
  },
  '& > *': {
    position: 'relative',
    zIndex: 1,
  },
  [theme.breakpoints.up('sm')]: {
    width: '90%',
    height: '85vh',
    padding: '20px',
  },
}));

const Footer = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  marginTop: 'auto',
  width: '100%',
}));

const FooterContent = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
  width: '100%',
  padding: '0 20px',
  [theme.breakpoints.up('sm')]: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

const SocialIcons = styled('div')({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
});

const CopyrightText = styled('div')({
  textAlign: 'center',
  flex: 1,
});

const StyledIconButton = styled(IconButton)({
  padding: '4px',
  '& .MuiSvgIcon-root': {
    fontSize: '16px',
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
});

const StyledMenuItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1),
  cursor: 'pointer',
  width: 'auto',
  margin: theme.spacing(0.5),
  borderRadius: theme.spacing(1),
  whiteSpace: 'nowrap',
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    '& .MuiListItemIcon-root': {
      color: 'white',
    },
  },
  [theme.breakpoints.up('sm')]: {
    width: '100%',
    margin: 0,
    borderRadius: 0,
    whiteSpace: 'normal',
  },
}));

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: '30px',
  color: 'inherit',
});

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
  '& .MuiListItemText-primary': {
    fontSize: '0.9rem',
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
  },
}));

const UserMenu = styled(Menu)(({ theme }) => ({
  '& .MuiPaper-root': {
    minWidth: '200px',
  },
}));

const UserMenuItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '10px 20px',
}));

const AvatarButton = styled(IconButton)(({ theme }) => ({
  padding: 0,
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const ViewToggleContainer = styled(Box)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  display: 'flex',
  gap: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1),
  borderRadius: theme.spacing(2),
  boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
  zIndex: 1000,
}));

const ViewToggleButton = styled(IconButton)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&.active': {
    backgroundColor: theme.palette.secondary.main,
  },
}));

interface User {
  email: string;
  name: string;
  imageUrl: string;
}

interface LandingLayoutProps {
  children: React.ReactNode;
}

const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  const [dateTime, setDateTime] = useState(new Date());
  const [user, setUser] = useState<User | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [visitorCount, setVisitorCount] = useState(() => {
    const savedCount = localStorage.getItem('visitorCount');
    return savedCount ? parseInt(savedCount) : 0;
  });
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('desktop');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    // Check for logged in user
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
      }
    }

    // Check if this is a new session (no sessionStorage entry)
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited && location.pathname === '/') {
      try {
        // Increment visitor count only for new sessions
        const newCount = visitorCount + 1;
        setVisitorCount(newCount);
        localStorage.setItem('visitorCount', newCount.toString());
        // Mark this session as visited
        sessionStorage.setItem('hasVisited', 'true');
      } catch (error) {
        console.error('Error updating visitor count:', error);
      }
    }

    return () => {
      clearInterval(timer);
    };
  }, [location.pathname, visitorCount]);

  const formatDate = (date: Date) => {
    return format(date, 'EEEE, d MMMM yyyy', { locale: hi });
  };

  const formatTime = (date: Date) => {
    return format(date, 'hh:mm:ss a', { locale: hi });
  };

  const handleDashboardClick = () => {
    navigate('/');
  };

  const handleMapClick = () => {
    window.open('https://www.google.com/maps/@29.9676242,73.7457844,16.67z?entry=ttu&g_ep=EgoyMDI1MDMyMy4wIKXMDSoASAFQAw%3D%3D', '_blank');
  };

  const handleFacebookClick = () => {
    window.open('https://www.facebook.com/profile.php?id=100085328838385', '_blank');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleAvatarClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('user');
      setUser(null);
      handleMenuClose();
      navigate('/login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const handleViewToggle = (mode: 'mobile' | 'desktop') => {
    try {
      setViewMode(mode);
      // Use requestAnimationFrame to ensure smooth transition
      requestAnimationFrame(() => {
        if (mode === 'mobile') {
          document.body.style.width = '375px';
          document.body.style.margin = '0 auto';
        } else {
          document.body.style.width = '100%';
          document.body.style.margin = '0';
        }
      });
    } catch (error) {
      console.error('Error toggling view mode:', error);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f5f5f5',
        position: 'relative',
        overflow: 'auto',
      }}
    >
      <Header elevation={3}>
        <LogoContainer>
          <Logo src="/images/logo.png" alt="मिर्जेवाला Logo" />
          <Typography variant="h4" component="div" sx={{ fontSize: { xs: '1.5rem', sm: '2rem' } }}>
            मिर्जेवाला
          </Typography>
        </LogoContainer>
        <HeaderInfo>
          <Box>
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.8, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
              दिनांक
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>{formatDate(dateTime)}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.8, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
              समय
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>{formatTime(dateTime)}</Typography>
          </Box>
          <Box>
            <Typography variant="caption" sx={{ display: 'block', opacity: 0.8, fontSize: { xs: '0.7rem', sm: '0.75rem' } }}>
              आगंतुक
            </Typography>
            <Typography sx={{ fontSize: { xs: '0.9rem', sm: '1rem' } }}>{visitorCount}</Typography>
          </Box>
          {user && (
            <AvatarButton
              onClick={handleAvatarClick}
              size="small"
            >
              <Avatar
                src={user.imageUrl}
                alt={user.name}
                sx={{ width: { xs: 28, sm: 32 }, height: { xs: 28, sm: 32 } }}
              />
            </AvatarButton>
          )}
        </HeaderInfo>
      </Header>

      <Box sx={{ 
        display: 'flex', 
        flex: 1,
        flexDirection: { xs: 'column', sm: 'row' },
        overflow: 'auto',
      }}>
        <LeftPane elevation={2}>
          <StyledMenuItem onClick={handleDashboardClick}>
            <StyledListItemIcon>
              <i className="bi bi-speedometer2"></i>
            </StyledListItemIcon>
            <StyledListItemText primary="DASHBOARD" />
          </StyledMenuItem>

          <StyledMenuItem>
            <StyledListItemIcon>
              <i className="bi bi-file-earmark-text"></i>
            </StyledListItemIcon>
            <StyledListItemText primary="Reports" />
          </StyledMenuItem>

          <StyledMenuItem>
            <StyledListItemIcon>
              <i className="bi bi-gear"></i>
            </StyledListItemIcon>
            <StyledListItemText primary="Settings" />
          </StyledMenuItem>

          {!user && (
            <StyledMenuItem onClick={handleLoginClick}>
              <StyledListItemIcon>
                <i className="bi bi-box-arrow-in-right"></i>
              </StyledListItemIcon>
              <StyledListItemText primary="Login" />
            </StyledMenuItem>
          )}
        </LeftPane>

        <MainContent elevation={2}>
          {children}
        </MainContent>
      </Box>

      <Footer>
        <FooterContent>
          <SocialIcons>
            <StyledIconButton 
              color="inherit" 
              onClick={handleFacebookClick}
              size="small"
            >
              <Facebook sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
            </StyledIconButton>
            <StyledIconButton color="inherit" size="small">
              <Twitter sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
            </StyledIconButton>
            <StyledIconButton color="inherit" size="small">
              <LinkedIn sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
            </StyledIconButton>
            <StyledIconButton 
              color="inherit" 
              onClick={handleMapClick}
              size="small"
            >
              <LocationOn sx={{ fontSize: { xs: '1.2rem', sm: '1.5rem' } }} />
            </StyledIconButton>
          </SocialIcons>
          <CopyrightText>
            <Typography sx={{ fontSize: { xs: '0.8rem', sm: '0.875rem' } }}>
              © {new Date().getFullYear()} मिर्जेवाला. All rights reserved.
            </Typography>
          </CopyrightText>
        </FooterContent>
      </Footer>

      <ViewToggleContainer>
        <Tooltip title="Mobile View">
          <ViewToggleButton 
            onClick={() => handleViewToggle('mobile')}
            className={viewMode === 'mobile' ? 'active' : ''}
          >
            <PhoneAndroid />
          </ViewToggleButton>
        </Tooltip>
        <Tooltip title="Desktop View">
          <ViewToggleButton 
            onClick={() => handleViewToggle('desktop')}
            className={viewMode === 'desktop' ? 'active' : ''}
          >
            <DesktopWindows />
          </ViewToggleButton>
        </Tooltip>
      </ViewToggleContainer>

      <UserMenu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <UserMenuItem disabled>
          <Typography variant="body2" color="textSecondary">
            {user?.email}
          </Typography>
        </UserMenuItem>
        <UserMenuItem onClick={handleLogout}>
          <Logout fontSize="small" />
          <Typography>Logout</Typography>
        </UserMenuItem>
      </UserMenu>
    </Box>
  );
};

export default LandingLayout; 