import { Instance, Instances } from '@react-three/drei';
import { useGameStore } from '../../store';

export const Road = () => {
    // A simple infinite-looking floor
    // We can use a large plane dependent on the player position to "move" it or just big enough.
    const theme = useGameStore(state => state.currentTimeline.theme);

    return (
        <group>
            {/* Asphalt Road */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
                <planeGeometry args={[6, 1000]} />
                <meshStandardMaterial color="#333333" roughness={0.8} />
            </mesh>

            {/* Center Dashed Lines - Generated as simple meshes for crispness */}
            {Array.from({ length: 100 }).map((_, i) => (
                <mesh
                    key={i}
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, -0.04, i * 10 - 50]} // Spaced every 10 units, starting back a bit
                >
                    <planeGeometry args={[0.2, 3]} /> {/* 3m long dash */}
                    <meshStandardMaterial color="#ffd700" /> {/* Gold/Yellow */}
                </mesh>
            ))}

            {/* Side Lines */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-2.8, -0.04, 0]}>
                <planeGeometry args={[0.1, 1000]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2.8, -0.04, 0]}>
                <planeGeometry args={[0.1, 1000]} />
                <meshStandardMaterial color="#ffffff" />
            </mesh>

            {/* Grid/Ground below everything */}
            <gridHelper args={[1000, 200, 0x222222, 0x111111]} position={[0, -0.1, -500]} />
        </group>
    );
}
