import { useGameStore } from '../../store';
import { Road } from './Road';
import { Player } from './Player';
import { EventMarker } from './EventMarker';
import { Scenery } from './Scenery';
import { MilestoneSystem } from './MilestoneSystem';

export const GameScene = () => {
    const nodes = useGameStore(state => state.currentTimeline.nodes);
    const theme = useGameStore(state => state.currentTimeline.theme);

    return (
        <>
            {/* Static Background to prevent Suspense/Loading issues */}
            <color attach="background" args={[theme.sky]} />

            {/* Fog for depth */}
            <fog attach="fog" args={[theme.fog, 30, 250]} />

            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 20, 5]} intensity={1} castShadow />

            <Player />
            <Road />
            <Scenery />
            <MilestoneSystem />

            {nodes.map(node => (
                <EventMarker key={node.id} node={node} />
            ))}
        </>
    );
}
