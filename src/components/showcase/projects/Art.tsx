import React from 'react';
import ResumeDownload from '../ResumeDownload';
import PathNavBar from '../PathNavBar';

import girlRun from '../../../assets/pictures/projects/art/girl-run.gif';
import gsts from '../../../assets/pictures/projects/art/gsts.png';
import volleyballImage from '../../../assets/pictures/hobbies/volleyball.jpg'; // Add your volleyball image
import guitarImage from '../../../assets/pictures/hobbies/guitar.jpg'; // Add your guitar image

export interface ArtProjectsProps {}

const ArtProjects: React.FC<ArtProjectsProps> = (props) => {
    return (
        <div style={styles.artContainer}>
            {/* Path Nav bar*/}
            <PathNavBar currentDirectory='Hobbies'/>

            {/* Main Content */}
            <div style={styles.mainContent}>
                {/* Title and Description */}
                <div style={styles.headerSection}>
                    <h1 style={styles.title}>Hobbies & Interests</h1>
                    <p style={styles.subtitle}>Beyond the Screen</p>
                </div>

                {/* Blog Content */}
                <div style={styles.blogContent}>
                    {/* Introduction */}
                    <div style={styles.textBlock}>
                        <p style={styles.paragraph}>
                            While I spend much of my time coding and working with technology, 
                            I believe in maintaining a balanced life through various hobbies and interests. 
                            These activities help me stay physically active, creative, and mentally refreshed.
                        </p>
                        <p style={styles.paragraph}>
                            Here are some of the passions I've developed over the years that keep me 
                            grounded and energized outside of my professional work.
                        </p>
                    </div>

                    {/* Volleyball Section */}
                    <div style={styles.sectionBlock}>
                        <h2 style={styles.sectionTitle}>Volleyball</h2>
                        
                        <p style={styles.paragraph}>
                            My journey with volleyball began in 9th grade, and it quickly became 
                            one of my greatest passions. What started as a casual interest in PE class 
                            evolved into a serious commitment to the sport. I was drawn to the fast-paced 
                            nature of the game, the teamwork required, and the mental strategy involved 
                            in reading the opponent's plays.
                        </p>

                        {/* Volleyball Image with Caption 
                        <div style={styles.imageContainer}>
                            <img src={volleyballImage} alt="Volleyball" style={styles.image} />
                            <p style={styles.caption}>
                                <b>Figure 1:</b> Playing volleyball has been a cornerstone of my 
                                active lifestyle since high school
                            </p>
                        </div>
                        */}

                        <p style={styles.paragraph}>
                            Over the years, I've played in various positions, but I particularly enjoy 
                            playing as a setter and outside hitter. The sport has taught me valuable 
                            lessons about communication, quick decision-making, and working as part of 
                            a cohesive unit—skills that translate surprisingly well into software 
                            development and team collaboration in the workplace.
                        </p>

                        <p style={styles.paragraph}>
                            Whether it's playing in organized leagues, pickup games at the park, or 
                            beach volleyball during the summer, I try to play at least once or twice 
                            a week. The physical activity helps me clear my mind, and there's something 
                            incredibly satisfying about a perfectly executed play or a hard-fought match 
                            with friends.
                        </p>
                    </div>

                    {/* Acoustic Guitar Section */}
                    <div style={styles.sectionBlock}>
                        <h2 style={styles.sectionTitle}>Acoustic Guitar</h2>
                        
                        <p style={styles.paragraph}>
                            More recently, I've developed a passion for playing acoustic guitar. 
                            Unlike volleyball, which has been part of my life for years, guitar is 
                            a relatively new pursuit that I picked up to explore my creative side and 
                            learn a new skill outside of my technical comfort zone.
                        </p>

                        {/* Guitar Image with Caption 
                        <div style={styles.imageContainer}>
                            <img src={guitarImage} alt="Acoustic Guitar" style={styles.image} />
                            <p style={styles.caption}>
                                <b>Figure 2:</b> Learning acoustic guitar has opened up a new creative 
                                outlet in my life
                            </p>
                        </div>
                        */}

                        <p style={styles.paragraph}>
                            I'm still in the early stages of my guitar journey, working through basic 
                            chords, strumming patterns, and simple songs. What I love most about playing 
                            guitar is how meditative it can be—the focus required to coordinate both hands, 
                            the rhythm, and the melody creates a state of flow that's both challenging 
                            and deeply relaxing.
                        </p>

                        <p style={styles.paragraph}>
                            I practice for about 30 minutes to an hour most evenings, slowly building 
                            my calluses and muscle memory. My current goal is to be able to play some 
                            of my favorite songs and maybe even write my own music someday. The learning 
                            process reminds me of coding in many ways—breaking down complex problems into 
                            smaller, manageable pieces, practicing consistently, and celebrating small 
                            victories along the way.
                        </p>

                        <p style={styles.paragraph}>
                            Both volleyball and guitar represent different aspects of who I am outside 
                            of work. They keep me balanced, provide outlets for energy and creativity, 
                            and remind me that continuous learning and growth aren't limited to just 
                            professional development.
                        </p>
                    </div>
                </div>

                {/* Placeholder spacing */}
                <div style={styles.placeholderSpace}></div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    artContainer: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        fontFamily: 'MS Sans Serif, Tahoma, Arial, sans-serif',
        fontSize: '14px',
        marginLeft: '200px',
        paddingLeft: '16px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    },

    mainContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '16px',
        paddingBottom: '0',
        gap: '1.2em',
        overflowY: 'scroll',
        flex: 1,
        minHeight: 0,
    },

    headerSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        textAlign: 'center',
    },

    title: {
        fontFamily: 'Dosvgabold',
        fontSize: '32px',
        fontWeight: 'bold',
        margin: '0',
        color: '#000000',
    },

    subtitle: {
        fontFamily: 'Dosvgabold',
        fontSize: '20px',
        fontWeight: 'bold',
        margin: '0',
        color: '#333333',
    },

    resumeSection: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
    },

    blogContent: {
        width: '100%',
        maxWidth: '800px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
    },

    textBlock: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },

    sectionBlock: {
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
    },

    sectionTitle: {
        fontFamily: 'Dosvgabold',
        fontSize: '24px',
        fontWeight: 'bold',
        margin: '0',
        color: '#000000',
    },

    paragraph: {
        fontFamily: 'Dosvgabold',
        fontSize: '16px',
        lineHeight: '1.6',
        margin: '0',
        color: '#333333',
        textAlign: 'justify',
    },

    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        margin: '20px 0',
    },

    image: {
        maxWidth: '100%',
        height: 'auto',
        border: '2px solid #0054E3',
        borderRadius: '4px',
        boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
    },

    caption: {
        fontFamily: 'Dosvgabold',
        fontSize: '14px',
        fontStyle: 'italic',
        margin: '0',
        color: '#666666',
        textAlign: 'center',
    },

    linksSection: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        marginTop: '8px',
    },

    linksTitle: {
        fontFamily: 'Dosvgabold',
        fontSize: '18px',
        fontWeight: 'bold',
        margin: '0',
        color: '#000000',
    },

    linksList: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        margin: '0',
        paddingLeft: '24px',
    },

    linkItem: {
        fontFamily: 'Dosvgabold',
        fontSize: '16px',
        lineHeight: '1.6',
    },

    link: {
        fontFamily: 'Dosvgabold',
        fontSize: '16px',
        color: '#0054E3',
        textDecoration: 'underline',
        transition: 'color 0.2s',
    },

    placeholderSpace: {
        width: '100%',
        height: '150px',
        backgroundColor: '#FFFFFF',
        flexShrink: 0,
    },
};

export default ArtProjects;