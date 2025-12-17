import { useMemo } from 'react';
import { Instance, Instances } from '@react-three/drei';
import { DoubleSide } from 'three';

export const Scenery = () => {
    // Generate random positions for trees
    const treeCount = 100;
    const treeData = useMemo(() => {
        return Array.from({ length: treeCount }).map(() => ({
            x: (Math.random() > 0.5 ? 1 : -1) * (15 + Math.random() * 30), // 15 to 45 units away from center
            z: Math.random() * 500 - 50, // Along the road
            scale: 0.8 + Math.random() * 0.4,
            rotation: Math.random() * Math.PI
        }));
    }, []);

    return (
        <group>
            {/* Simple Low Poly Trees using Standard Geometry would be heavy if individual meshes. 
                Using Instances is better. 
            */}
            <Instances range={treeCount}>
                <coneGeometry args={[1.5, 4, 8]} />
                <meshStandardMaterial color="#2d4c1e" />

                {treeData.map((data, i) => (
                    <Instance
                        key={i}
                        position={[data.x, 2, data.z]}
                        scale={[data.scale, data.scale, data.scale]}
                    />
                ))}
            </Instances>

            {/* Trunks */}
            <Instances range={treeCount}>
                <cylinderGeometry args={[0.5, 0.5, 2]} />
                <meshStandardMaterial color="#4a3c31" />

                {treeData.map((data, i) => (
                    <Instance
                        key={i}
                        position={[data.x, 0, data.z]}
                        scale={[data.scale, data.scale, data.scale]}
                    />
                ))}
            </Instances>
        </group>
    );
}
