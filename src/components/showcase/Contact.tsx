import type React from "react"
import { useEffect, useState, useRef } from "react"
import PathNavBar from "./PathNavBar"
import ghIcon from "../../assets/pictures/contact-gh.png"
import inIcon from "../../assets/pictures/contact-in.png"
import Resume from '../../assets/resume/Resume_Tengis_e.pdf';

export type ContactProps = {}

// function to validate email
const validateEmail = (email: string) => {
  const re =
    // eslint-disable-next-line
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

interface SocialLinkProps {
  icon: string
  link: string
  label: string
}

const SocialLink: React.FC<SocialLinkProps> = ({ link, icon, label }) => {
  return (
    <a 
      rel="noreferrer" 
      target="_blank" 
      href={link} 
      style={styles.socialLink}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#D4D0C8'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#C0C0C0'
      }}
    >
      <span style={styles.socialIcon}>
        <img src={icon || "/placeholder.svg"} alt="" style={styles.socialImage} />
      </span>
      <span style={styles.socialLabel}>{label}</span>
    </a>
  )
}

const Contact: React.FC<ContactProps> = (props) => {
  const [company, setCompany] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [isFormValid, setIsFormValid] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formMessage, setFormMessage] = useState("")
  const [formMessageColor, setFormMessageColor] = useState("")
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (validateEmail(email) && name.length > 0 && message.length > 0) {
      setIsFormValid(true)
    } else {
      setIsFormValid(false)
    }
  }, [email, name, message])

  async function submitForm(e: React.FormEvent) {
    e.preventDefault()
    if (!isFormValid) {
      setFormMessage("Form unable to validate, please try again.")
      setFormMessageColor("#FF0000")
      return
    }
    try {
      setIsLoading(true)
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbzttQM4j8Xi1yU-QH3-ZparnXPbQnqSsovc_0wcE9v037u3LHcwCReH7vdDOkycr2E/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            company,
            email,
            name,
            message,
          }),
        },
      )
      const data = (await res.json()) as
        | {
            success: false
            error: string
          }
        | { success: true }
      if (data.success) {
        setFormMessage(`Message successfully sent. Thank you ${name}!`)
        setCompany("")
        setEmail("")
        setName("")
        setMessage("")
        setFormMessageColor("#0000FF")
        setIsLoading(false)
        if (formRef.current) {
          formRef.current.reset()
        }
      } else {
        setFormMessage(data.error)
        setFormMessageColor("#FF0000")
        setIsLoading(false)
      }
    } catch (e) {
      setFormMessage("There was an error sending your message. Please try again.")
      setFormMessageColor("#FF0000")
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (formMessage.length > 0) {
      setTimeout(() => {
        setFormMessage("")
        setFormMessageColor("")
      }, 4000)
    }
  }, [formMessage])

  return (
    <div style={styles.contactContainer}>
      {/* Path Navigation Bar */}
      <div style={styles.navBarContainer}>
        <PathNavBar currentDirectory="Contact" />
      </div>

      {/* Scrollable Content */}
      <div style={styles.scrollableContent}>
        {/* Contact Info Panel */}
        <div style={styles.accordionContainer}>
          <div 
            style={styles.accordionHeader}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#D4D0C8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#C0C0C0'
            }}
          >
            <span style={styles.accordionTitle}>📧 Contact Information</span>
          </div>
          <div style={styles.accordionContent}>
            <div style={styles.infoLayout}>
              <p style={styles.textParagraph}>
                I am currently employed at Golomt Bank, however if you have any opportunities, feel free to reach out - I would love to chat!
              </p>
              <div style={styles.emailSection}>
                <span style={styles.emailLabel}>📬 Email:</span>
                <a href="mailto:tt2273@nyu.edu" style={styles.emailLink}>
                  tt2273@nyu.edu
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Panel */}
        <div style={styles.accordionContainer}>
          <div 
            style={styles.accordionHeader}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#D4D0C8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#C0C0C0'
            }}
          >
            <span style={styles.accordionTitle}>📝 Send Message</span>
          </div>
          <div style={styles.accordionContent}>
            <form style={styles.form} ref={formRef} onSubmit={submitForm}>
              {/* Top Row: Name, Email, and Message side by side */}
              <div style={styles.formRow}>
                {/* Name Field */}
                <div style={styles.formGroup}>
                  <label htmlFor="formName" style={styles.formLabel}>
                    <span style={styles.required}>*</span>Name:
                  </label>
                  <input
                    type="text"
                    id="formName"
                    placeholder="Enter your name"
                    name="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    style={styles.formInput}
                  />
                </div>

                {/* Email Field */}
                <div style={styles.formGroup}>
                  <label htmlFor="formEmail" style={styles.formLabel}>
                    <span style={styles.required}>*</span>Email:
                  </label>
                  <input
                    type="email"
                    id="formEmail"
                    placeholder="Enter email"
                    name="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={styles.formInput}
                  />
                  <small style={styles.helpText}>We'll never share your email.</small>
                </div>

                {/* Message Field */}
                <div style={styles.formGroup}>
                  <label htmlFor="formMessage" style={styles.formLabel}>
                    <span style={styles.required}>*</span>Message:
                  </label>
                  <textarea
                    id="formMessage"
                    name="Message"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    style={styles.formTextarea}
                    rows={5}
                  />
                </div>
              </div>

              {/* Bottom Row: Form Message and Submit Button (full width) */}
              <div style={styles.formBottomRow}>
                {/* Form Message */}
                {formMessage && (
                  <div
                    style={{
                      marginBottom: "8px",
                      color: formMessageColor,
                      fontWeight: "bold",
                      fontSize: "11px",
                      fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {formMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={!isFormValid || isLoading}
                  style={{
                    ...styles.submitButton,
                    ...((!isFormValid || isLoading) && styles.submitButtonDisabled),
                  }}
                  onMouseEnter={(e) => {
                    if (isFormValid && !isLoading) {
                      e.currentTarget.style.backgroundColor = '#D4D0C8'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (isFormValid && !isLoading) {
                      e.currentTarget.style.backgroundColor = '#C0C0C0'
                    }
                  }}
                >
                  {!isLoading ? "📤 Submit" : "⏳ Sending..."}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Resume Download Panel */}
        <div style={styles.accordionContainer}>
          <div 
            style={styles.accordionHeader}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#D4D0C8'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#C0C0C0'
            }}
          >
            <span style={styles.accordionTitle}>📄 Resume & Social</span>
          </div>
          <div style={styles.accordionContent}>
            <div style={styles.resumeContent}>
              <div style={styles.resumeSection}>
                <p style={styles.resumeText}>Need a copy of my resume?</p>
                <a 
                  rel="noreferrer" 
                  target="_blank" 
                  href={Resume}
                  style={styles.downloadButton}
                >
                  Click here to download it!
                </a>
              </div>

              {/* Social Links */}
              <div style={styles.socialSection}>
                <h4 style={styles.sectionTitle}>🔗 Connect with me:</h4>
                <div style={styles.socialLinks}>
                  <SocialLink icon={inIcon} link="https://www.linkedin.com/in/tengis-temuulen-32201426a/" label="LinkedIn" />
                  <SocialLink icon={ghIcon} link="https://github.com/Tengis0618" label="GitHub" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Placeholder spacing */}
        <div style={styles.placeholderSpace}></div>
      </div>
    </div>
  )
}

