declare module 'family-chart' {
  export interface FamilyNode {
    id: string;
    name: string;
    gender: 'male' | 'female';
    birthYear?: string;
    birthPlace?: string;
    occupation?: string;
    parents: string[];
    children: string[];
    spouses: string[];
  }

  interface FamilyChartProps {
    nodes: FamilyNode[];
    nodeTemplate: (node: FamilyNode) => React.ReactNode;
    orientation?: 'vertical' | 'horizontal';
    nodeWidth?: number;
    nodeHeight?: number;
    levelSeparation?: number;
    siblingSeparation?: number;
    subtreeSeparation?: number;
    zoom?: number;
    onNodeClick?: (node: FamilyNode) => void;
  }

  const FamilyChart: React.FC<FamilyChartProps>;
  export default FamilyChart;
} 