import React, { useEffect, useState, useRef } from 'react';
import Window from '../os/Window';
import { motion } from 'framer-motion';

export interface CreditsProps extends WindowAppProps {}

const CREDITS = [
    {
        title: 'Design & Development',
        rows: [['Tengis Temuulen', 'All']],
    },
    {
        title: 'Modeling & Base',
        rows: [
            ['Henry Heffernan', 'Portfolio'],
        ],
    },
    {
        title: 'Sound Design',
        rows: [
            ['Windows 95 Startup Sound', 'Microsoft'],
        ],
    },
    {
        title: 'Special Thanks',
        rows: [
            ['Family', 'Friends']],
    },
    {
        title: 'Inspiration',
        rows: [
            ['Henry Heffernan', 'ShizukuIchi']],
    },
    {
        title: '',
        rows: [['', '']],
    },
    {
        title: '',
        rows: [['', '']],
    },
    {
        title: '',
        rows: [['', '']],
    },
    {
        title: 'Thank You',
        rows: [['For Visiting', '']],
    },
    {
        title: '',
        rows: [['', '']],
    },
];

const Credits: React.FC<CreditsProps> = (props) => {
    const [isPaused, setIsPaused] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        setIsPaused(!isPaused);
    };

    return (
        <Window
            top={48}
            left={48}
            width={1100}
            height={800}
            windowTitle="Credits"
            windowBarIcon="windowExplorerIcon"
            closeWindow={props.onClose}
            onInteract={props.onInteract}
            minimizeWindow={props.onMinimize}
            bottomLeftText={'© Copyright 2026 Tengis Temuulen'}
        >
            <div
                onClick={handleClick}
                className="site-page"
                style={styles.credits}
                ref={containerRef}
            >
                <h2 style={styles.header}>Credits</h2>
                <p style={styles.subheader}>Tengis Temuulen, 2026</p>
                
                <div style={styles.scrollContainer}>
                    <motion.div
                        style={styles.creditsContainer}
                        animate={{
                            y: isPaused ? 0 : [0, -2000],
                        }}
                        transition={{
                            duration: isPaused ? 0 : 30,
                            repeat: Infinity,
                            ease: "linear",
                            repeatType: "loop",
                        }}
                    >
                        {/* Render credits twice for seamless loop */}
                        {[...CREDITS, ...CREDITS].map((section, sectionIndex) => (
                            <div key={`section-${sectionIndex}`} style={styles.section}>
                                {section.title && (
                                    <h3 style={styles.sectionTitle}>{section.title}</h3>
                                )}
                                {section.rows.map((row, rowIndex) => (
                                    <div key={`row-${sectionIndex}-${rowIndex}`} style={styles.row}>
                                        <p style={styles.name}>{row[0]}</p>
                                        {row[1] && <p style={styles.role}>{row[1]}</p>}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </motion.div>
                </div>
                
                <p style={styles.instruction}>
                    {isPaused ? 'Click to resume...' : 'Click to pause...'}
                </p>
            </div>
        </Window>
    );
};

const styles: StyleSheetCSS = {
    credits: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        flexDirection: 'column',
        alignItems: 'center',
        color: 'white',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        padding: '32px 0',
        boxSizing: 'border-box',
    },
    header: {
        margin: '16px 0 8px 0',
        fontSize: '32px',
        fontWeight: 'bold',
    },
    subheader: {
        margin: '0 0 32px 0',
        fontSize: '16px',
        opacity: 0.8,
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    creditsContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: '100px', // Changed from '100%' to '50px'
        gap: '64px',
    },
    section: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '48px',
        minHeight: '100px',
    },
    sectionTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '24px',
        textTransform: 'uppercase',
        letterSpacing: '2px',
        color: '#FFD700',
    },
    row: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '600px',
        margin: '8px 0',
        gap: '32px',
    },
    name: {
        fontSize: '18px',
        flex: 1,
        textAlign: 'right',
    },
    role: {
        fontSize: '18px',
        flex: 1,
        textAlign: 'left',
        opacity: 0.7,
    },
    instruction: {
        position: 'absolute',
        bottom: '16px',
        fontSize: '14px',
        opacity: 0.5,
        animation: 'pulse 2s infinite',
    },
};

export default Credits;