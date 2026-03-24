import React from 'react';
import { Link } from 'react-router-dom';
import ResumeDownload from './ResumeDownload';
import PathNavBar from './PathNavBar';
import AboutPicture from '../../assets/pictures/about_picture.jpg';
import WindowsXPPicture from '../../assets/pictures/windows_xp.jpg'; // Add your Windows XP image

export interface AboutProps {}

const About: React.FC<AboutProps> = (props) => {
    return (
        <div style={styles.aboutContainer}>
            {/* Path Nav bar*/}
                <PathNavBar currentDirectory='Introduction'/>
            {/* Main Content */}
            <div style={styles.mainContent}>
                {/* Title and Description */}
                <div style={styles.headerSection}>
                    <h1 style={styles.title}>Introduction</h1>
                </div>

                {/* Introduction Panel */}
                <div style={styles.blogContent}>
                    <div style={styles.textBlock}>
                        <p style={styles.paragraph}>
                            I'm a software engineer enthusiast! In May
                            of 2025 I graduated from New York University Abu Dhabi
                            with my BS in Computer Science.
                            Thank you for taking the time to check out my portfolio. I
                            really hope you enjoy exploring it as much as I enjoyed
                            building it. If you have any questions or comments, feel
                            free to contact me using{' '}
                            <Link to="/contact" style={styles.link}>this form</Link> or shoot me an email at{' '}
                            <a href="mailto:tt2273@nyu.edu" style={styles.link}>
                                tt2273@nyu.edu
                            </a>
                        </p>                    
                    </div>

                {/* About Me Panel */}
                <div style={styles.sectionBlock}>
                    <h2 style={styles.sectionTitle}>About Me</h2>
                    <p style={styles.paragraph}>
                        I'm a recent Computer Science graduate from New York University Abu Dhabi and software engineer currently working at Golomt Bank, where I'm gaining valuable experience in the fintech industry. 
                        As a fresh graduate, I bring enthusiasm for clean code and modern development practices, with strong foundations in Java, Python, JavaScript, and C.
                    </p>
                    <p style={styles.paragraph}>
                        At Golomt Bank, I'm developing my skills in enterprise-level software development while contributing to banking solutions that serve thousands of customers. My diverse programming background allows me to adapt quickly to different projects and technologies as needed.
                    </p>
                    <p style={styles.paragraph}>
                        I'm passionate about leveraging technology to solve real-world problems, particularly in the financial sector where reliability and security are paramount. As someone early in my career, I'm eager to continue learning, take on new challenges, and grow alongside experienced developers.
                        When I'm not coding, I enjoy exploring new technologies and staying current with industry trends. I believe in the power of continuous learning and am always excited to contribute to projects that make a meaningful impact.
                    </p>
                </div>

                {/* Early Interests Section */}
                <div style={styles.sectionBlock}>
                    <h2 style={styles.sectionTitle}>Early Inspirations</h2>
                    <p style={styles.paragraph}>
                        From a young age, I've always been fascinated by building and exploring things. Whether it was taking apart old electronics to see how they worked or constructing elaborate projects from scratch, I had an insatiable curiosity about how things functioned. This hands-on approach to learning shaped my problem-solving mindset and laid the foundation for my journey into technology.
                    </p>
                    <p style={styles.paragraph}>
                        My first real computer experience was with Windows XP—that iconic operating system with its rolling green hills wallpaper and the satisfying startup sound. I remember spending countless hours exploring every corner of the system, customizing themes, playing with Paint and Spider. The intuitive interface and playful design elements of Windows XP sparked something in me—a realization that technology could be both powerful and accessible.
                    </p>

                    {/* Windows XP Image */}
                    <div style={styles.imageContainer}>
                        <div style={styles.imageFrame}>
                            <img src={AboutPicture} alt="Young me" style={styles.image} />
                        </div>
                        <p style={styles.caption}>
                            <b>Figure 1:</b> My aunt introducing me to the great white XP
                        </p>
                    </div>

                    <p style={styles.paragraph}>
                        This nostalgic connection to Windows XP is actually the inspiration behind this portfolio's design. I wanted to recreate that sense of wonder and exploration I felt as a kid discovering technology for the first time. The retro aesthetic isn't just a visual choice—it's a tribute to where my journey began and a reminder that the best interfaces are those that invite curiosity and make complex systems feel approachable. 
                    </p>
                </div>

                {/* Closing Panel */}
                <div style={styles.sectionBlock}>
                    <h2 style={styles.sectionTitle}>Get In Touch</h2>
                    <p style={styles.paragraph}>
                        Thank you for getting to know me better! I'm excited for you to dive into the rest of my work and see what I've been building. 
                        I'm always open to conversations, whether about my projects, potential collaborations, or just tech in general. 
                        Feel free to get in touch through the {' '}
                        <Link to="/contact" style={styles.link}>contact section</Link> or shoot me an email
                        at{' '}
                        <a href="mailto:tt2273@nyu.edu" style={styles.link}>
                            tt2273@nyu.edu
                        </a>
                    </p>
                </div>

                <ResumeDownload/>
                </div>

                {/* Placeholder spacing */}
                <div style={styles.placeholderSpace}></div>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    aboutContainer: {
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

    title: {
        fontFamily: 'Dosvgabold',
        fontSize: '32px',
        fontWeight: 'bold',
        margin: '0',
        color: '#000000',
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

    paragraph: {
        fontFamily: 'Dosvgabold',
        fontSize: '16px',
        lineHeight: '1.6',
        margin: '0',
        color: '#333333',
        textAlign: 'justify',
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

     placeholderSpace: {
        width: '100%',
        height: '160px',
        backgroundColor: '#FFFFFF',
        flexShrink: 0,
    },

    link: {
        color: '#0000FF',
        textDecoration: 'underline',
        fontSize: '16px',
        fontFamily: 'Dosvgabold',
    },

    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
        margin: '20px 0',
    },

    imageFrame: {
        border: '2px solid #0054E3',
        padding: '4px',
        backgroundColor: '#F0F0F0',
        display: 'inline-block',
        borderRadius: '4px',
        boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
        boxSizing: 'border-box',
    },

    image: {
        maxWidth: '100%',
        height: 'auto',
        display: 'block',
        boxSizing: 'border-box',
    },

    caption: {
        fontFamily: 'Dosvgabold',
        fontSize: '14px',
        fontStyle: 'italic',
        margin: '0',
        color: '#666666',
        textAlign: 'center',
    },
};

export default About;