"use client"

import WindowsXPPortfolioItem, { type PortfolioItem } from "./projects-item"
import type { CSSProperties } from "react"

interface WindowsXPPortfolioSectionProps {
  title: string
  items: PortfolioItem[]
}

const styles: Record<string, CSSProperties> = {
  wrapper: {
    display: "flex",
    width: "100%",
    maxWidth: "1280px",
    flexDirection: "column",
    gap: "24px",
  },
  sectionWindow: {
    display: "flex",
    flexDirection: "column",
    border: "2px solid #0054E3",
    background: "linear-gradient(to bottom, #EBF4FF, #D8EBFF)",
    boxShadow: "4px 4px 0 rgba(0,0,0,0.3)",
  },
  titleBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "linear-gradient(to right, #0054E3, #3C8CF4)",
    padding: "8px 12px",
  },
  titleBarLeft: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  titleIcon: {
    height: "16px",
    width: "16px",
    borderRadius: "2px",
    border: "1px solid rgba(255,255,255,0.5)",
    backgroundColor: "#F0F0F0",
  },
  titleText: {
    fontFamily: "system-ui, sans-serif",
    fontSize: "16px",
    fontWeight: 700,
    color: "white",
    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
  },
  windowButtons: {
    display: "flex",
    gap: "4px",
  },
  windowButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "20px",
    width: "20px",
    borderRadius: "2px",
    border: "1px solid rgba(255,255,255,0.5)",
    background: "linear-gradient(to bottom, #F0F0F0, #D8D8D8)",
    fontSize: "12px",
    fontWeight: 700,
    color: "black",
    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  menuBar: {
    display: "flex",
    gap: "4px",
    borderBottom: "1px solid #AABDD7",
    background: "linear-gradient(to bottom, #F0F0F0, #E8E8E8)",
    padding: "4px 8px",
  },
  menuButton: {
    borderRadius: "2px",
    padding: "4px 8px",
    fontFamily: "system-ui, sans-serif",
    fontSize: "14px",
    color: "black",
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  contentArea: {
    backgroundColor: "white",
    padding: "24px",
  },
  grid: {
    display: "grid",
    gap: "24px",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
  },
  statusBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    borderTop: "1px solid #AABDD7",
    background: "linear-gradient(to bottom, #E8E8E8, #D8D8D8)",
    padding: "6px 12px",
  },
  statusIcon: {
    height: "16px",
    width: "16px",
    border: "2px solid #808080",
    backgroundColor: "white",
  },
  statusText: {
    fontFamily: "system-ui, sans-serif",
    fontSize: "12px",
    color: "black",
  },
}

export default function WindowsXPPortfolioSection({ title, items }: WindowsXPPortfolioSectionProps) {
  return (
    <div style={styles.wrapper}>
      {/* Section window */}
      <div style={styles.sectionWindow}>
        {/* XP-style title bar */}
        <div style={styles.titleBar}>
          <div style={styles.titleBarLeft}>
            <div style={styles.titleIcon} />
            <span style={styles.titleText}>{title}</span>
          </div>
          <div style={styles.windowButtons}>
            <button
              style={styles.windowButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(to bottom, #FFF6CE, #F7EFAF)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(to bottom, #F0F0F0, #D8D8D8)"
              }}
            >
              _
            </button>
            <button
              style={styles.windowButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(to bottom, #FFF6CE, #F7EFAF)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(to bottom, #F0F0F0, #D8D8D8)"
              }}
            >
              □
            </button>
            <button
              style={styles.windowButton}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(to bottom, #FF6B6B, #FF4444)"
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(to bottom, #F0F0F0, #D8D8D8)"
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Menu bar */}
        <div style={styles.menuBar}>
          <button
            style={styles.menuButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#D8E9F7"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
            }}
          >
            File
          </button>
          <button
            style={styles.menuButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#D8E9F7"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
            }}
          >
            Edit
          </button>
          <button
            style={styles.menuButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#D8E9F7"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
            }}
          >
            View
          </button>
          <button
            style={styles.menuButton}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#D8E9F7"
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent"
            }}
          >
            Help
          </button>
        </div>

        {/* Content area */}
        <div style={styles.contentArea}>
          <div style={styles.grid}>
            {items.map((item, index) => (
              <WindowsXPPortfolioItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* Status bar */}
        <div style={styles.statusBar}>
          <div style={styles.statusIcon} />
          <span style={styles.statusText}>
            {items.length} {items.length === 1 ? "item" : "items"}
          </span>
        </div>
      </div>
    </div>
  )
}
