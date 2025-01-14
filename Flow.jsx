import React from 'react';
import { useCallback, useMemo } from 'react';
import ReactFlow, {
MiniMap,
Controls,
Background,
useNodesState,
useEdgesState,
addEdge,
} from 'reactflow';

import 'reactflow/dist/style.css';

import CustomNode from './CustomNode'

 
const initialNodes = [
{ id: '1', position: { x: 0, y: 0 },   data: { label: '1' } },
{ id: '2', position: { x: 0, y: 100 }, data: { label: '2' } },
{ id: '3', position: { x: 0, y: 200 }, data: { foo: 'bar' }, type: 'customNode' },
];

const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);
  const nodeTypes = useMemo(() => ({ customNode: CustomNode }), []);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
    >
      <MiniMap />
      <Controls />
      <Background />
    </ReactFlow>
  );
}

export default Flow;
