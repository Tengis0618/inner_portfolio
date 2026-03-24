import React, { useState, useCallback } from 'react';
import windowsXPLogo from '../../assets/icons/windowsStartIcon.png';
import userIcon from '../../assets/pictures/portrait.jpg';
import ShutdownSequence from './ShutdownSequence';

export interface WindowsXPLoginProps {
    onLogin: () => void;
}

interface User {
    id: string;
    name: string;
    icon: string;
    messages: number;
}

const WindowsXPLogin: React.FC<WindowsXPLoginProps> = ({ onLogin }) => {
    const [selectedUser, setSelectedUser] = useState<string | null>(null);
    const [hoveredUser, setHoveredUser] = useState<string | null>(null);
    const [shutdown, setShutdown] = useState<boolean>(false);
    const [numShutdowns, setNumShutdowns] = useState<number>(1);

    const user: User = {
        id: 'user1',
        name: 'Tengis Temuulen',
        icon: userIcon,
        messages: 11
    };

    const handleUserClick = (userId: string): void => {
        setSelectedUser(userId);
        setTimeout(() => {
            onLogin();
        }, 300);
    };

    const handleShutdown = useCallback((): void => {
        setTimeout(() => {
            setShutdown(true);
            setNumShutdowns((prev) => prev + 1);
        }, 600);
    }, []);

    const handleUserMouseEnter = (userId: string): void => {
        setHoveredUser(userId);
    };

    const handleUserMouseLeave = (): void => {
        setHoveredUser(null);
    };

    const getUserCardStyle = (userId: string): React.CSSProperties => {
        const baseStyle = styles.userCard;
        const isHovered = hoveredUser === userId;
        const isSelected = selectedUser === userId;

        return {
            ...baseStyle,
            backgroundColor: isHovered || isSelected ? '#3C81F3' : 'transparent',
            border: isSelected ? '2px solid #0C38A5' : '2px solid transparent',
        };
    };

    if (shutdown) {
        return (
            <ShutdownSequence
                setShutdown={setShutdown}
                numShutdowns={numShutdowns}
            />
        );
    }

    return (
        <div style={styles.container}>
            {/* Top bar */}
            <div style={styles.topBar}></div>

            {/* Main content */}
            <div style={styles.content}>
                {/* Left side - Windows XP Logo and instruction */}
                <div style={styles.leftSection}>
                    {/* Logo + Windows XP label grouped together, shifted right */}
                    <div style={styles.logoGroup}>
                        <img
                            src={windowsXPLogo}
                            alt="Windows XP"
                            style={styles.logo}
                        />
                        <div style={styles.windowsXPLabel}>
                            <span style={styles.windowsText}>Windows</span>
                            <span style={styles.xpText}>XP</span>
                        </div>
                    </div>
                    <p style={styles.instruction}>To begin, click your user name</p>
                </div>

                {/* Right side - User selection */}
                <div style={styles.userContainer}>
                    <div
                        style={getUserCardStyle(user.id)}
                        onClick={() => handleUserClick(user.id)}
                        onMouseEnter={() => handleUserMouseEnter(user.id)}
                        onMouseLeave={handleUserMouseLeave}
                    >
                        <div style={styles.userIconContainer}>
                            <img
                                src={user.icon}
                                alt="User"
                                style={styles.userIcon}
                            />
                        </div>
                        <div style={styles.userInfo}>
                            <p style={styles.userName}>{user.name}</p>
                            <p style={styles.userMessage}>{user.messages} unread mail messages</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom bar */}
            <div style={styles.bottomBar}>
                <div style={styles.bottomLeft}>
                    <ShutdownButton onClick={handleShutdown} />
                </div>
                <div style={styles.bottomRight}>
                    <BottomInfo />
                </div>
            </div>
        </div>
    );
};

interface ShutdownButtonProps {
    onClick: () => void;
}

