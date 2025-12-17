import { useRef, useState } from 'react';
import { TimelineNode } from '../../data/timelines';
import { Html } from '@react-three/drei';
import { useGameStore } from '../../store';
import { useFrame } from '@react-three/fiber';
import { Mesh, Vector3 } from 'three';
import { getZFromYear } from '../../utils/dateUtils';

// We use framer-motion-3d for smooth scale-up on hover

export const EventMarker = ({ node, isAutoMilestone = false }: { node: TimelineNode, isAutoMilestone?: boolean }) => {
    const selectNode = useGameStore(state => state.actions.selectNode);
    const startYear = useGameStore(state => state.currentTimeline.startYear);
    const playerZ = -useGameStore(state => state.positionZ);

    // Calculate Z based on Year Logic
    const worldZ = getZFromYear(node.yearValue, startYear);

    // Culling
    if (Math.abs(worldZ - playerZ) > 300 && !isAutoMilestone) return null; // Keep events visible longer than milestones?
    // Actually, milestones should probably cull earlier.
    if (Math.abs(worldZ - playerZ) > 200 && isAutoMilestone) return null;

    const [hovered, setHover] = useState(false);
    const meshRef = useRef<Mesh>(null);

    // Determine Position
    const sideMultiplier = node.side === 'left' ? -1 : 1;

    // Milestones are on the edge of the road (approx x= +/- 3.5)
    // Events are further out (approx x= +/- 7)
    // Auto Milestones (markers) are specifically placed
    const posX = isAutoMilestone
        ? 3.2
        : (node.type === 'milestone' ? sideMultiplier * 3.5 : sideMultiplier * 7);

    const scaleBase = (node.type === 'milestone' || isAutoMilestone) ? 0.5 : 1.5;

    // Manual animation
    useFrame((state, delta) => {
        if (meshRef.current) {
            const hoverScale = hovered ? 1.2 : 1;
            const targetScale = scaleBase * hoverScale;

            meshRef.current.scale.lerp(new Vector3(targetScale, targetScale, targetScale), delta * 10);

            if (node.type !== 'milestone') {
                // Float events only
                meshRef.current.position.y = 2 + Math.sin(state.clock.elapsedTime + worldZ) * 0.2;
                // Face the road
                meshRef.current.lookAt(0, 2, worldZ);
            }
        }
    });

    return (
        <group position={[posX, 0, worldZ]}>
            <mesh
                ref={meshRef}
                position={[0, (node.type === 'milestone' || isAutoMilestone) ? 0.5 : 2, 0]}
                onClick={() => !isAutoMilestone && selectNode(node)}
                onPointerOver={() => setHover(true)}
                onPointerOut={() => setHover(false)}
            >
                {/* Visuals: Milestone = Cube/Pillar, Event = Billboard/Plane or larger Box for now */}
                {isAutoMilestone ? (
                    // Road marker style: Small white concrete post
                    <boxGeometry args={[0.3, 0.8, 0.3]} />
                ) : node.type === 'milestone' ? (
                    <cylinderGeometry args={[0.5, 0.5, 1, 8]} />
                ) : (
                    <boxGeometry args={[3, 2, 0.2]} />
                )}
                <meshStandardMaterial
                    color={isAutoMilestone ? '#eee' : (node.color || 'white')}
                    emissive={hovered ? 'white' : 'black'}
                    emissiveIntensity={0.2}
                />
            </mesh>

            {/* Text Label */}
            <Html position={[0, (node.type === 'milestone' || isAutoMilestone) ? 1.5 : 4, 0]} center distanceFactor={15}>
                <div style={{
                    fontFamily: 'Inter',
                    background: hovered ? 'rgba(0,0,0,0.9)' : (isAutoMilestone ? 'transparent' : 'rgba(0,0,0,0.6)'),
                    padding: isAutoMilestone ? '2px' : '8px 12px',
                    borderRadius: '8px',
                    color: isAutoMilestone ? '#bbb' : 'white',
                    whiteSpace: 'nowrap',
                    textAlign: 'center',
                    border: (node.type === 'milestone' && !isAutoMilestone) ? '1px solid #555' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    textShadow: isAutoMilestone ? '0 1px 2px black' : 'none',
                    opacity: isAutoMilestone && !hovered ? 0.8 : 1
                }}>
                    <strong style={{ fontSize: isAutoMilestone ? '0.8em' : (node.type === 'milestone' ? '1em' : '1.5em'), display: 'block' }}>
                        {node.year}
                    </strong>
                    {node.type !== 'milestone' && !isAutoMilestone && <span style={{ fontSize: '0.9em' }}>{node.title}</span>}
                </div>
            </Html>
        </group>
    );
}