const styles: StyleSheetCSS = {
  contactContainer: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#FFFFFF",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    fontSize: "11px",
    marginLeft: "200px",
    paddingLeft: "16px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
  },

  navBarContainer: {
    flexShrink: 0,
    width: "100%",
  },

  scrollableContent: {
    flex: 1,
    height: 0,
    minHeight: 0,
    maxHeight: "100%",
    overflowY: "auto",
    overflowX: "hidden",
    padding: "16px",
    paddingTop: "8px",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  // Accordion-style container
  accordionContainer: {
    border: "2px outset #FFFFFF",
    borderTop: "2px solid #DFDFDF",
    borderLeft: "2px solid #DFDFDF",
    borderRight: "2px solid #808080",
    borderBottom: "2px solid #808080",
    backgroundColor: "#C0C0C0",
    display: "flex",
    flexDirection: "column",
  },

  accordionHeader: {
    backgroundColor: "#C0C0C0",
    padding: "6px 12px",
    cursor: "default",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    userSelect: "none",
    transition: "background-color 0.1s ease",
    color: "#000000",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    fontSize: "11px",
  },

  accordionTitle: {
    fontSize: "11px",
    fontWeight: "bold",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    whiteSpace: "nowrap",
  },

  accordionContent: {
    padding: "12px 16px",
    backgroundColor: "#FFFFFF",
    borderTop: "2px solid #808080",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    fontSize: "11px",
    lineHeight: "1.5",
  },

  infoLayout: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "16px",
  },

  textParagraph: {
    fontSize: "11px",
    color: "#000000",
    margin: "0",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    lineHeight: "1.4",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    flex: 1,
  },

  emailSection: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px",
    backgroundColor: "#F0F0F0",
    border: "1px solid #D0D0D0",
    borderRadius: "2px",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  emailLabel: {
    fontSize: "11px",
    fontWeight: "bold",
    color: "#000080",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    whiteSpace: "nowrap",
  },

  emailLink: {
    fontSize: "11px",
    color: "#0000FF",
    textDecoration: "underline",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    whiteSpace: "nowrap",
  },

  socialSection: {
    flex: 1,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    columnGap: "12px",
  },

  sectionTitle: {
    fontSize: "11px",
    fontWeight: "bold",
    color: "#000080",
    margin: "0",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    whiteSpace: "nowrap",
  },

  socialLinks: {
    display: "flex",
    flexDirection: "row",
    gap: "8px",
    alignItems: "center",
    flexWrap: "nowrap",
  },

  socialLink: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "4px 8px",
    backgroundColor: "#C0C0C0",
    border: "2px outset #FFFFFF",
    borderTop: "2px solid #DFDFDF",
    borderLeft: "2px solid #DFDFDF",
    borderRight: "2px solid #808080",
    borderBottom: "2px solid #808080",
    textDecoration: "none",
    fontSize: "10px",
    color: "#0000FF",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    transition: "background-color 0.1s",
    cursor: "pointer",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  socialIcon: {
    fontSize: "14px",
  },

  socialImage: {
    width: "16px",
    height: "16px",
  },

  socialLabel: {
    fontSize: "10px",
    textDecoration: "underline",
    whiteSpace: "nowrap",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
  },

  // Top row with 3 fields side by side
  formRow: {
    display: "flex",
    flexDirection: "row",
    gap: "12px",
    width: "100%",
  },

  // Bottom row for button (full width)
  formBottomRow: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  },

  formLabel: {
    fontSize: "11px",
    fontWeight: "bold",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    color: "#000000",
    whiteSpace: "nowrap",
  },

  formInput: {
    padding: "4px 6px",
    fontSize: "11px",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    border: "1px solid #808080",
    borderStyle: "inset",
    backgroundColor: "#FFFFFF",
    borderRadius: "0",
    boxSizing: "border-box",
  },

  formTextarea: {
    padding: "4px 6px",
    fontSize: "11px",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    border: "1px solid #808080",
    borderStyle: "inset",
    backgroundColor: "#FFFFFF",
    borderRadius: "0",
    resize: "vertical",
    minHeight: "80px",
    boxSizing: "border-box",
    flex: 1,
  },

  required: {
    color: "#FF0000",
    fontWeight: "bold",
    marginRight: "4px",
  },

  submitButton: {
    padding: "4px 8px",
    fontSize: "11px",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    backgroundColor: "#C0C0C0",
    border: "2px outset #FFFFFF",
    borderTop: "2px solid #DFDFDF",
    borderLeft: "2px solid #DFDFDF",
    borderRight: "2px solid #808080",
    borderBottom: "2px solid #808080",
    cursor: "pointer",
    borderRadius: "0",
    alignSelf: "flex-start",
    transition: "background-color 0.1s",
    whiteSpace: "nowrap",
  },

  submitButtonDisabled: {
    backgroundColor: "#D4D0C8",
    color: "#808080",
    cursor: "not-allowed",
  },

  helpText: {
    fontSize: "10px",
    color: "#666666",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    margin: 0,
    fontStyle: "italic",
    whiteSpace: "nowrap",
  },

  downloadButton: {
    padding: "4px 8px",
    fontSize: "11px",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    backgroundColor: "#C0C0C0",
    border: "2px outset #FFFFFF",
    borderTop: "2px solid #DFDFDF",
    borderLeft: "2px solid #DFDFDF",
    borderRight: "2px solid #808080",
    borderBottom: "2px solid #808080",
    cursor: "pointer",
    borderRadius: "0",
    transition: "background-color 0.1s",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  resumeContent: {
    display: "flex",
    flexDirection: "row",
    gap: "24px",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: "200px",
  },

  resumeSection: {
    display: "flex",
    flexDirection: "row",
    alignItems: "space-around",
    columnGap: "12px",
    flex: 1,
  },

  resumeText: {
    fontSize: "11px",
    color: "#000000",
    margin: "0",
    fontFamily: "MS Sans Serif, Tahoma, Arial, sans-serif",
    whiteSpace: "nowrap",
  },

  placeholderSpace: {
    width: "100%",
    height: "150px",
    backgroundColor: "#FFFFFF",
    flexShrink: 0,
  },
}

interface StyleSheetCSS {
  [key: string]: React.CSSProperties
}

export default Contact