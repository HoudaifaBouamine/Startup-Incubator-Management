"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { makeStyles, tokens, Button, Spinner, TabList, Tab, ProgressBar } from "@fluentui/react-components"
import {
  ChevronRight20Regular,
  DocumentRegular,
  Folder20Filled,
  Folder20Regular,
  Comment20Filled,
  Comment20Regular,
  CalendarLtr20Regular,
  AddRegular,
} from "@fluentui/react-icons"
import { useAuth } from "../../../hooks/use-auth"

const useStyles = makeStyles({
  container: {
    padding: "24px",
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "calc(100vh - 60px)",
  },
  breadcrumb: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "24px",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
  },
  breadcrumbLink: {
    color: tokens.colorNeutralForeground3,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  breadcrumbSeparator: {
    display: "flex",
    alignItems: "center",
  },
  breadcrumbCurrent: {
    color: tokens.colorNeutralForeground1,
  },
  header: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "16px 24px",
    borderRadius: "8px",
    marginBottom: "24px",
    boxShadow: tokens.shadow4,
  },
  headerTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  projectTitle: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    margin: 0,
  },
  progressPercentage: {
    fontSize: tokens.fontSizeBase100,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
  progressBar: {
    height: "8px",
  },
  projectInfo: {
    display: "flex",
    gap: "16px",
    marginTop: "16px",
  },
  projectInfoItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  content: {
    display: "flex",
    gap: "24px",
  },
  sessionsPanel: {
    width: "300px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "16px",
    boxShadow: tokens.shadow4,
  },
  sessionsPanelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  sessionsPanelTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    margin: 0,
  },
  sessionCount: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground3,
  },
  sessionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  sessionItem: {
    padding: "12px",
    borderRadius: "4px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  sessionItemActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderLeft: `3px solid ${tokens.colorBrandBackground}`,
    paddingLeft: "9px",
  },
  sessionDate: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorBrandForeground1,
    fontWeight: tokens.fontWeightSemibold,
  },
  noSessions: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
    textAlign: "center",
    gap: "16px",
  },
  noSessionsIcon: {
    fontSize: "24px",
    color: tokens.colorNeutralForeground3,
    backgroundColor: tokens.colorNeutralBackground3,
    width: "48px",
    height: "48px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  noSessionsTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  noSessionsText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  deliverablePanel: {
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "16px",
    boxShadow: tokens.shadow4,
  },
  tabContainer: {
    marginBottom: "16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  tabContent: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  deliverablesList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  deliverableItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  deliverableInfo: {
    flex: 1,
  },
  deliverableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  deliverableTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    margin: 0,
  },
  deliverableDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    margin: 0,
  },
  statusBadge: {
    fontSize: tokens.fontSizeBase200,
    padding: "4px 8px",
    borderRadius: "16px",
    backgroundColor: "transparent",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    color: tokens.colorNeutralForeground3,
  },
  statusBadgeNotStarted: {
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    color: tokens.colorNeutralForeground3,
  },
  statusBadgeInProgress: {
    border: `1px solid ${tokens.colorBrandStroke1}`,
    color: tokens.colorBrandForeground1,
  },
  statusBadgeDone: {
    border: `1px solid ${tokens.colorStatusSuccessBorder1}`,
    color: tokens.colorStatusSuccessForeground1,
  },
  progressInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "4px",
  },
  progressPercentageSmall: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorBrandForeground1,
  },
  progressChange: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorStatusSuccessForeground1,
  },
  progressControls: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  incrementButton: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
    cursor: "pointer",
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  actionButton: {
    marginTop: "16px",
  },
  feedbackItem: {
    display: "flex",
    gap: "12px",
    padding: "16px",
    borderRadius: "8px",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  feedbackAvatar: {
    width: "32px",
    height: "32px",
    borderRadius: "50%",
    backgroundColor: tokens.colorNeutralBackground4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackContent: {
    flex: 1,
  },
  feedbackAuthor: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    margin: 0,
    marginBottom: "4px",
  },
  feedbackText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    margin: 0,
  },
  noFeedback: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "32px 16px",
    textAlign: "center",
    gap: "16px",
  },
  noFeedbackIcon: {
    fontSize: "24px",
    color: tokens.colorNeutralForeground3,
  },
  noFeedbackTitle: {
    fontSize: tokens.fontSizeBase400,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
  },
  noFeedbackText: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "300px",
  },
  unauthorizedContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 120px)",
    textAlign: "center",
    gap: "16px",
  },
  unauthorizedText: {
    fontSize: tokens.fontSizeBase500,
    color: tokens.colorNeutralForeground1,
  },
})

interface Deliverable {
  id: string
  title: string
  description: string
  status: "not started" | "in progress" | "done"
  progress: number
  change: string
}

interface Feedback {
  id: string
  author: string
  text: string
}

interface Session {
  id: string
  date: string
  deliverables: Deliverable[]
  feedbacks: Feedback[]
}

