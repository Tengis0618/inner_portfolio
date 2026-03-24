import React from 'react';
import { Link } from '../general';
import { useNavigate } from 'react-router-dom';
import folderIcon from '../../assets/icons/windows-xp-folder/Open Folder.ico';

export interface HomeProps {}

const Home: React.FC<HomeProps> = (props) => {
    const navigate = useNavigate();

    const goToContact = () => {
        navigate('contact');
    };

    // Folder data for the main content area
    const folders = [
        { name: 'About', path: 'about' },
        { name: 'Experience', path: 'experience' },
        { name: 'Projects', path: 'projects' },
        { name: 'Contact', path: 'contact' },
    ];

    return (
        <div style={styles.explorerContainer}>
            {/* Left Sidebar */}
            <div style={styles.sidebar}>
                {/* Profile Section */}
                <div style={styles.profileSection}>
                    <div style={styles.profileHeader}>
                        <h3 style={styles.profileTitle}>Portfolio Tasks</h3>
                    </div>
                    <div style={styles.profileContent}>
                        <div style={styles.profileItem}>
                            <div style={styles.profileIcon}>👤</div>
                            <div style={styles.profileText}>
                                <div style={styles.profileName}>Tengis <br/> Temuulen</div>
                            </div>
                        </div>
                        <div style={styles.profileJob}>Software Engineer</div>
                        <div style={styles.profileDescription}>
                            Explore my professional journey, skills, and projects through the folders.
                        </div>
                    </div>
                </div>

                {/* Navigation Section */}
                <div style={styles.navigationSection}>
                    <div style={styles.sectionHeader}>
                        <h3 style={styles.sectionTitle}>Quick Navigation</h3>
                    </div>
                    <div style={styles.navigationList}>
                        <div style={styles.navItem}>
                            <span style={styles.navIcon}>📁</span>
                            <a href='about' style={styles.navLink}>View Portfolio</a>
                        </div>
                        <div style={styles.navItem}>
                            <span style={styles.navIcon}>📧</span>
                            <a href='mailto:tt2273@nyu.edu' style={styles.navLink}>Get in Touch</a>
                        </div>
                    </div>
                </div>

                {/* Other Places Section */}
                <div style={styles.otherSection}>
                    <div style={styles.sectionHeader}>
                        <h3 style={styles.sectionTitle}>Other Links</h3>
                    </div>
                    <div style={styles.otherList}>
                        <div style={styles.otherItem}>
                            <span style={styles.otherIcon}>💻</span>
                            <a href='https://github.com/Tengis0618' style={styles.otherText}>Github</a>
                        </div>
                        <div style={styles.otherItem}>
                            <span style={styles.otherIcon}>💼</span>
                            <a href='https://www.linkedin.com/in/tengis-temuulen-32201426a/' style={styles.otherText}>LinkedIn</a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div style={styles.mainContent}>
                <div style={styles.folderGrid}>
                    {folders.map((folder, index) => (
                        <div key={folder.name} style={styles.folderItem}>
                            <img 
                                src={folderIcon} 
                                alt="Folder"
                                style={styles.folderIconImg}
                            />
                            <Link
                                text={folder.name}
                                to={folder.path}
                                containerStyle={styles.folderLink}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    explorerContainer: {
        display: 'flex',
        width: '100%',
        height: '100%',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '11px',
    },

    // Left Sidebar Styles
    sidebar: {
        width: '200px',
        backgroundColor: '#E8F4FD',
        borderRight: '1px solid #C0C0C0',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
    },

    profileSection: {
        backgroundColor: '#4A90E2',
        background: 'linear-gradient(to bottom, #5BA0F2 0%, #4A90E2 50%, #3A80D2 100%)',
        margin: '6px',
        marginBottom: '8px',
        borderRadius: '6px',
        overflow: 'hidden',
        border: '1px solid #2E6BB8',
        minHeight: '120px',
    },

    profileHeader: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        padding: '4px 6px',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
    },

    profileTitle: {
        color: '#FFFFFF',
        fontSize: '10px',
        fontWeight: 'bold',
        margin: 0,
        textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
    },

    profileContent: {
        padding: '6px',
        color: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100% - 25px)', // Account for header height
        justifyContent: 'space-between',
    },

    profileItem: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '4px',
        gap: '4px',
    },

    profileIcon: {
        fontSize: '16px',
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: '3px',
        padding: '2px',
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },

    profileText: {
        flex: 1,
        minWidth: 0,
        overflow: 'hidden',
    },

    profileName: {
        fontWeight: 'bold',
        fontSize: '16px',
        marginBottom: '1px',
        textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
        lineHeight: '1.1',
        wordBreak: 'break-word',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },

    profileJob: {
        fontWeight: 'bold',
        fontSize: '12px',
        opacity: 0.9,
        textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
        lineHeight: '1.1',
        wordBreak: 'break-word',
    },

    profileDescription: {
        fontSize: '8px',
        lineHeight: '1.2',
        opacity: 0.9,
        textShadow: '1px 1px 1px rgba(0,0,0,0.3)',
        wordBreak: 'break-word',
        marginTop: '2px',
    },

    navigationSection: {
        margin: '0 8px 12px 8px',
        backgroundColor: '#F0F8FF',
        border: '1px solid #C0C0C0',
        borderRadius: '4px',
    },

    sectionHeader: {
        backgroundColor: '#E8F4FD',
        borderBottom: '1px solid #C0C0C0',
        padding: '4px 8px',
    },

    sectionTitle: {
        fontSize: '11px',
        fontWeight: 'bold',
        margin: 0,
        color: '#000080',
    },

    navigationList: {
        padding: '4px',
        display: "flex",
        flexDirection: 'row',
        flexWrap: 'wrap',
    },

    navItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '2px 4px',
        cursor: 'pointer',
        borderRadius: '2px',
        margin: '1px 0',
    },

    navIcon: {
        marginRight: '4px',
        fontSize: '10px',
        flexShrink: 0,
    },

    navLink: {
        fontSize: '10px',
        color: '#0000FF',
        textDecoration: 'underline',
    },

    otherSection: {
        margin: '0 8px 12px 8px',
        backgroundColor: '#F0F8FF',
        border: '1px solid #C0C0C0',
        borderRadius: '4px',
    },

    otherList: {
        padding: '4px',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap-reverse',
    },

    otherItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '2px 4px',
        cursor: 'pointer',
        borderRadius: '2px',
        margin: '1px 0',
    },

    otherIcon: {
        marginRight: '4px',
        fontSize: '10px',
        flexShrink: 0,
    },

    otherText: {
        fontSize: '10px',
        color: '#0000FF',
        textDecoration: 'underline',
        wordWrap: 'break-word',
        minWidth: 0,
    },

    // Main Content Area
    mainContent: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: '16px',
        overflow: 'auto',
    },

    folderGrid: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '100px',
        alignItems: 'flex-start',
    },

    folderItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'relative',
        width: '80px',
        cursor: 'pointer',
        padding: '4px',
        borderRadius: '4px',
        transition: 'background-color 0.1s ease',
    },

    folderIconImg: {
        width: '48px',
        height: '48px',
        marginBottom: '2px',
        filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.2))',
    },

    folderLink: {
        fontSize: '11px',
        fontFamily: 'Tahoma, sans-serif',
        color: '#000000',
        textAlign: 'center',
        textDecoration: 'none',
        wordWrap: 'break-word',
        lineHeight: '1.2',
        width: '100%',
        padding: '2px',
    },
};

// Add hover effects
const hoverStyles = `
    .folder-item:hover {
        background-color: #E8F4FD !important;
        border: 1px dotted #4A90E2 !important;
    }
    
    .nav-item:hover,
    .other-item:hover {
        background-color: #D6E5F5 !important;
    }
`;

// Inject hover styles
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = hoverStyles;
    document.head.appendChild(styleElement);
}

export default Home;