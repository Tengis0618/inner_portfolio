import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import software from '../../assets/pictures/projects/software.gif';
import art from '../../assets/pictures/projects/art.gif';
import music from '../../assets/pictures/projects/music.gif';
import coin from '../../assets/pictures/projects/coin.gif';
import achievement from '../../assets/pictures/projects/pixel-art-achievement.gif';
import project from '../../assets/pictures/projects/pixel-art-project.gif';
import interest from '../../assets/pictures/projects/pixel-art-interest.gif';
import "xp.css/dist/XP.css";
import PathNavBar from './PathNavBar';

export interface ProjectsProps {}

interface ProjectContentProps {
    icon: string;
    title: string;
    subtitle: string;
    route: string;
    iconStyle: React.CSSProperties;
}

const ProjectContent: React.FC<ProjectContentProps> = ({
    icon,
    title,
    subtitle,
    route,
    iconStyle,
}) => {
    const navigation = useNavigate();

    const handleClick = () => {
        navigation(`/projects/${route}`);
    };

    return (
        <div style={styles.tabContent}>
            <div style={styles.projectDisplay}>
                <img
                    src={icon}
                    style={Object.assign(
                        {},
                        styles.projectIcon,
                        iconStyle
                    )}
                    alt={title}
                />
                <div style={styles.projectInfo}>
                    <h2 style={styles.projectTitle}>{title}</h2>
                    <h4 style={styles.projectSubtitle}>{subtitle}</h4>
                    <button 
                        onClick={handleClick}
                        style={styles.viewButton}
                    >
                        View {title} 
                    </button>
                </div>
            </div>
            <p style={styles.description}>
                Click the button to explore my software projects, achievements and other interests.
            </p>
        </div>
    );
};

const Projects: React.FC<ProjectsProps> = (props) => {
    const [activeTab, setActiveTab] = useState<'software' | 'achievements' | 'art'>('software');

    const handleTabClick = (tab: 'software' | 'achievements' | 'art') => {
        setActiveTab(tab);
    };

    return (
        <div style={styles.projectsContainer}>
            
                {/* Path Nav Bar - Fixed at top */}
                <div style={styles.navBarContainer}>
                    <PathNavBar currentDirectory='Projects' />
                </div>

            <div style={styles.contentContainer}>
                
                <h1 style={styles.titleText}>Projects and Interests</h1>
                <br />
                <p style={styles.descText}>
                    Please check out some of my personal projects I have done in the software engineering field and my general interests. 
                </p>
                <br />
                
                <section className="tabs" style={styles.tabsContainer}>
                    <menu role="tablist" aria-label="Project Categories">
                        <button 
                            role="tab" 
                            aria-selected={activeTab === 'software'}
                            aria-controls="tab-software"
                            onClick={() => handleTabClick('software')}
                        >
                            Software
                        </button>
                        <button 
                            role="tab" 
                            aria-selected={activeTab === 'achievements'}
                            aria-controls="tab-achievements"
                            onClick={() => handleTabClick('achievements')}
                        >
                            Achievements
                        </button>
                        <button 
                            role="tab" 
                            aria-selected={activeTab === 'art'}
                            aria-controls="tab-art"
                            onClick={() => handleTabClick('art')}
                        >
                            Interests
                        </button>
                    </menu>

                    <article 
                        role="tabpanel" 
                        id="tab-software"
                        hidden={activeTab !== 'software'}
                    >
                        <ProjectContent
                            icon={project}
                            iconStyle={styles.projectsIcon}
                            title="Software Projects"
                            subtitle=""
                            route="software"
                        />
                    </article>

                    <article 
                        role="tabpanel" 
                        id="tab-achievements"
                        hidden={activeTab !== 'achievements'}
                    >
                        <ProjectContent
                            icon={achievement}
                            iconStyle={styles.achievementsIcon}
                            title="Achievements"
                            subtitle=""
                            route="achievements"
                        />
                    </article>

                    <article 
                        role="tabpanel" 
                        id="tab-art"
                        hidden={activeTab !== 'art'}
                    >
                        <ProjectContent
                            icon={interest}
                            iconStyle={styles.interestIcon}
                            title="Interests"
                            subtitle=""
                            route="art"
                        />
                    </article>
                </section>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    tabsContainer: {
        width: '100%',
        maxWidth: '800px',
    },
    projectsContainer: {
        width: '100%',
        backgroundColor: '#FFFFFF',
        fontFamily: 'MS Sans Serif, Tahoma, Arial, sans-serif',
        fontSize: '11px',
        marginLeft: '200px',
        paddingLeft: '16px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    // removed height: '100vh' and overflow: 'hidden' ✅
    },
    contentContainer: {
        marginLeft: '100px',
        display: 'flex',
        flexDirection: 'column',
    },
    descText: {
        fontSize: '1.5em',
        color: '#000000',
        margin: '0 0 16px 0',
        textAlign: 'justify',
        fontFamily: 'Dosvgabold',
        lineHeight: '1.5',
        wordWrap: 'break-word',
    },
    titleText: {
        fontSize: '3em',
        fontWeight: 'bold',
        marginTop: '2em',
        color: '#000080',
        fontFamily: 'Dosvgabold',
        flex: 1,
    },
    tabContent: {
        padding: '20px',
    },
    projectDisplay: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '20px',
    },
    projectIcon: {
        marginRight: '30px',
    },
    projectInfo: {
        display: 'flex',
        flexDirection: 'column',
    },
    projectTitle: {
        fontSize: '32px',
        margin: '0 0 8px 0',
    },
    projectSubtitle: {
        fontSize: '16px',
        margin: '0 0 16px 0',
        color: '#666',
    },
    viewButton: {
        width: 'fit-content',
        padding: '8px 16px',
        cursor: 'pointer',
    },
    description: {
        marginLeft: '1em',
        marginTop: '16px',
        lineHeight: '1.6',
    },
    projectsIcon: {
        width: 120,
        height: 120,
    },
    achievementsIcon: {
        width: 120,
        height: 120,
    },
    interestIcon: {
        width: 120,
        height: 120,
    },
    navBarContainer: {
    flexShrink: 0,
    width: '100%',
  },
};

export default Projects;