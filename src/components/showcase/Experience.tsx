import React, { useState } from 'react';
import PathNavBar from './PathNavBar';

export interface ExperienceProps {}

interface ExperienceData {
  id: string;
  company: string;
  position: string;
  duration: string;
  location: string;
  website?: string;
  description: string;
  achievements: string[];
}

const Experience: React.FC<ExperienceProps> = () => {
  const [expandedPanels, setExpandedPanels] = useState<Set<string>>(new Set());

  const experienceData: ExperienceData[] = [
    {
      id: 'golomt-bank',
      company: 'Golomt Bank',
      position: 'Full Stack Software Engineer',
      duration: 'Aug. 2025 – Now',
      location: 'Ulaanbaatar, Mongolia',
      description: 'Developed full-stack web applications and collaborated with the tech team to optimize internal workflows.',
      achievements: [
        'Contributed to integrating Google Pay, Apple Pay, and Samsung Pay wallet payment and card provisioning capabilities, enabling secure digital payment experiences across multiple platforms',

        'Maintained and improved a mobile fintech application serving 50,000+ daily active users, focusing on reliability, performance optimization, and seamless user experience',

        'Developed backend services and deployment workflows using Kubernetes-based infrastructure, implementing CI/CD pipelines and monitoring solutions with ArgoCD and Grafana'
      ]
    },
    {
      id: 'spade-labs',
      company: 'Spade Labs',
      position: 'Full Stack Engineer Intern',
      duration: 'Jul. 2024 – Sept. 2024',
      location: 'Brooklyn, NY',
      description: 'Worked as a Full Stack Engineer Intern developing AI-powered applications and scalable backend systems.',
      achievements: [
        'Trained and optimized large language models (LLMs), enhancing performance and accuracy on sentiment analysis',
        'Set up and managed a backend with Django REST framework, including integration with AWS PostgreSQL RDS for scalable database management',
        'Utilized Celery to implement and manage asynchronous tasks for web scrapers, ensuring efficient and reliable data retrieval processes'
      ]
    },
    {
      id: 'mofa',
      company: 'MOFA Government Agency',
      position: 'IT Intern',
      duration: 'Jun. 2023 – Aug. 2023',
      location: 'Ulaanbaatar, Mongolia',
      description: 'Provided IT support and web development services for a government agency serving a large user base.',
      achievements: [
        'Contributed to maintaining a web application that scaled to a large base of users, regularly updating and reviewing the internal website contents',
        'Provided technical support to over 20 staff members, resolving hardware and software issues and improving response time',
        'Configured and monitored network devices, supporting secure data transmission and enhancing system reliability'
      ]
    },
    {
      id: 'violet-ventures',
      company: 'Violet Ventures',
      position: 'Web Developer',
      duration: 'Feb. 2023 – Apr. 2023',
      location: 'Abu Dhabi, UAE',
      description: 'Developed full-stack web applications and collaborated with the tech team to optimize internal workflows.',
      achievements: [
        'Built and optimized a full-stack web application in collaboration with the Violet Ventures tech team, streamlining internal workflows and enhancing user experience',
        'Implemented responsive UI components using React and integrated backend APIs to support real-time data interactions',
        'Wrote technical documentation and onboarding guides for future developers, increasing team efficiency and reducing ramp-up time'
      ]
    }
  ];

  const togglePanel = (panelId: string) => {
    const newExpandedPanels = new Set(expandedPanels);
    if (newExpandedPanels.has(panelId)) {
      newExpandedPanels.delete(panelId);
    } else {
      newExpandedPanels.add(panelId);
    }
    setExpandedPanels(newExpandedPanels);
  };

  const isPanelExpanded = (panelId: string) => expandedPanels.has(panelId);

  return (
    <div style={styles.experienceContainer}>
      {/* Path Nav Bar */}
      <div style={styles.navBarContainer}>
        <PathNavBar currentDirectory='Experience' />
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollableContent}>
        {experienceData.map((experience) => (
          <div key={experience.id} style={styles.accordionContainer}>
            {/* Accordion Header - Always visible */}
            <div 
              style={styles.accordionHeader}
              onClick={() => togglePanel(experience.id)}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#D4D0C8';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#C0C0C0';
              }}
            >
              <div style={styles.leftSection}>
                <span style={styles.icon}>💼</span>
                <span style={styles.accordionTitle}>
                  {experience.company} - {experience.position}
                </span>
              </div>
              
              <div style={styles.rightSection}>
                <span style={styles.durationText}>{experience.duration}</span>
                <span style={styles.separator}>•</span>
                <span style={styles.locationText}>{experience.location}</span>
                <span style={styles.expandIcon}>
                  {isPanelExpanded(experience.id) ? '▼' : '▶'}
                </span>
              </div>
            </div>

            {/* Accordion Content - Only shows when expanded */}
            {isPanelExpanded(experience.id) && (
              <div style={styles.accordionContent}>
                <div style={styles.achievementsList}>
                  {experience.achievements.map((achievement, index) => (
                    <React.Fragment key={index}>
                      <span style={styles.achievementText}>
                        • {achievement}
                      </span>
                      {index < experience.achievements.length - 1 && (
                        <>
                          <br />
                          <br />
                        </>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Placeholder spacing */}
        <div style={styles.placeholderSpace}></div>
      </div>
    </div>
  );
};

const styles: StyleSheetCSS = {
  experienceContainer: {
    width: '100%',
    height: '100vh',
    backgroundColor: '#FFFFFF',
    fontFamily: 'MS Sans Serif, Tahoma, Arial, sans-serif',
    fontSize: '11px',
    marginLeft: '200px',
    paddingLeft: '16px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
  },

  navBarContainer: {
    flexShrink: 0,
    width: '100%',
  },

  scrollableContent: {
    padding: '16px',
    paddingTop: '8px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    overflowY: 'scroll',
    flex: 1,
    minHeight: 0,
  },

  accordionContainer: {
    border: '2px outset #FFFFFF',
    borderTop: '2px solid #DFDFDF',
    borderLeft: '2px solid #DFDFDF',
    borderRight: '2px solid #808080',
    borderBottom: '2px solid #808080',
    backgroundColor: '#C0C0C0',
    //overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column'
  },

  accordionHeader: {
    backgroundColor: '#C0C0C0',
    padding: '6px 12px',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    userSelect: 'none',
    transition: 'background-color 0.1s ease',
    color: '#000000',
    fontFamily: 'Dosvgabold',
    fontSize: '11px',
    width: '100%',
    boxSizing: 'border-box',
  },

  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
    minWidth: 0,
  },

  rightSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
    marginLeft: '16px',
  },

  icon: {
    fontSize: '16px',
    flexShrink: 0,
  },

  accordionTitle: {
    fontSize: '14px',
    fontWeight: 'bold',
    fontFamily: 'Dosvgabold',
  },

  durationText: {
    fontSize: '14px',
    fontWeight: 'bold',
    fontFamily: 'Dosvgabold',
    whiteSpace: 'nowrap',
  },

  separator: {
    fontSize: '11px',
    color: '#000000',
  },

  locationText: {
    fontSize: '14px',
    fontStyle: 'italic',
    fontFamily: 'Dosvgabold',
    whiteSpace: 'nowrap',
  },

  expandIcon: {
    fontSize: '10px',
    fontWeight: 'bold',
    marginLeft: '8px',
    flexShrink: 0,
  },

  accordionContent: {
    padding: '12px 16px',
    backgroundColor: '#FFFFFF',
    borderTop: '2px solid #808080',
    fontFamily: 'Dosvgabold',
    fontSize: '11px',
    lineHeight: '1',
    width: '100%',
    boxSizing: 'border-box',
  },

  achievementsList: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '11px',
    fontFamily: 'Dosvgabold',
    lineHeight: '1',
  },

  achievementText: {
    fontSize: '14px',
    color: '#000000',
    fontFamily: 'Dosvgabold',
  },

  placeholderSpace: {
    width: '100%',
    height: '150px',
    backgroundColor: '#FFFFFF',
    flexShrink: 0,
  },
};

interface StyleSheetCSS {
  [key: string]: React.CSSProperties;
}

export default Experience;