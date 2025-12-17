import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect } from 'react'
import { GameScene } from './components/World/GameScene'
import { HUD } from './components/UI/HUD'
import { useGameStore } from './store'

function App() {
    const moveForward = useGameStore(state => state.actions.moveForward);

    useEffect(() => {
        const handleWheel = (e: WheelEvent) => {
            // Scroll down (positive delta) -> Move forward
            // Normalize delta
            const speed = 0.05;
            if (Math.abs(e.deltaY) > 0) {
                moveForward(Math.sign(e.deltaY) * speed * 20); // 20 units per scroll roughly
            }
        };

        // Also basic keyboard controls
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp' || e.key === 'w') {
                moveForward(5);
            }
            if (e.key === 'ArrowDown' || e.key === 's') {
                moveForward(-5);
            }
        };

        window.addEventListener('wheel', handleWheel);
        window.addEventListener('keydown', handleKey);
        return () => {
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('keydown', handleKey);
        }
    }, [moveForward]);

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
            <Canvas shadows camera={{ position: [0, 2, 5], fov: 60 }}>
                <Suspense fallback={null}>
                    <GameScene />
                </Suspense>
            </Canvas>
            <HUD />
        </div>
    )
}

export default App
