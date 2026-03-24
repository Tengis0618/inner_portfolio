import React, { useEffect, useRef, useState } from 'react';
import Colors from '../../constants/colors';
import { Icon } from '../general';
// import { } from '../general';
// import Home from '../site/Home';
// import Window from './Window';

export interface ToolbarProps {
    windows: DesktopWindows;
    toggleMinimize: (key: string) => void;
    shutdown: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
    windows,
    toggleMinimize,
    shutdown,
}) => {
    const getTime = () => {
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let amPm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        let mins = minutes < 10 ? '0' + minutes : minutes;
        const strTime = hours + ':' + mins + ' ' + amPm;
        return strTime;
    };

    const [startWindowOpen, setStartWindowOpen] = useState(false);
    const [startHovered, setStartHovered] = useState(false);
    const lastClickInside = useRef(false);

    const [lastActive, setLastActive] = useState('');

    useEffect(() => {
        let max = 0;
        let k = '';
        Object.keys(windows).forEach((key) => {
            if (windows[key].zIndex >= max) {
                max = windows[key].zIndex;
                k = key;
            }
        });
        setLastActive(k);
    }, [windows]);

    const [time, setTime] = useState(getTime());

    const updateTime = () => {
        setTime(getTime());
        setTimeout(() => {
            updateTime();
        }, 5000);
    };

    useEffect(() => {
        updateTime();
    });

    const onCheckClick = () => {
        if (lastClickInside.current) {
            setStartWindowOpen(true);
        } else {
            setStartWindowOpen(false);
        }
        lastClickInside.current = false;
    };

    useEffect(() => {
        window.addEventListener('mousedown', onCheckClick, false);
        return () => {
            window.removeEventListener('mousedown', onCheckClick, false);
        };
    }, []);

    const onStartWindowClicked = () => {
        setStartWindowOpen(true);
        lastClickInside.current = true;
    };

    const toggleStartWindow = () => {
        if (!startWindowOpen) {
            lastClickInside.current = true;
        } else {
            lastClickInside.current = false;
        }
    };

    return (
        <div style={styles.toolbarOuter}>
            {startWindowOpen && (
                <div
                    onMouseDown={onStartWindowClicked}
                    style={styles.startWindow}
                >
                    <div style={styles.startWindowInner}>
                        <div style={styles.verticalStartContainer}>
                            <p style={styles.verticalText}>TengisXP</p>
                        </div>
                        <div style={styles.startWindowContent}>
                            <div style={styles.startMenuSpace} />
                            <div style={styles.startMenuLine} />
                            <div
                                className="start-menu-option"
                                style={styles.startMenuOption}
                                onMouseDown={shutdown}
                            >
                                <Icon
                                    style={styles.startMenuIcon}
                                    icon="computerBig"
                                />
                                <p style={styles.startMenuText}>
                                    Turn Off Computer
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div style={styles.toolbarInner}>
                <div style={styles.toolbar}>
                    <div
                        style={Object.assign(
                            {},
                            styles.startButton,
                            startWindowOpen && styles.startButtonPressed,
                            startHovered && !startWindowOpen && styles.startButtonHover
                        )}
                        onMouseDown={toggleStartWindow}
                        onMouseEnter={() => {setStartHovered(true)}}
                        onMouseLeave={() => {setStartHovered(false)}}
                    >
                        <Icon
                            size={18}
                            icon="windowsStartIcon"
                            style={styles.startIcon}
                        />
                        <span style={styles.startText}>Start</span>
                    </div>
                    <div style={styles.toolbarTabsContainer}>
                        {Object.keys(windows).map((key) => {
                            const isActive = lastActive === key && !windows[key].minimized;
                            return (
                                <div
                                    key={key}
                                    style={Object.assign(
                                        {},
                                        styles.taskButton,
                                        isActive && styles.taskButtonActive 
                                    )}
                                    onMouseDown={() => toggleMinimize(key)}
                                >
                                    <Icon
                                        size={18}
                                        icon={windows[key].icon}
                                        style={styles.taskIcon}
                                    />
                                    <span style={styles.taskText}>
                                            {windows[key].name}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div style={styles.systemTray}>
                    <div style={styles.trayIcons}>
                        <Icon style={styles.volumeIcon} icon="volumeOn" />
                    </div>
                    <div style={styles.clockContainer}>
                        <div style={styles.timeText}>{time}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    toolbarOuter: {
        boxSizing: 'border-box',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 32,
        background: 'linear-gradient(to bottom, #245EDC 0%, #1941A5 50%, #1941A5 50%, #1941A5 100%)',
        borderTop: '1px solid #4A90E2',
        zIndex: 100000,
    },
    verticalStartContainer: {
        width: 60,
        background: 'linear-gradient(135deg, #3CB371 0%, #2E8B57 100%)',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '10px 0',
    },
    verticalText: {
        fontFamily: 'Tahoma, sans-serif',
        fontSize: 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadow: '2px 2px 2px rgba(0,0,0,0.5)',
        writingMode: 'vertical-rl',
        textOrientation: 'mixed',
        transform: 'rotate(180deg)',
        padding: '10px 5px',
    },
    startWindowContent: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F0F8FF',
    },
    startWindow: {
        position: 'absolute',
        bottom:30,
        display: 'flex',
        flex: 1,
        width: 256,
        height: 400,
        left: 0,
        boxSizing: 'border-box',
        border: '2px solid #4A90E2',
        background: '#F0F8FF',
        borderRadius: '8px 8px 0 0',
        boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
    },
    activeTabOuter: {
        border: `1px solid ${Colors.black}`,
        borderBottomColor: Colors.white,
        borderRightColor: Colors.white,
    },
    startWindowInner: {
        display: 'flex',
        width: '100%',
        borderRadius: '6px 6px 0 0',
        overflow: 'hidden',
    },
    startMenuIcon: {
        width: 32,
        height: 32,
        marginRight: 8,
    },
    startMenuText: {
        margin: 0,
        fontSize: '11px',
        fontFamily: 'Tahoma, sans-serif',
    },
    startMenuOption: {
        display: 'flex',
        alignItems: 'center',
        padding: '8px 16px',
        cursor: 'pointer',
        fontSize: '11px',
        fontFamily: 'Tahoma, sans-serif',
    },
    startMenuSpace: {
        flex: 1,
    },
    startMenuLine: {
        height: 1,
        backgroundColor: '#8A8A8A',
        margin: '0 10px',
    },
    activeTabInner: {
        border: `1px solid ${Colors.blue}`,
        borderBottomColor: Colors.blue,
        borderRightColor: Colors.blue,
        backgroundImage: `linear-gradient(45deg, white 25%, transparent 25%),
        linear-gradient(-45deg,  white 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%,  white 75%),
        linear-gradient(-45deg, transparent 75%,  white 75%)`,
        backgroundSize: `4px 4px`,
        backgroundPosition: `0 0, 0 2px, 2px -2px, -2px 0px`,
        pointerEvents: 'none',
    },
    tabContainerOuter: {
        display: 'flex',
        flex: 1,
        maxWidth: 300,
        marginRight: 4,
        boxSizing: 'border-box',
        cursor: 'pointer',
        border: `1px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
    },
    tabContainer: {
        display: 'flex',
        border: `1px solid ${Colors.lightGray}`,
        borderBottomColor: Colors.darkGray,
        borderRightColor: Colors.darkGray,
        alignItems: 'center',
        paddingLeft: 4,
        flex: 1,
    },
    tabIcon: {
        marginRight: 6,
    },
    startContainer: {
        alignItems: 'center',
        flexShrink: 1,
        // background: 'red',
        border: `1px solid ${Colors.lightGray}`,
        borderBottomColor: Colors.darkGray,
        borderRightColor: Colors.darkGray,
        padding: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    startContainerOuter: {
        marginLeft: 3,
        boxSizing: 'border-box',
        cursor: 'pointer',
        border: `1px solid ${Colors.white}`,
        borderBottomColor: Colors.black,
        borderRightColor: Colors.black,
    },
    toolbarTabsContainer: {
        // background: 'blue',
        /*flex: 1,
        marginLeft: 4,
        marginRight: 4,*/
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        height: '100%',
        gap: '2px',
        marginLeft: 6,
    },
    startIcon: {
        marginRight: 4,
        filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.3))',
    },
    toolbarInner: {
        alignItems: 'center',
        flex: 1,
        height: '100%',
        padding: '2px 4px',
    },
    toolbar: {
        /*flexGrow: 1,
        width: '100%',*/
        display: 'flex',
        alignItems: 'center',
        flex: 1,
        height: '100%',
    },
    time: {
        flexShrink: 1,
        width: 86,
        height: 24,
        boxSizing: 'border-box',
        marginRight: 4,
        paddingLeft: 4,
        paddingRight: 4,
        border: `1px solid ${Colors.white}`,
        borderTopColor: Colors.darkGray,

        justifyContent: 'space-between',
        alignItems: 'center',
        borderLeftColor: Colors.darkGray,
    },
    volumeIcon: {
        cursor: 'pointer',
        height: 18,
        width: 18,
    },
    tabText: {
        fontSize: 14,
        fontFamily: 'MSSerif',
    },
    timeText: {
        fontSize: '11px',
        fontFamily: 'Tahoma, sans-serif',
        color: '#000000',
        lineHeight: '1',
    },
    startButton: {
        /*
        display: 'flex',
        alignItems: 'center',
        height: 32,
        padding: '2px 12px 0px 6px',
        marginRight: 6,
        marginLeft: 0,
        backgroundColor: '#2E8B57', // XP Start button green
        background: 'linear-gradient(to bottom, #3CB371 0%, #2E8B57 50%, #228B22 100%)',
        border: '1px solid #FFFFFF',
        borderRadius: '6px 6px 0 0', // Rounded top corners
        cursor: 'pointer',
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '11px',
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
        boxShadow: 'inset 1px 1px 1px rgba(255,255,255,0.3), 1px 1px 2px rgba(0,0,0,0.3)',
        */
        display: 'flex',
        alignItems: 'center',
        height: 32,
        padding: '2px 16px 0px 8px', // Increased right padding for more space
        marginRight: 8, // Increased margin to separate from next element
        marginLeft: -4, // Negative margin to eliminate blue space on left
        backgroundColor: '#2E8B57', // XP Start button green
        background: 'linear-gradient(to bottom, #3CB371 0%, #2E8B57 50%, #228B22 100%)',
        border: '1px solid #FFFFFF',
        borderRadius: '0 12px 12px 0', // More curved on the right side (top-right corner)
        cursor: 'pointer',
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '11px',
        fontWeight: 'bold',
        color: '#FFFFFF',
        textShadow: '1px 1px 1px rgba(0,0,0,0.5)',
        boxShadow: 'inset 1px 1px 1px rgba(255,255,255,0.3), 1px 1px 2px rgba(0,0,0,0.3)',
        position: 'relative', // Helps with positioning
        zIndex: 1, // Ensures it's above the toolbar background
    },
    startButtonHover: {
        background: 'linear-gradient(to bottom, #4CC384 0%, #3CB371 50%, #2E8B57 100%)',
        borderColor: '#90EE90',
    },
    startButtonPressed: {
        background: 'linear-gradient(to bottom, #228B22 0%, #2E8B57 50%, #3CB371 100%)',
        boxShadow: 'inset 1px 1px 2px rgba(0,0,0,0.3)',
        borderColor: '#CCCCCC',
    },
    startText: {
        fontSize: '11px',
        fontWeight: 'bold',
        fontFamily: 'Tahoma, sans-serif',
    },
    taskButton: {
        display: 'flex',
        alignItems: 'center',
        height: 30,
        minWidth: 120,
        maxWidth: 200,
        padding: '2px 8px',
        backgroundColor: '#E1E9F0',
        background: 'linear-gradient(to bottom, #F0F8FF 0%, #E1E9F0 50%, #D6E5F0 100%)',
        border: '1px solid #FFFFFF',
        borderRightColor: '#8A8A8A',
        borderBottomColor: '#8A8A8A',
        borderRadius: '3px 3px 6px 6px',
        cursor: 'pointer',
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '11px',
        color: '#000000',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    taskButtonActive: {
        background: 'linear-gradient(to bottom, #D6E5F0 0%, #C0D0E0 50%, #B0C0D0 100%)',
        border: '1px solid #8A8A8A',
        borderRightColor: '#FFFFFF',
        borderBottomColor: '#FFFFFF',
        boxShadow: 'inset 1px 1px 1px rgba(0,0,0,0.1)',
    },
    taskIcon: {
        marginRight: 4,
        flexShrink: 0,
    },
    tastText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    systemTray: {
        display: 'flex',
        alignItems: 'center',
        height: 22,
        marginLeft: 4,
        backgroundColor: '#D6E5F5',
        background: 'linear-gradient(to bottom, #E8F0FF 0%, #D6E5F5 50%, #C8D8E8 100%)',
        border: '1px solid #8A8A8A',
        borderTopColor: '#FFFFFF',
        borderLeftColor: '#FFFFFF',
        borderRadius: '2px',
        padding: '2px',
    },
    trayIcons: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 4px',
        borderRight: '1px solid #8A8A8A',
        marginRight: 4,
    },
    clockContainer: {
        padding: '0 6px',
        minWidth: 50,
        textAlign: 'center',
    },


};

export default Toolbar;
