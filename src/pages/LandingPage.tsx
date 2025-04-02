import React from 'react';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { styled } from '@mui/material/styles';
import LandingLayout from '../components/layout/LandingLayout';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/landing.css';

const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  maxWidth: '1200px',
  margin: '0 auto',
  minHeight: '100%',
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
}));

const CardContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2),
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    marginTop: theme.spacing(3),
    flexDirection: 'row',
  },
}));

const Card = styled(Box)(({ theme }) => ({
  height: '100%',
  backgroundColor: 'white',
  borderRadius: theme.spacing(1),
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  transition: 'all 0.3s ease',
  width: '100%',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  },
  [theme.breakpoints.up('sm')]: {
    width: '33.33%',
  },
}));

const CardBody = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(3),
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  width: '50px',
  height: '50px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.primary.main,
  borderRadius: '50%',
  marginBottom: theme.spacing(2),
  '& i': {
    fontSize: '1.5rem',
    color: 'white',
  },
  [theme.breakpoints.up('sm')]: {
    width: '80px',
    height: '80px',
    '& i': {
      fontSize: '2.5rem',
    },
  },
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  fontWeight: 'bold',
  color: theme.palette.primary.main,
  fontSize: '1.2rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
  },
}));

const CardText = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: '0.9rem',
  lineHeight: 1.6,
  [theme.breakpoints.up('sm')]: {
    fontSize: '1rem',
  },
}));

const LandingPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <LandingLayout>
      <ContentContainer>
        <Typography 
          variant={isMobile ? "h4" : "h3"}
          component="h1" 
          className="text-center"
          sx={{ 
            color: 'primary.main',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            fontWeight: 'bold',
            mb: isMobile ? 3 : 5,
            fontSize: isMobile ? '1.8rem' : '2.5rem',
          }}
        >
          Welcome to मिर्जेवाला
        </Typography>
        
        <CardContainer>
          <Card>
            <CardBody>
              <IconBox>
                <i className="bi bi-clock-history"></i>
              </IconBox>
              <CardTitle variant="h5">इतिहास</CardTitle>
              <CardText>
                मिर्जेवाला (12F) भारत के राजस्थान राज्य के गंगानगर जिले में गंगानगर तहसील का एक गाँव है।
              </CardText>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <IconBox>
                <i className="bi bi-building-government"></i>
              </IconBox>
              <CardTitle variant="h5">सरकारी कार्यालय</CardTitle>
              <CardText>
                सरकारी स्कूल, सरकारी अस्पताल, सरकारी डाकघर
              </CardText>
            </CardBody>
          </Card>
          
          <Card>
            <CardBody>
              <IconBox>
                <i className="bi bi-people-fill"></i>
              </IconBox>
              <CardTitle variant="h5">जन प्रतिनिधि</CardTitle>
              <CardText>
                सरपंच, ग्राम प्रधान, विधायक, सांसद
              </CardText>
            </CardBody>
          </Card>
        </CardContainer>
      </ContentContainer>
    </LandingLayout>
  );
};

export default LandingPage; 