const ShutdownButton: React.FC<ShutdownButtonProps> = ({ onClick }) => {
    const [isHovered, setIsHovered] = useState<boolean>(false);

    return (
        <div
            style={styles.shutdownContainer}
            onClick={onClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{
                ...styles.shutdownIcon,
                backgroundColor: isHovered ? '#f2453fff' : '#f60909ff',
            }}>
                ⏻
            </div>
            <span style={styles.shutdownText}>Turn off computer</span>
        </div>
    );
};

const BottomInfo: React.FC = () => {
    return (
        <div style={styles.bottomInfo}>
            <p style={styles.infoText}>
                After you log on, you can add or change accounts.
            </p>
            <p style={styles.infoText}>
                Just go to Control Panel and click User Accounts.
            </p>
        </div>
    );
};

interface StyleSheetCSS {
    [key: string]: React.CSSProperties;
}

const styles: StyleSheetCSS = {
    container: {
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to bottom, #5A7FBF 0%, #7A9FDF 50%, #5A7FBF 100%)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        fontFamily: 'Tahoma, Arial, sans-serif',
        overflow: 'hidden',
    },

    topBar: {
        height: '48px',
        background: 'linear-gradient(to bottom, #0C38A5 0%, #1450CC 100%)',
        borderBottom: '2px solid #003399',
    },

    content: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '80px',
        padding: '0 100px',
    },

    leftSection: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '16px',
    },

    /* New: wrapper that shifts the logo+label block to the right */
    logoGroup: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        marginRight: '-24px', // shifts the group rightward relative to the left section
    },

    logo: {
        width: '140px',
        height: 'auto',
        marginBottom: '4px',
    },

    /* "Windows XP" label beneath the logo */
    windowsXPLabel: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: '5px',
        marginTop: '2px',
    },

    windowsText: {
        color: '#FFFFFF',
        fontSize: '18px',
        fontWeight: 'normal',
        fontStyle: 'italic',
        letterSpacing: '0.5px',
        textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
        fontFamily: 'Tahoma, Arial, sans-serif',
    },

    xpText: {
        color: '#FF8C00',
        fontSize: '22px',
        fontWeight: 'bold',
        fontStyle: 'italic',
        letterSpacing: '1px',
        textShadow: '1px 1px 3px rgba(0,0,0,0.4)',
        fontFamily: 'Tahoma, Arial, sans-serif',
    },

    instruction: {
        color: '#FFFFFF',
        fontSize: '13px',
        margin: 0,
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
        maxWidth: '280px',
    },

    userContainer: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
    },

    userCard: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        minWidth: '280px',
    },

    userIconContainer: {
        width: '48px',
        height: '48px',
        borderRadius: '4px',
        overflow: 'hidden',
        border: '2px solid #FFFFFF',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        flexShrink: 0,
    },

    userIcon: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    },

    userInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        flex: 1,
    },

    userName: {
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: 'bold',
        margin: 0,
        textShadow: '1px 1px 2px rgba(0,0,0,0.5)',
    },

    userMessage: {
        color: '#E6F2FF',
        fontSize: '11px',
        margin: 0,
        textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
    },

    bottomBar: {
        height: '64px',
        background: 'linear-gradient(to bottom, #0C38A5 0%, #1450CC 100%)',
        borderTop: '2px solid #003399',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        justifyContent: 'space-between',
    },

    bottomLeft: {
        display: 'flex',
        alignItems: 'center',
    },

    bottomRight: {
        display: 'flex',
        alignItems: 'center',
    },

    shutdownContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        padding: '4px 8px',
        borderRadius: '4px',
        transition: 'background-color 0.2s ease',
    },

    shutdownIcon: {
        width: '32px',
        height: '32px',
        borderRadius: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '18px',
        color: '#FFFFFF',
        border: '2px solid #f9f6f4ff',
        transition: 'background-color 0.2s ease',
        boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    },

    shutdownText: {
        color: '#FFFFFF',
        fontSize: '12px',
        fontWeight: 'normal',
        textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
    },

    bottomInfo: {
        display: 'flex',
        flexDirection: 'column',
        gap: '2px',
        textAlign: 'right',
    },

    infoText: {
        color: '#E6F2FF',
        fontSize: '10px',
        margin: 0,
    },
};

export default WindowsXPLogin;