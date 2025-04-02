import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

const NodeContainer = styled(Box)<{ gender: 'male' | 'female' }>(({ gender }) => ({
  width: '100%',
  height: '100%',
  padding: '10px',
  borderRadius: '4px',
  border: '2px solid #1976d2',
  backgroundColor: gender === 'male' ? '#FFD700' : '#FFB6C1',
  textAlign: 'center',
  cursor: 'pointer',
  position: 'relative',
  zIndex: 1,
  '&:hover': {
    backgroundColor: gender === 'male' ? '#FFE55C' : '#FFC0CB',
  },
}));

const NodeName = styled(Typography)({
  fontWeight: 'bold',
  fontSize: '14px',
  marginBottom: '4px',
});

const NodeYear = styled(Typography)({
  fontSize: '12px',
  color: '#000',
});

interface FamilyTreeNodeProps {
  node: {
    id: string;
    name: string;
    gender: 'male' | 'female';
    birthYear?: string;
  };
  style?: React.CSSProperties;
}

const FamilyTreeNode: React.FC<FamilyTreeNodeProps> = ({ node, style }) => {
  return (
    <NodeContainer gender={node.gender} style={style}>
      <NodeName>{node.name}</NodeName>
      {node.birthYear && <NodeYear>{node.birthYear}</NodeYear>}
    </NodeContainer>
  );
};

export default FamilyTreeNode; 