import React, { useEffect, useState } from 'react';
import { Link } from '../general';
import forHire from '../../assets/pictures/forHireGif.gif';
import { useLocation, useNavigate } from 'react-router-dom';

export interface VerticalNavbarProps {}

const VerticalNavbar: React.FC<VerticalNavbarProps> = (props) => {
    const location = useLocation();
    const [projectsExpanded, setProjectsExpanded] = useState(false);
    const [isHome, setIsHome] = useState(false);

    const navigate = useNavigate();
    const goToContact = () => {
        navigate('/contact');
    };

    useEffect(() => {
        if (location.pathname.includes('/projects')) {
            setProjectsExpanded(true);
        } else {
            setProjectsExpanded(false);
        }
        if (location.pathname === '/') {
            setIsHome(true);
        } else {
            setIsHome(false);
        }
        return () => {};
    }, [location.pathname]);

    return !isHome ? (
        <div style={styles.navbar}>
            {/* Profile/Header Section */}
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
                        Navigate through my portfolio sections
                    </div>
                </div>
            </div>

            {/* Main Navigation Section */}
            <div style={styles.navigationSection}>
                <div style={styles.sectionHeader}>
                    <h3 style={styles.sectionTitle}>Main Sections</h3>
                </div>
                <div style={styles.navigationList}>
                    <div style={styles.navItem}>
                        <span style={styles.navIcon}>🏠</span>
                        <Link
                            containerStyle={styles.navLink}
                            to=""
                            text="Home"
                        />
                    </div>
                    <div style={styles.navItem}>
                        <span style={styles.navIcon}>👨‍💻</span>
                        <Link
                            containerStyle={styles.navLink}
                            to="about"
                            text="About"
                        />
                    </div>
                    <div style={styles.navItem}>
                        <span style={styles.navIcon}>💼</span>
                        <Link
                            containerStyle={styles.navLink}
                            to="experience"
                            text="Experience"
                        />
                    </div>
                    <div style={styles.navItem}>
                        <span style={styles.navIcon}>📁</span>
                        <Link
                            containerStyle={Object.assign(
                                {},
                                styles.navLink,
                                projectsExpanded && styles.expandedNavLink
                            )}
                            to="projects"
                            text="Projects"
                        />
                    </div>
                    
                    {/* Expanded Projects Submenu */}
                    {projectsExpanded && (
                        <div style={styles.subNavigationSection}>
                            <div style={styles.subNavigationList}>
                                <div style={styles.subNavItem}>
                                    <span style={styles.subNavIcon}>💻</span>
                                    <Link
                                        containerStyle={styles.subNavLink}
                                        to="projects/software"
                                        text="Software"
                                    />
                                </div>
                                <div style={styles.subNavItem}>
                                    <span style={styles.subNavIcon}>🎵</span>
                                    <Link
                                        containerStyle={styles.subNavLink}
                                        to="projects/achievements"
                                        text="Achievements"
                                    />
                                </div>
                                <div style={styles.subNavItem}>
                                    <span style={styles.subNavIcon}>🎨</span>
                                    <Link
                                        containerStyle={styles.subNavLink}
                                        to="projects/art"
                                        text="Interests"
                                    />
                                </div>
                            </div>
                        </div>
                    )}
                    
                    <div style={styles.navItem}>
                        <span style={styles.navIcon}>📧</span>
                        <Link
                            containerStyle={styles.navLink}
                            to="contact"
                            text="Contact"
                        />
                    </div>
                </div>
            </div>

            {/* Quick Links Section */}
            <div style={styles.otherSection}>
                <div style={styles.sectionHeader}>
                    <h3 style={styles.sectionTitle}>Quick Links</h3>
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

            {/* For Hire Section */}
            {/* <div style={styles.forHireSection} onMouseDown={goToContact}>
                <img src={forHire} style={styles.forHireImage} alt="For Hire" />
            </div> */}
        </div>
    ) : (
        <></>
    );
};

const styles: StyleSheetCSS = {
    navbar: {
        width: '220px',
        height: '100%',
        backgroundColor: '#E8F4FD',
        borderRight: '1px solid #C0C0C0',
        display: 'flex',
        flexDirection: 'column',
        padding: 0,
        fontFamily: 'Tahoma, sans-serif',
        fontSize: '8px',
        position: 'fixed',
        left: 0,
        top: 0,
        overflow: 'auto',
    },

    // Profile Section (Header)
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
        height: 'calc(100% - 25px)',
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

    // Main Navigation Section
    navigationSection: {
        margin: '0 8px 12px 8px',
        backgroundColor: '#F0F8FF',
        border: '1px solid #C0C0C0',
        borderRadius: '4px',
        flex: 1,
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
        display: 'flex',
        flexDirection: 'column',
    },

    navItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '4px 6px',
        cursor: 'pointer',
        borderRadius: '2px',
        margin: '1px 0',
        transition: 'background-color 0.1s ease',
    },

    navIcon: {
        marginRight: '6px',
        fontSize: '12px',
        flexShrink: 0,
        width: '16px',
        textAlign: 'center',
    },

    navLink: {
        fontSize: '11px',
        color: '#0000FF',
        textDecoration: 'underline',
        flex: 1,
        fontFamily: 'Tahoma, sans-serif',
    },

    expandedNavLink: {
        fontWeight: 'bold',
    },

    // Sub Navigation (Projects submenu)
    subNavigationSection: {
        margin: '4px 0 4px 5px',
        backgroundColor: '#F8FCFF',
        border: '1px solid #D0D0D0',
        borderRadius: '3px',
        fontSize: '10px',
    },

    subNavigationList: {
        padding: '2px',
        display: 'flex',
        flexDirection: 'column',
    },

    subNavItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '2px 4px',
        cursor: 'pointer',
        borderRadius: '2px',
        margin: '1px 0',
        transition: 'background-color 0.1s ease',
    },

    subNavIcon: {
        marginRight: '4px',
        fontSize: '10px',
        flexShrink: 0,
        width: '14px',
        textAlign: 'center',
    },

    subNavLink: {
        fontSize: '10px',
        color: '#0000CC',
        textDecoration: 'underline',
        flex: 1,
    },

    // Quick Links Section
    otherSection: {
        margin: '0 8px 12px 8px',
        backgroundColor: '#F0F8FF',
        border: '1px solid #C0C0C0',
        borderRadius: '4px',
    },

    otherList: {
        padding: '4px',
        display: 'flex',
        flexDirection: 'column',
    },

    otherItem: {
        display: 'flex',
        alignItems: 'center',
        padding: '2px 4px',
        cursor: 'pointer',
        borderRadius: '2px',
        margin: '1px 0',
        transition: 'background-color 0.1s ease',
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

    // For Hire Section (if needed)
    forHireSection: {
        margin: '8px',
        padding: '8px',
        textAlign: 'center',
        cursor: 'pointer',
        backgroundColor: '#F0F8FF',
        border: '1px solid #C0C0C0',
        borderRadius: '4px',
    },

    forHireImage: {
        width: '100%',
        maxWidth: '120px',
        height: 'auto',
    },
};

// Add hover effects
const hoverStyles = `
    .nav-item:hover,
    .sub-nav-item:hover,
    .other-item:hover {
        background-color: #D6E5F5 !important;
    }
    
    .for-hire-section:hover {
        background-color: #E8F4FD !important;
    }
`;

// Inject hover styles
if (typeof document !== 'undefined') {
    const styleElement = document.createElement('style');
    styleElement.innerHTML = hoverStyles;
    document.head.appendChild(styleElement);
}

export default VerticalNavbar;