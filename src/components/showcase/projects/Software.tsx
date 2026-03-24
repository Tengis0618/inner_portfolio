import React from 'react';
import ResumeDownload from '../ResumeDownload';
import PathNavBar from '../PathNavBar';
import WindowsXPPortfolioItem, { type PortfolioItem } from './projects-item';
import diffusionImage from '../../../assets/pictures/diffusion-models-2.png';
import techieImage from '../../../assets/pictures/Tech_Jobs_Portal_in_USA.jpg';
import qaImage from '../../../assets/pictures/anonymous-q-a.png';
import weatherBeats from '../../../assets/pictures/logo-weatherBeats.png';
import canQr from '../../../assets/pictures/canQr-picture.png';
import blackjack from '../../../assets/pictures/blackjack.png';

export interface AboutProps {}

const projects: PortfolioItem[] = [
    {
        title: "Diffusion Model - Image Generation",
        description:
            "Context-aware diffusion model for generating cosmological hydrogen intensity maps conditioned on astrophysical and cosmological parameters using the CAMELS dataset.",
        picture: diffusionImage,
        link: "https://github.com/Tengis0618/CAMELS-Diffusion-Model",
    },
    {
        title: "canQr",
        description:
            "We combine classical quantum chemistry (PySCF) with quantum algorithms (VQE using PennyLane) to calculate binding energies and optimize drug candidates. It optimizes drug parameters to maximize binding selectivity.",
        picture: canQr,
        link: "https://github.com/alibinauanov/hackathon2025-canQr",
    },
    {
        title: "Weather-Beats",
        description:
            "WeatherBeats is your go-to web application for seamlessly pairing your music with the current weather conditions. Say goodbye to the guesswork and let WeatherBeats create the perfect soundtrack for your day.",
        picture: weatherBeats,
        link: "https://github.com/Weather-Beats",
    },
    {
        title: "Techie Job Portal",
        description:
            "Techie is a comprehensive web application designed to revolutionize the tech job search experience. With Techie, finding the perfect job or the ideal candidate has never been easier.",
        picture: techieImage,
        link: "https://github.com/Tengis0618/Techie",
    },
    {
        title: "Anonymous Q-A",
        description:
            "Question-and-answer site where users post questions and answers to these questions anonymously. This single page app uses AJAX calls instead of regular page rendering and form submission.",
        picture: qaImage,
        link: "https://github.com/Tengis0618/Q-A-site",
    },
    {
        title: "BlackJack",
        description:
            "Client-side card game each player will try to construct a hand of cards that's equal to 21 or as close to 21 as possible, without going over the sum of the numeric values of the cards.",
        picture: blackjack,
        link: "https://github.com/Tengis0618/Blackjack",
    },
];

const About: React.FC<AboutProps> = (props) => {
    return (
        <div style={styles.aboutContainer}>
            {/* Path Nav bar*/}
            <PathNavBar currentDirectory='Projects/Software'/>

            {/* Main Content with Portfolio Grid */}
            <div style={styles.mainContent}>
                {/* Title and Description */}
                <div style={styles.headerSection}>
                    <h1 style={styles.title}>Software Projects</h1>
                    <p style={styles.description}>
                        Explore my collection of software projects showcasing full-stack development, 
                        AI integration, and modern web technologies. Each project demonstrates my 
                        commitment to creating interesting and challenging solutions.
                    </p>
                </div>

                {/* Resume Download */}
                <div style={styles.resumeSection}>
                    <ResumeDownload/>
                </div>

                {/* Projects Grid */}
                <div style={styles.grid}>
                    {projects.map((item, index) => (
                        <WindowsXPPortfolioItem key={index} item={item} index={index} />
                    ))}
                </div>

                {/* Footer Section */}
                <div style={styles.footerSection}>
                    <div style={styles.footerContent}>
                        <p style={styles.footerText}>
                            Interested in seeing more? Check out my{' '}
                            <a 
                                href="https://github.com/Tengis0618" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={styles.githubLink}
                            >
                                GitHub
                            </a>
                            {' '}for additional projects and contributions.
                        </p>
                    </div>
                </div>

                {/* Placeholder spacing after footer */}
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
        paddingBottom: '0', // Removed bottom padding since we have placeholder
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
        gap: '12px',
        textAlign: 'center',
    },

    title: {
        fontFamily: 'Dosvgabold',
        fontSize: '32px',
        fontWeight: 'bold',
        margin: '0',
        color: '#000000',
    },

    description: {
        fontFamily: 'Dosvgabold',
        fontSize: '16px',
        lineHeight: '1.6',
        margin: '0',
        maxWidth: '800px',
        color: '#333333',
    },

    resumeSection: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        boxSizing: 'border-box',
    },

    grid: {
        display: 'grid',
        gap: '24px',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        width: '100%',
    },

    footerSection: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        marginTop: '24px',
        boxSizing: 'border-box',
    },

    footerContent: {
        width: '100%',
        maxWidth: '800px',
        border: '2px solid #0054E3',
        background: 'linear-gradient(to bottom, #EBF4FF, #D8EBFF)',
        padding: '24px',
        boxShadow: '2px 2px 0 rgba(0,0,0,0.2)',
        borderRadius: '4px',
        textAlign: 'center',
    },

    footerText: {
        fontFamily: 'Dosvgabold',
        fontSize: '16px',
        lineHeight: '1.6',
        margin: '0',
        color: '#000080',
    },

    githubLink: {
        fontFamily: 'Dosvgabold',
        fontSize: '16px',
        color: '#0054E3',
        textDecoration: 'underline',
        fontWeight: 'bold',
        transition: 'color 0.2s',
    },

    placeholderSpace: {
        width: '100%',
        height: '150px', // Adjust this value as needed for more or less space
        backgroundColor: '#FFFFFF',
        flexShrink: 0,
    },
};

export default About;