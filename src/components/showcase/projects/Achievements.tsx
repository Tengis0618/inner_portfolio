import React, { useState } from 'react';
// @ts-ignore
import house from '../../../assets/audio/house_master.mp3';
// @ts-ignore
import edge from '../../../assets/audio/edge_unmastered.mp3';
// @ts-ignore
import dnb from '../../../assets/audio/break.mp3';
// @ts-ignore
import dnbDrums from '../../../assets/audio/dnb_drop_drums.mp3';
import houseProject from '../../../assets/pictures/projects/audio/houseProject.png';
import dnbDrumsProject from '../../../assets/pictures/projects/audio/dnbDrumsProject.png';
import { MusicPlayer } from '../../general';
import WindowsXPAchievements, { type Achievement, type Certificate, type Volunteer } from '../projects/projects-achievements';
import PathNavBar from '../PathNavBar';

export interface AchievementsProps {}

const achievements: Achievement[] = [
  {
    date: "2025",
    description:
      "13th Annual International NYUAD Hackathon for Social Good in the Arab World Quantum Computing, AI, and the UN Sustainable Development Goals - 2nd place.",
  },
  {
    date: "2025",
    description:
      "The UAE University Games - Men’s Volleyball Western Conference - 2nd place.",
  },
  {
    date: "2023",
    description:
      "The UAE Abu Dhabi Intercollegiate Sports League (ADISL) - 2nd place.",
  },
  {
    date: "2021",
    description:
      "Full-Ride Scholarship to New York University Abu Dhabi, covering tuition, fees, and living expenses based on academic excellence and leadership potential.",
  },
]

const certificates: Certificate[] = [
  {
    date: "November 5, 2023",
    description:
      "The QWorld Bronze-Qiskit QC Certification Course 2025",
  },
  {
    date: "August 18, 2023",
    description:
      "The QWorld Nickel-Qiskit QC Certification Course 2025",
  },
]

const volunteers: Volunteer[] = [
  {
    date: "2024",
    description:
      "NYUAD Hackathon for Social Good in the Arab World 2024 - Staff/Volunteer",
  },
  {
    date: "2024",
    description:
      "China-Gulf Forum 2024 - Volunteer",
  },
  {
    date: "2022",
    description:
      "Orchlon College Application Accelerator Camp 2022 - Assistant Instructor",
  },
]

const Achievements: React.FC<AchievementsProps> = (props) => {

    return (
        <div style={styles.achievementsContainer}>
            {/* Path Nav bar*/}
            <PathNavBar currentDirectory='Projects/Achievements'/>
            <div style={styles.mainContent}>
                <WindowsXPAchievements
                    achievements={achievements}
                    certificates={certificates}
                    volunteers={volunteers}
                />

                {/* Placeholder spacing after footer */}
                <div style={styles.placeholderSpace}></div>
            </div>
        </div>
    );
};

 const styles: StyleSheetCSS = {
    achievementsContainer: {
        width: '100%',
        height: '100vh',
        backgroundColor: '#FFFFFF',
        fontFamily: 'Dosvgabold',
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

    placeholderSpace: {
        width: '100%',
        height: '150px', // Adjust this value as needed for more or less space
        backgroundColor: '#FFFFFF',
        flexShrink: 0,
    },
 };

export default Achievements;
