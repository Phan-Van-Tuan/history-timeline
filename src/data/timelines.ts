
export type TimelineType = 'world' | 'vietnam' | 'china' | 'prehistory';

export interface BranchOption {
    id: string;
    label: string;
    targetTimelineId: TimelineType;
    description?: string;
}

export interface TimelineNode {
    id: string;
    year: string; // Display text
    yearValue: number; // Logic value (e.g. -2000)
    title: string;
    description: string;
    type: 'event' | 'branch' | 'milestone';
    side?: 'left' | 'right';
    branches?: BranchOption[];
    image?: string;
    color?: string;
}

export interface TimelineData {
    id: TimelineType;
    label: string;
    startYear: number;
    endYear: number;
    nodes: TimelineNode[];
    theme: {
        sky: string;
        ground: string;
        fog: string;
    }
}

export const timelines: Record<TimelineType, TimelineData> = {
    world: {
        id: 'world',
        label: 'World History',
        startYear: -4000,
        endYear: 2000,
        theme: {
            sky: '#87CEEB',
            ground: '#1a1a1a',
            fog: '#ffffff'
        },
        nodes: [
            {
                id: 'start',
                year: 'Start (4000 BC)',
                yearValue: -4000,
                title: 'The Beginning',
                description: 'The journey through history begins here.',
                type: 'milestone',
                color: '#ffffff',
                side: 'right'
            },
            {
                id: 'ancient_egypt',
                year: '3100 BC',
                yearValue: -3100,
                title: 'Ancient Egypt',
                description: 'Unification of Upper and Lower Egypt.',
                type: 'event',
                side: 'left',
                color: '#e6c200'
            },
            {
                id: 'roman_empire',
                year: '27 BC',
                yearValue: -27,
                title: 'Roman Empire',
                description: 'The rise of the Roman Empire.',
                type: 'event',
                side: 'right',
                color: '#d4af37'
            }
        ]
    },
    vietnam: {
        id: 'vietnam',
        label: 'History of Vietnam',
        startYear: -3000,
        endYear: 2000,
        theme: {
            sky: '#FFF8DC',
            ground: '#2d3a2d',
            fog: '#F5DEB3'
        },
        nodes: [
            {
                id: 'vn_start',
                year: '2879 BC',
                yearValue: -2879,
                title: 'Hong Bang Dynasty',
                description: 'The legendary beginning of Vietnam.',
                type: 'milestone',
                side: 'left',
                color: '#ff0000'
            },
            {
                id: 'vn_au_lac',
                year: '257 BC',
                yearValue: -257,
                title: 'Au Lac State',
                description: 'Founded by Thuc Phan (An Duong Vuong).',
                type: 'event',
                side: 'right',
                color: '#cc0000'
            },
            {
                id: 'vn_chi_lang',
                year: '1427 AD',
                yearValue: 1427,
                title: 'Battle of Chi Lang',
                description: 'Decisive victory against the Ming dynasty.',
                type: 'event',
                side: 'left',
                image: 'chi_lang_pass.jpg',
                color: '#ffcc00'
            }
        ]
    },
    china: {
        id: 'china',
        label: 'History of China',
        startYear: -2000, endYear: 2000,
        theme: { sky: '#eec', ground: '#552', fog: '#ddb' },
        nodes: []
    },
    prehistory: {
        id: 'prehistory',
        label: 'Prehistory',
        startYear: -10000, endYear: -4000,
        theme: { sky: '#000', ground: '#111', fog: '#222' },
        nodes: []
    }
};