interface Project {
  id: string
  name: string
  teamId: string
  progress: number
  sessions: Session[]
}

const ProjectDetail = () => {
  const styles = useStyles()
  const { projectId } = useParams<{ projectId: string }>()
  const navigate = useNavigate()
  const { user, isLoading } = useAuth()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("deliverables")
  const [selectedSessionIndex, setSelectedSessionIndex] = useState(0)
  const [editMode, setEditMode] = useState(false)
  const [tempDeliverables, setTempDeliverables] = useState<Deliverable[]>([])

  useEffect(() => {
    if (!isLoading && user && user.role !== "MENTOR") {
      navigate("/dashboard")
    }
  }, [user, isLoading, navigate])

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setTimeout(() => {
          const mockProject: Project = {
            id: projectId || "1",
            name: "Project Name",
            teamId: "Team123",
            progress: 10,
            sessions: [
              {
                id: "1",
                date: "March 3, 2025",
                deliverables: [
                  {
                    id: "1",
                    title: "Prototype",
                    description: "Is the MVP of your product?",
                    status: "not started",
                    progress: 0,
                    change: "+0%",
                  },
                  {
                    id: "2",
                    title: "Demo Video",
                    description: "A demo video to showcase the features and working of your product",
                    status: "not started",
                    progress: 0,
                    change: "+0%",
                  },
                  {
                    id: "3",
                    title: "Pitch Deck",
                    description: "A slides presentation to pitch your project at Demo Day.",
                    status: "not started",
                    progress: 0,
                    change: "+0%",
                  },
                  {
                    id: "4",
                    title: "Deliverable name",
                    description: "Upload your file before the deadline to submit for review",
                    status: "not started",
                    progress: 0,
                    change: "+0%",
                  },
                ],
                feedbacks: [],
              },
            ],
          }
          setProject(mockProject)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching project:", error)
        setLoading(false)
      }
    }

    if (projectId) {
      fetchProject()
    }
  }, [projectId])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleSessionClick = (index: number) => {
    setSelectedSessionIndex(index)
  }

  const handleEditToggle = () => {
    if (editMode) {
      if (project && project.sessions[selectedSessionIndex]) {
        const updatedSessions = [...project.sessions]
        updatedSessions[selectedSessionIndex] = {
          ...updatedSessions[selectedSessionIndex],
          deliverables: tempDeliverables,
        }

        let totalProgress = 0
        let totalDeliverables = 0

        updatedSessions.forEach((session) => {
          session.deliverables.forEach((deliverable) => {
            totalProgress += deliverable.progress
            totalDeliverables++
          })
        })

        const newProgress = totalDeliverables > 0 ? Math.round(totalProgress / totalDeliverables) : 0

        setProject({
          ...project,
          progress: newProgress,
          sessions: updatedSessions,
        })
      }
    } else {
      if (project && project.sessions[selectedSessionIndex]) {
        setTempDeliverables([...project.sessions[selectedSessionIndex].deliverables])
      }
    }

    setEditMode(!editMode)
  }

  const handleIncrementProgress = (deliverableIndex: number) => {
    if (!editMode) return

    const updatedDeliverables = [...tempDeliverables]
    const currentProgress = updatedDeliverables[deliverableIndex].progress

    const newProgress = Math.min(currentProgress + 10, 100)

    updatedDeliverables[deliverableIndex] = {
      ...updatedDeliverables[deliverableIndex],
      progress: newProgress,
      change: `+10%`,
      status: newProgress === 0 ? "not started" : newProgress === 100 ? "done" : "in progress",
    }

    setTempDeliverables(updatedDeliverables)
  }

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "not started":
        return styles.statusBadgeNotStarted
      case "in progress":
        return styles.statusBadgeInProgress
      case "done":
        return styles.statusBadgeDone
      default:
        return ""
    }
  }

  if (!isLoading && user && user.role !== "MENTOR") {
    return (
      <div className={styles.unauthorizedContainer}>
        <h2 className={styles.unauthorizedText}>You don't have permission to access this page.</h2>
        <Button appearance="primary" onClick={() => navigate("/dashboard")}>
          Go to Dashboard
        </Button>
      </div>
    )
  }

  if (loading || isLoading || !project) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Loading project details..." />
      </div>
    )
  }

  const currentSession = project.sessions[selectedSessionIndex]
  const deliverablesToDisplay = editMode ? tempDeliverables : currentSession.deliverables
  const totalDeliverables = project.sessions.reduce((total, session) => total + session.deliverables.length, 0)
  const totalFeedbacks = project.sessions.reduce((total, session) => total + session.feedbacks.length, 0)

  return (
    <div className={styles.container}>
      <div className={styles.breadcrumb}>
        <Link to="/mentor/projects-management" className={styles.breadcrumbLink}>
          Projects Management
        </Link>
        <span className={styles.breadcrumbSeparator}>
          <ChevronRight20Regular />
        </span>
        <span className={styles.breadcrumbCurrent}>{project.name}</span>
      </div>

      <div className={styles.header}>
        <div className={styles.headerTitle}>
          <h1 className={styles.projectTitle}>Project Progress</h1>
          <span className={styles.progressPercentage}>{project.progress}%</span>
        </div>
        <ProgressBar value={project.progress / 100} thickness="large" color="brand" className={styles.progressBar} />

        <div className={styles.projectInfo}>
          <div className={styles.projectInfoItem}>
            <span>Project Name:</span>
            <strong>{project.name}</strong>
          </div>
          <div className={styles.projectInfoItem}>
            <span>Team ID:</span>
            <strong>{project.teamId}</strong>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.sessionsPanel}>
          <div className={styles.sessionsPanelHeader}>
            <h2 className={styles.sessionsPanelTitle}>
              Sessions {project.sessions.length > 0 && `(${project.sessions.length})`}
            </h2>
          </div>

          {project.sessions.length > 0 ? (
            <div className={styles.sessionsList}>
              {project.sessions.map((session, index) => (
                <div
                  key={session.id}
                  className={`${styles.sessionItem} ${index === selectedSessionIndex ? styles.sessionItemActive : ""}`}
                  onClick={() => handleSessionClick(index)}
                >
                  <span className={styles.sessionDate}>{session.date}</span>
                  <ChevronRight20Regular />
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noSessions}>
              <div className={styles.noSessionsIcon}>
                <CalendarLtr20Regular />
              </div>
              <h3 className={styles.noSessionsTitle}>No Sessions Yet</h3>
              <p className={styles.noSessionsText}>Create a new session to track project progress</p>
              <Button icon={<AddRegular />}>Create Session</Button>
            </div>
          )}
        </div>

        <div className={styles.deliverablePanel}>
          <div className={styles.tabContainer}>
            <TabList
              defaultSelectedValue="deliverables"
              selectedValue={activeTab}
              onTabSelect={(_: any, data: { value: string }) => handleTabChange(data.value)}
            >
              <Tab value="deliverables">
                <div className={styles.tabContent}>
                  {activeTab === "deliverables" ? (
                    <Folder20Filled style={{ color: tokens.colorBrandForeground1 }} />
                  ) : (
                    <Folder20Regular />
                  )}
                  <span>Deliverables ({totalDeliverables})</span>
                </div>
              </Tab>
              <Tab value="feedbacks">
                <div className={styles.tabContent}>
                  {activeTab === "feedbacks" ? (
                    <Comment20Filled style={{ color: tokens.colorBrandForeground1 }} />
                  ) : (
                    <Comment20Regular />
                  )}
                  <span>Feedbacks ({totalFeedbacks})</span>
                </div>
              </Tab>
            </TabList>
          </div>

          {activeTab === "deliverables" ? (
            <>
              <Button
                appearance={editMode ? "primary" : "secondary"}
                onClick={handleEditToggle}
                className={styles.actionButton}
              >
                {editMode ? "Save Changes" : "Update Progress"}
              </Button>

              <div className={styles.deliverablesList}>
                {deliverablesToDisplay.map((deliverable: Deliverable, index: number) => (
                  <div key={deliverable.id} className={styles.deliverableItem}>
                    <div className={styles.deliverableInfo}>
                      <div className={styles.deliverableHeader}>
                        <h3 className={styles.deliverableTitle}>{deliverable.title}</h3>
                        <span className={`${styles.statusBadge} ${getStatusBadgeClass(deliverable.status)}`}>
                          {deliverable.status}
                        </span>
                      </div>
                      <p className={styles.deliverableDescription}>{deliverable.description}</p>
                    </div>

                    <div className={styles.progressInfo}>
                      <span className={styles.progressPercentageSmall}>{deliverable.progress}%</span>
                      <span className={styles.progressChange}>{deliverable.change}</span>

                      {editMode && (
                        <div className={styles.progressControls}>
                          <div className={styles.incrementButton} onClick={() => handleIncrementProgress(index)}>
                            <AddRegular />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <Button appearance="secondary" icon={<AddRegular />} className={styles.actionButton}>
                Add Feedback
              </Button>

              {currentSession.feedbacks && currentSession.feedbacks.length > 0 ? (
                <div className={styles.deliverablesList}>
                  {currentSession.feedbacks.map((feedback: Feedback) => (
                    <div key={feedback.id} className={styles.feedbackItem}>
                      <div className={styles.feedbackAvatar}>
                        <DocumentRegular />
                      </div>
                      <div className={styles.feedbackContent}>
                        <h3 className={styles.feedbackAuthor}>{feedback.author}</h3>
                        <p className={styles.feedbackText}>{feedback.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className={styles.noFeedback}>
                  <div className={styles.noFeedbackIcon}>
                    <Comment20Regular />
                  </div>
                  <h3 className={styles.noFeedbackTitle}>No Feedbacks Yet</h3>
                  <p className={styles.noFeedbackText}>Add feedback to help the team improve their project</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail