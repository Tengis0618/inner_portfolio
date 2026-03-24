import React from 'react';
import printer from '../../assets/resume/printer.gif';
import Resume from '../../assets/resume/Resume_Tengis_e.pdf';

export interface ResumeDownloadProps {
    altText?: string;
}

const ResumeDownload: React.FC<ResumeDownloadProps> = ({ altText }) => {
    return (
        <div className="window" style={styles.windowContainer}>
            <div className="title-bar" style={styles.titleBar}>
                <div className="title-bar-text">Command Prompt</div>
            </div>
            <div className="window-body" style={styles.windowBody}>
                <pre style={styles.preContent}>
                    {/* <img style={styles.resumePrinter} alt="" src={printer} /> */}
                    <div style={styles.bashHistory}>
                        Microsoft Windows XP [Version 5.1.2600] <br/>
                        (C) Copyright 1985-2001 Microsoft Corp. <br/>
                    </div>
                    <div style={styles.bashContent}>
                        <span style={styles.heading}>
                            {altText ? altText : 'C:\\> Looking for my resume?'}
                        </span>
                        {' '}
                        <a 
                            rel="noreferrer" 
                            target="_blank" 
                            href={Resume}
                            style={styles.link}
                        >
                            Click here to download it!
                        </a>
                    </div>
                </pre>
            </div>
        </div>
    );
};

const styles: StyleSheetCSS = {
    windowContainer: {
        width: '100%',
        margin: '0',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
    },
    titleBar: {
        fontFamily: 'Tahoma, Arial, sans-serif',
        padding: '3px 5px 3px 3px',
        height: '21px',
    },
    windowBody: {
        padding: '0',
        width: '100%',
        boxSizing: 'border-box',
        margin: '0', 
    },
    preContent: {
        width: '100%',
        display: 'flex',
        alignItems: 'start',
        flexDirection: 'column',
        gap: '24px',
        padding: '20px',
        margin: '0',
        whiteSpace: 'normal',
        fontFamily: 'Tahoma, Arial, sans-serif',
    },
    resumePrinter: {
        width: 72,
        height: 64,
        flexShrink: 0,
    },
    heading: {
        fontSize: '18px',
        fontFamily: 'Dosvgabold',
        color: 'white',
        marginRight: '5em',
    },
    link: {
        fontSize: '18px',
        fontWeight: 'bold',
        fontFamily: 'Dosvgabold',
        color: 'white',
        textDecoration: 'underline',
        cursor: 'pointer',
    },
    bashHistory: {
        fontSize: '18px',
        fontFamily: 'Dosvgabold',
        color: 'white',
    }
};

export default ResumeDownload;