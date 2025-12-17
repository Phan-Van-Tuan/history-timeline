// src/components/World/MilestoneSystem.tsx
import { useMemo } from 'react';
import { useGameStore } from '../../store';
import { MilestoneMarker } from './MilestoneMarker'; // Import component mới
import { formatYear } from '../../utils/dateUtils';
import { TimelineNode } from '../../data/timelines';

export const MilestoneSystem = () => {
    const startYear = useGameStore(state => state.currentTimeline.startYear);
    const endYear = useGameStore(state => state.currentTimeline.endYear);

    // Tính toán vị trí các mốc 100 năm/lần
    const milestones = useMemo(() => {
        const markers: TimelineNode[] = [];
        // Làm tròn lên thế kỷ tiếp theo
        let current = Math.ceil(startYear / 100) * 100;

        while (current <= endYear) {
            markers.push({
                id: `milestone_${current}`,
                year: formatYear(current),
                yearValue: current,
                title: '',
                description: '',
                type: 'milestone',
                side: 'right',
            });
            current += 100;
        }
        return markers;
    }, [startYear, endYear]);

    return (
        <group>
            {milestones.map(node => (
                <MilestoneMarker key={node.id} node={node} />
            ))}
        </group>
    );
};