"use client"

import type { CSSProperties } from "react"

export interface PortfolioItem {
  title: string
  description: string
  picture: string
  link: string
}

interface WindowsXPPortfolioItemProps {
  item: PortfolioItem
  index: number
}

const styles: Record<string, CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    border: "2px solid #0054E3",
    background: "linear-gradient(to bottom, #EBF4FF, #D8EBFF)",
    boxShadow: "2px 2px 0 rgba(0,0,0,0.2)",
    borderRadius: "8px",
    overflow: "hidden",
  },
  titleBar: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "linear-gradient(to right, #0054E3, #3C8CF4)",
    padding: "6px 8px",
  },
  titleText: {
    fontFamily: "system-ui, sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    color: "white",
    textShadow: "0 1px 2px rgba(0,0,0,0.3)",
  },
  contentArea: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "16px",
  },
  imageContainer: {
    position: "relative",
    height: "192px",
    width: "100%",
    overflow: "hidden",
    border: "2px solid #003C9D",
    backgroundColor: "white",
    boxShadow: "inset 0 1px 3px rgba(0,0,0,0.3)",
    borderRadius: "4px",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  descriptionBox: {
    borderRadius: "4px",
    border: "1px solid #AABDD7",
    backgroundColor: "white",
    padding: "12px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  descriptionText: {
    fontFamily: "system-ui, sans-serif",
    fontSize: "14px",
    lineHeight: "1.6",
    color: "#000080",
  },
  linkButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    border: "2px solid #003C74",
    background: "linear-gradient(to bottom, #ECE9D8, #D6D3CE)",
    padding: "8px 16px",
    fontFamily: "system-ui, sans-serif",
    fontSize: "14px",
    fontWeight: 600,
    color: "black",
    boxShadow: "1px 1px 0 white, 2px 2px 0 rgba(0,0,0,0.3)",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.2s",
    borderRadius: "4px",
  },
  externalLinkIcon: {
    height: "16px",
    width: "16px",
    display: "inline-block",
  },
}

// Custom ExternalLink SVG component
const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={styles.externalLinkIcon}
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

export default function WindowsXPPortfolioItem({ item, index }: WindowsXPPortfolioItemProps) {
  return (
    <div style={styles.container}>
      {/* XP-style title bar */}
      <div style={styles.titleBar}>
        <span style={styles.titleText}>{item.title}</span>
      </div>

      {/* Content area */}
      <div style={styles.contentArea}>
        {/* Image */}
        <div style={styles.imageContainer}>
          <img 
            src={item.picture || "/placeholder.svg"} 
            alt={item.title} 
            style={styles.image}
          />
        </div>

        {/* Description */}
        <div style={styles.descriptionBox}>
          <p style={styles.descriptionText}>{item.description}</p>
        </div>

        {/* Link button */}
        <a 
          href={item.link}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.linkButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.border = "2px solid #0054E3"
            e.currentTarget.style.background = "linear-gradient(to bottom, #FFF6CE, #F7EFAF)"
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.border = "2px solid #003C74"
            e.currentTarget.style.background = "linear-gradient(to bottom, #ECE9D8, #D6D3CE)"
          }}
        >
          <ExternalLinkIcon />
          <span>View Details</span>
        </a>
      </div>
    </div>
  )
}