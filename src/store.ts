import { create } from 'zustand';
import { TimelineType, timelines, TimelineData, TimelineNode } from './data/timelines';

interface GameState {
    currentTimelineId: TimelineType;
    currentTimeline: TimelineData;

    // Player State
    positionZ: number;
    targetPositionZ: number;
    isMoving: boolean;
    speed: number;

    // UI State
    selectedNode: TimelineNode | null; // For modal
    isBranching: boolean; // Just reached a branch point
    branchOptions: any[] | null;

    actions: {
        setTimeline: (id: TimelineType) => void;
        moveForward: (amount: number) => void;
        tick: (delta: number) => void; // Update loop
        selectNode: (node: TimelineNode | null) => void;
        reachBranch: (options: any[]) => void;
        resolveBranch: (targetId: TimelineType) => void;
    }
}

export const useGameStore = create<GameState>((set, get) => ({
    currentTimelineId: 'world',
    currentTimeline: timelines['world'],

    positionZ: -5,
    targetPositionZ: -5,
    isMoving: false,
    speed: 5, // units per second

    selectedNode: null,
    isBranching: false,
    branchOptions: null,

    actions: {
        setTimeline: (id) => {
            const data = timelines[id];
            if (data) {
                // When switching timelines, we might want to reset position or transition smoothly
                // For now, reset to 0
                set({
                    currentTimelineId: id,
                    currentTimeline: data,
                    positionZ: -5,
                    targetPositionZ: -5,
                    isBranching: false,
                    branchOptions: null
                });
            }
        },
        moveForward: (amount) => {
            if (get().isBranching || get().selectedNode) return; // Locked
            const { targetPositionZ } = get();
            set({ targetPositionZ: targetPositionZ + amount, isMoving: true });
        },
        tick: (delta) => {
            const { positionZ, targetPositionZ, speed, isBranching } = get();
            if (isBranching) return;

            // Simple linear interpolation for smooth movement
            if (Math.abs(targetPositionZ - positionZ) > 0.1) {
                const direction = Math.sign(targetPositionZ - positionZ);
                const step = speed * delta * direction;

                // Don't overshoot
                let newPos = positionZ + step;
                if ((direction > 0 && newPos > targetPositionZ) || (direction < 0 && newPos < targetPositionZ)) {
                    newPos = targetPositionZ;
                }

                set({ positionZ: newPos });
            } else {
                if (get().isMoving) set({ isMoving: false });
            }
        },
        selectNode: (node) => set({ selectedNode: node }),
        reachBranch: (options) => set({ isBranching: true, branchOptions: options }),
        resolveBranch: (targetId) => {
            get().actions.setTimeline(targetId);
        }
    }
}));
