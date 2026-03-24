"use client"

import type { CSSProperties } from "react"

export interface Achievement {
  date: string
  description: string
}

export interface Certificate {
  date: string
  description: string
}

export interface Volunteer {
  date: string
  description: string
}

interface WindowsXPAchievementsProps {
  achievements: Achievement[]
  certificates: Certificate[]
  volunteers: Volunteer[]
}

const styles: Record<string, CSSProperties> = {
  container: {
    width: "100%",
    maxWidth: "900px",
    display: "flex",
    flexDirection: "column",
  },
  contentArea: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    backgroundColor: "white",
  },
  sectionHeading: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#003399",
    marginBottom: "12px",
    marginTop: "0",
  },
  sectionDivider: {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#003399",
    marginBottom: "12px",
    marginTop: "24px",
  },
  listContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  achievementItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    border: "1px solid #E0DED4",
    backgroundColor: "#F1EFE2",
    cursor: "pointer",
    transition: "all 0.2s",
    borderRadius: "2px",
  },
  iconCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #FFC107 0%, #FF9800 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
  },
  certificateIconCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4CAF50 0%, #388E3C 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
  },
  volunteerIconCircle: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #4c74afff 0%, #4476a5ff 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    boxShadow: "1px 1px 3px rgba(0, 0, 0, 0.3)",
  },
  iconText: {
    fontSize: "20px",
    color: "white",
  },
  contentContainer: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  dateContainer: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "11px",
    color: "#666",
    fontWeight: "600",
  },
  description: {
    fontSize: "13px",
    color: "#000",
    lineHeight: "1.4",
  },
  volunteerItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    border: "1px solid #E0DED4",
    backgroundColor: "#F1EFE2",
    cursor: "pointer",
    transition: "all 0.2s",
    borderRadius: "2px",
  },
}

export default function WindowsXPAchievements({
  achievements,
  certificates,
  volunteers
}: WindowsXPAchievementsProps) {
  return (
    <div style={styles.container}>
      {/* Content Area */}
      <div style={styles.contentArea}>
        {/* Achievements Section */}
        <h2 style={styles.sectionHeading}>Achievements</h2>
        <div style={styles.listContainer}>
          {achievements.map((achievement, index) => (
            <div
              key={index}
              style={styles.achievementItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#E8F4FF"
                e.currentTarget.style.border = "1px solid #0054E3"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F1EFE2"
                e.currentTarget.style.border = "1px solid #E0DED4"
              }}
            >
              {/* Icon similar to Control Panel items */}
              <div style={styles.iconCircle}>
                <span style={styles.iconText}>🏆</span>
              </div>

              {/* Content */}
              <div style={styles.contentContainer}>
                <div style={styles.dateContainer}>
                  <span>{achievement.date}</span>
                </div>
                <div style={styles.description}>{achievement.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Certificates Section */}
        <h2 style={styles.sectionDivider}>Certificates</h2>
        <div style={styles.listContainer}>
          {certificates.map((certificate, index) => (
            <div
              key={index}
              style={styles.achievementItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#E8F4FF"
                e.currentTarget.style.border = "1px solid #0054E3"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F1EFE2"
                e.currentTarget.style.border = "1px solid #E0DED4"
              }}
            >
              {/* Icon for certificates */}
              <div style={styles.certificateIconCircle}>
                <span style={styles.iconText}>📜</span>
              </div>

              {/* Content */}
              <div style={styles.contentContainer}>
                <div style={styles.dateContainer}>
                  <span>{certificate.date}</span>
                </div>
                <div style={styles.description}>{certificate.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Volunteers Section */}
        <h2 style={styles.sectionDivider}>Volunteers</h2>
        <div style={styles.listContainer}>
          {volunteers.map((volunteer, index) => (
            <div
              key={index}
              style={styles.volunteerItem}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#E8F4FF"
                e.currentTarget.style.border = "1px solid #0054E3"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#F1EFE2"
                e.currentTarget.style.border = "1px solid #E0DED4"
              }}
            >
              {/* Icon similar to Control Panel items */}
              <div style={styles.volunteerIconCircle}>
                <span style={styles.iconText}>📌</span>
              </div>

              {/* Content */}
              <div style={styles.contentContainer}>
                <div style={styles.dateContainer}>
                  <span>{volunteer.date}</span>
                </div>
                <div style={styles.description}>{volunteer.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}