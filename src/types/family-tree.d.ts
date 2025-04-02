import { FC } from 'react';

export type Gender = 'male' | 'female';
export type RelType = 'blood' | 'married';

export interface FamilyNode {
  id: string;
  name: string;
  gender: Gender;
  birthYear?: string;
  parents: Array<{
    id: string;
    type: RelType;
    name: string;
    gender: Gender;
  }>;
  children: Array<{
    id: string;
    type: RelType;
    name: string;
    gender: Gender;
  }>;
  siblings: Array<{
    id: string;
    type: RelType;
    name: string;
    gender: Gender;
  }>;
  spouses: Array<{
    id: string;
    type: RelType;
    name: string;
    gender: Gender;
  }>;
}

export interface FamilyTreeNodeProps {
  node: FamilyNode;
  style?: React.CSSProperties;
}

export interface ReactFamilyTreeProps {
  nodes: FamilyNode[];
  nodeComponent: FC<FamilyTreeNodeProps>;
  width: number;
  height: number;
}

declare module 'react-family-tree' {
  const ReactFamilyTree: FC<ReactFamilyTreeProps>;
  export default ReactFamilyTree;
  export type { FamilyNode, FamilyTreeNodeProps, ReactFamilyTreeProps };
} 