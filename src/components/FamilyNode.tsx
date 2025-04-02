import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const NodeContainer = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px',
  backgroundColor: theme.palette.background.paper,
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: '4px',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: theme.shadows[4],
  },
}));

const NameText = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '14px',
  textAlign: 'center',
  marginBottom: '4px',
});

const YearText = styled(Typography)({
  fontSize: '12px',
  color: 'text.secondary',
});

interface FamilyNodeProps {
  node: {
    id: string;
    name: string;
    birthYear?: string;
    gender: 'male' | 'female';
  };
  style: React.CSSProperties;
}

const FamilyNode: React.FC<FamilyNodeProps> = ({ node, style }) => {
  return (
    <NodeContainer 
      style={style}
      sx={{
        backgroundColor: node.gender === 'male' ? '#FFD700' : '#FFB6C1',
      }}
    >
      <NameText>{node.name}</NameText>
      {node.birthYear && <YearText>{node.birthYear}</YearText>}
    </NodeContainer>
  );
};

export default FamilyNode; 