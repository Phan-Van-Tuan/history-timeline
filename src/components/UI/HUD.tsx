import { useState } from 'react';
import { useGameStore } from '../../store';
import { timelines, TimelineType } from '../../data/timelines';
import { formatYear, getYearFromZ } from '../../utils/dateUtils';

export const HUD = () => {
    const {
        currentTimeline,
        positionZ,
        selectedNode,
        actions
    } = useGameStore();

    const [menuOpen, setMenuOpen] = useState(false);

    // Calculate approximate year
    // Base off a rough start year. For "World", let's say we start at 4000 BC.
    // Each Step (unit) is 50 years? Let's make it dynamic later.
    const { startYear } = currentTimeline;
    // positionZ in store is "distance travelled". Player logic treats this as -Z.
    // So WorldZ = -positionZ.
    const currentYearVal = getYearFromZ(-positionZ, startYear);

    return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {/* Header / Top Bar */}
            <div style={{
                padding: '20px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
            }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '2em', fontWeight: 800, textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                        {currentTimeline.label}
                    </h1>
                </div>

                {/* Timeline Switcher Button */}
                <div style={{ pointerEvents: 'auto' }}>
                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            background: '#333',
                            color: 'white',
                            border: '1px solid #555',
                            padding: '10px 20px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: 'bold'
                        }}
                    >
                        Map / Timelines
                    </button>

                    {/* Dropdown Menu */}
                    {menuOpen && (
                        <div style={{
                            position: 'absolute',
                            right: 20,
                            top: 60,
                            background: 'rgba(30,30,30,0.95)',
                            padding: '10px',
                            borderRadius: '12px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '10px',
                            minWidth: '200px',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}>
                            <h4 style={{ margin: '5px 0 10px', opacity: 0.7, paddingLeft: '10px' }}>Select Timeline</h4>
                            {Object.entries(timelines).map(([key, data]) => (
                                <button
                                    key={key}
                                    onClick={() => {
                                        actions.setTimeline(key as TimelineType);
                                        setMenuOpen(false);
                                    }}
                                    style={{
                                        background: currentTimeline.id === key ? '#444' : 'transparent',
                                        border: 'none',
                                        textAlign: 'left',
                                        padding: '10px',
                                        color: 'white',
                                        cursor: 'pointer',
                                        borderRadius: '6px'
                                    }}
                                    onMouseEnter={e => e.currentTarget.style.background = '#555'}
                                    onMouseLeave={e => e.currentTarget.style.background = currentTimeline.id === key ? '#444' : 'transparent'}
                                >
                                    {data.label}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Bottom Info */}
            <div style={{ position: 'absolute', bottom: 20, width: '100%', textAlign: 'center', opacity: 0.8, fontSize: '1.2em', textShadow: '0 2px 4px black' }}>
                <span style={{ marginRight: '20px', fontSize: '0.8em', opacity: 0.7 }}>Scroll to Walk</span>
                <span style={{ fontWeight: 'bold' }}>Year: {formatYear(currentYearVal)}</span>
            </div>

            {/* Modal for Details */}
            {selectedNode && (
                <div style={{
                    pointerEvents: 'auto',
                    position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                    background: 'rgba(20,20,30, 0.95)',
                    padding: '40px', borderRadius: '16px',
                    maxWidth: '500px', width: '90%',
                    border: '1px solid rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
                }}>
                    <button
                        onClick={() => actions.selectNode(null)}
                        style={{ position: 'absolute', top: 10, right: 10, background: 'transparent', border: 'none', color: 'white', fontSize: '1.5em', cursor: 'pointer' }}
                    >×</button>

                    <span style={{
                        background: '#444', padding: '4px 8px', borderRadius: '4px', fontSize: '0.8em', textTransform: 'uppercase'
                    }}>
                        {selectedNode.type}
                    </span>
                    <h4 style={{ color: '#aaa', margin: '10px 0 0' }}>{selectedNode.year}</h4>
                    <h2 style={{ marginTop: '5px', marginBottom: '20px', fontSize: '2em' }}>{selectedNode.title}</h2>
                    <p style={{ lineHeight: 1.6, color: '#ddd' }}>{selectedNode.description}</p>

                    {selectedNode.image && (
                        <div style={{ marginTop: '20px', height: '200px', background: '#333', backgroundImage: `url(${selectedNode.image})`, backgroundSize: 'cover' }}></div>
                    )}
                </div>
            )}
        </div>
    );
}
