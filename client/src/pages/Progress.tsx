"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { makeStyles, tokens, ProgressBar, TabList, Tab, Spinner } from "@fluentui/react-components"
import {
  ChevronRightRegular,
  DocumentRegular,
  Folder20Filled,
  Folder20Regular,
  Comment20Filled,
  Comment20Regular,
  CommentDismiss24Regular,
  CalendarLtr20Regular,
  ErrorCircleRegular,
} from "@fluentui/react-icons"
import {
  getProjectById,
  getProjectSessions,
  getProjectMembers,
  getProjectEncadrants,
  type Session,
} from "../../api/project-service"
import CreateSessionModal from "./components/create-session-modal"
import AddDeliverableModal from "./components/add-delivrable-modal"
import AddFeedbackModal from "./components/add-feedbacl-modal"

const useStyles = makeStyles({
  layout: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    padding: "0",
    margin: "0",
  },
  headerSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "1rem 2rem",
    marginBottom: "0.5rem",
    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
  },
  headerTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0 0 0.75rem 0",
  },
  progressPercentage: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: "600",
    color: tokens.colorBrandForeground1,
  },
  globalProgressBar: {
    height: "8px", 
    backgroundColor: tokens.colorNeutralBackground4,
    "& .fui-ProgressBar__bar": {
      backgroundColor: tokens.colorBrandForeground1,
    },
    margin: "0",
  },
  contentWrapper: {
    display: "flex",
    flex: 1,
    height: "calc(100% - 70px)", 
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: "hidden",
    alignItems: "stretch",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    padding: "0.5rem 2rem 1rem",
    gap: "2rem",
    height: "100%",
    position: "relative",
  },
  // Left panel - Sessions
  sessionsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    flex: "1 1 33%",
    padding: "0",
    maxHeight: "calc(100vh - 120px)", // Ensure it fits in viewport
  },
  sessionHeader: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "0.25rem",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  sessionCount: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  sessionItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.5rem 0.75rem", 
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "4px",
    marginBottom: "1px", 
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground4,
    },
  },
  sessionDate: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
    fontWeight: "500",
  },
  deliverablesSection: {
    flex: "2 1 66%",
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
    maxHeight: "calc(100vh - 120px)", 
  },
  tabContainer: {
    marginBottom: "0.5rem", 
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  deliverableCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "0.75rem 1rem", 
    marginBottom: "0.5rem", 
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
  },
  deliverableInfo: {
    flex: 1,
  },
  deliverableHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "0.25rem", // Reduced margin
  },
  deliverableName: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: "500",
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  deliverableSubtext: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    margin: 0,
  },
  statusBadge: {
    fontSize: "12px",
    padding: "2px 8px", // Smaller padding
    borderRadius: "16px",
    backgroundColor: "transparent",
    border: `1px solid ${tokens.colorBrandStroke1}`,
    color: tokens.colorBrandForeground1,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  notStartedBadge: {
    fontSize: "12px",
    padding: "2px 8px",
    borderRadius: "16px",
    backgroundColor: "transparent",
    border: `1px solid ${tokens.colorNeutralForeground3}`,
    color: tokens.colorNeutralForeground3,
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
  },
  progressInfo: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "0.25rem",
  },
  progressPercentageSmall: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: "600",
    color: tokens.colorBrandForeground1,
  },
  progressChange: {
    fontSize: "14px",
    color: tokens.colorStatusSuccessForeground1,
  },
  feedbackCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "0.75rem 1rem", // Reduced padding
    marginBottom: "0.5rem", // Reduced margin
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  feedbackAvatar: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: tokens.colorNeutralBackground4,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  feedbackText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    gap: "0.5rem",
    marginTop: "0.5rem", // Reduced margin
  },
  paginationItem: {
    width: "28px", // Smaller pagination items
    height: "28px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  paginationItemActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    fontWeight: tokens.fontWeightSemibold,
  },
  divider: {
    backgroundColor: tokens.colorNeutralStroke2,
    width: "2px",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "calc(33% + 1rem)",
  },
  statItem: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "14px",
  },
  noFeedback: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "3rem 1rem",
    height: "100%",
  },
  noFeedbackIcon: {
    fontSize: "24px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "1rem",
  },
  noFeedbackTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "0.5rem",
  },
  noFeedbackText: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    maxWidth: "300px",
    margin: "0 auto",
  },
  noSessionsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "3rem 1rem",
    height: "100%",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
  },
  noSessionsIcon: {
    fontSize: "24px",
    color: tokens.colorNeutralForeground3,
    marginBottom: "1rem",
    width: "48px",
    height: "48px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: tokens.colorNeutralBackground3,
    borderRadius: "8px",
  },
  defaultDeliverablesList: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
    width: "100%",
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "100%",
  },
  errorContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    color: tokens.colorStatusDangerForeground1,
    gap: "1rem",
  },
  errorIcon: {
    fontSize: "32px",
    color: tokens.colorStatusDangerForeground1,
  },
  actionsContainer: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "1rem",
  },
})

interface ProgressProps {
  projectId: string
}

const defaultDeliverables = [
  {
    title: "Prototype",
    description: "Is the MVP of your product?",
    status: "not started",
    progress: 0,
    change: "+0%",
  },
  {
    title: "Demo Video",
    description: "A demo video to showcase the features and working of your product",
    status: "not started",
    progress: 0,
    change: "+0%",
  },
  {
    title: "Pitch Deck",
    description: "A slides presentation to pitch your project at Demo Day.",
    status: "not started",
    progress: 0,
    change: "+0%",
  },
  {
    title: "Deliverable name",
    description: "Upload your file before the deadline to submit for review",
    status: "not started",
    progress: 0,
    change: "+0%",
  },
]

const Progress: React.FC<ProgressProps> = ({ projectId }) => {
  const styles = useStyles()
  const [activeTab, setActiveTab] = useState("deliverables")
  const [selectedSession, setSelectedSession] = useState(0)
  const [sessions, setSessions] = useState<Session[]>([])
  const [projectName, setProjectName] = useState<string>("")
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [members, setMembers] = useState<any[]>([])
  const [encadrants, setEncadrants] = useState<any[]>([])

  const fetchProjectData = async () => {
    try {
      setLoading(true)
      setError(null)

      const projectData = await getProjectById(projectId)
      setProjectName(projectData.name)

      try {
        const sessionsData = await getProjectSessions(projectId)
        setSessions(sessionsData)
      } catch (err) {
        console.warn("Sessions endpoint not available:", err)
        setSessions([])
      }

      try {
        const membersData = await getProjectMembers(projectId)
        setMembers(membersData.relationData || [])
      } catch (err) {
        console.warn("Members endpoint error:", err)
        setMembers([])
      }

      try {
        const encadrantsData = await getProjectEncadrants(projectId)
        setEncadrants(encadrantsData.relationData || [])
      } catch (err) {
        console.warn("Encadrants endpoint error:", err)
        setEncadrants([])
      }
    } catch (err) {
      console.error("Error fetching project data:", err)
      setError(err instanceof Error ? err.message : "Failed to load project data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (projectId) {
      fetchProjectData()
    }
  }, [projectId])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
  }

  const handleSessionClick = (index: number) => {
    setSelectedSession(index)
  }

  const handleSessionCreated = () => {
    fetchProjectData()
  }

  const handleDeliverableAdded = () => {
    fetchProjectData()
  }

  const handleFeedbackAdded = () => {
    fetchProjectData()
  }

  const calculateGlobalProgress = () => {
    if (sessions.length === 0) return 0

    let totalProgress = 0
    let totalDeliverables = 0

    sessions.forEach((session) => {
      session.deliverables.forEach((deliverable: { progress: number }) => {
        totalProgress += deliverable.progress
        totalDeliverables++
      })
    })

    return totalDeliverables > 0 ? Math.round(totalProgress / totalDeliverables) : 0
  }

  const globalProgress = calculateGlobalProgress()

  const hasNoSessions = sessions.length === 0
  const currentSession = hasNoSessions ? null : sessions[selectedSession]
  const currentDeliverables = hasNoSessions ? [] : currentSession?.deliverables || []
  const currentFeedbacks = hasNoSessions ? [] : currentSession?.feedbacks || []
  const totalDeliverables = hasNoSessions
    ? defaultDeliverables.length
    : sessions.reduce((total, session) => total + session.deliverables.length, 0)
  const totalFeedbacks = hasNoSessions
    ? 0
    : sessions.reduce((total, session) => total + (session.feedbacks?.length || 0), 0)

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Loading project progress..." />
      </div>
    )
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <ErrorCircleRegular className={styles.errorIcon} />
        <h2>Error Loading Project</h2>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className={styles.layout}>
      <div className={styles.headerSection}>
        <div className={styles.headerTitle}>
          <h1 style={{ margin: 0 }}>{projectName || "Project"} Progress</h1>
          <span className={styles.progressPercentage}>{globalProgress}%</span>
        </div>
        <ProgressBar value={globalProgress / 100} thickness="large" className={styles.globalProgressBar} />
      </div>

      <div className={styles.contentWrapper}>
        <div className={styles.mainContent}>
          {hasNoSessions ? (
            <>
              <div className={styles.sessionsSection}>
                <h2 className={styles.sessionHeader}>Sessions</h2>
                <div className={styles.noSessionsContainer}>
                  <div className={styles.noSessionsIcon}>
                    <CalendarLtr20Regular style={{ fontSize: "24px" }} />
                  </div>
                  <h3 className={styles.noFeedbackTitle}>No Sessions Yet</h3>
                  <p className={styles.noFeedbackText}>
                    When your mentor submits a new progress report, you can see it here.
                  </p>
                  <div className={styles.actionsContainer}>
                    <CreateSessionModal projectId={projectId} onSessionCreated={handleSessionCreated} />
                  </div>
                </div>
                <div className={styles.pagination}>
                  <div className={styles.paginationItem}>{"<"}</div>
                  <div className={`${styles.paginationItem} ${styles.paginationItemActive}`}>1</div>
                  <div className={styles.paginationItem}>{">"}</div>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.deliverablesSection}>
                <div className={styles.tabContainer}>
                  <TabList
                    defaultSelectedValue="deliverables"
                    selectedValue={activeTab}
                    onTabSelect={(_event: any, data: { value: string }) => handleTabChange(data.value)}
                  >
                    <Tab value="deliverables">
                      <div className={styles.statItem}>
                        {activeTab === "deliverables" ? (
                          <Folder20Filled style={{ color: tokens.colorBrandForeground1 }} />
                        ) : (
                          <Folder20Regular />
                        )}
                        <span>Deliverables ({totalDeliverables})</span>
                      </div>
                    </Tab>
                    <Tab value="feedbacks">
                      <div className={styles.statItem}>
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

                <div className={styles.defaultDeliverablesList}>
                  {activeTab === "deliverables" ? (
                    defaultDeliverables.map((item, index) => (
                      <div key={index} className={styles.deliverableCard}>
                        <div className={styles.deliverableInfo}>
                          <div className={styles.deliverableHeader}>
                            <h3 className={styles.deliverableName}>{item.title}</h3>
                            <div className={styles.notStartedBadge}>Not started</div>
                          </div>
                          <p className={styles.deliverableSubtext}>{item.description}</p>
                        </div>
                        <div className={styles.progressInfo}>
                          <span className={styles.progressPercentageSmall}>{item.progress}%</span>
                          <span className={styles.progressChange}>{item.change}</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className={styles.noFeedback}>
                      <div className={styles.noFeedbackIcon}>
                        <CommentDismiss24Regular />
                      </div>
                      <h3 className={styles.noFeedbackTitle}>No Feedbacks Yet</h3>
                      <p className={styles.noFeedbackText}>
                        Once you submit your deliverable, your mentor will review it and leave feedback
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <>
              <div className={styles.sessionsSection}>
                <h2 className={styles.sessionHeader}>
                  Sessions <span className={styles.sessionCount}>({sessions.length})</span>
                </h2>
                {sessions.map((session, index) => (
                  <div
                    key={index}
                    className={styles.sessionItem}
                    onClick={() => handleSessionClick(index)}
                    style={{
                      borderLeft: selectedSession === index ? `3px solid ${tokens.colorBrandBackground}` : "none",
                    }}
                  >
                    <span className={styles.sessionDate}>{session.date}</span>
                    <ChevronRightRegular />
                  </div>
                ))}

                <div className={styles.actionsContainer}>
                  <CreateSessionModal projectId={projectId} onSessionCreated={handleSessionCreated} />
                </div>

                <div className={styles.pagination}>
                  <div className={styles.paginationItem}>{"<"}</div>
                  <div className={`${styles.paginationItem} ${styles.paginationItemActive}`}>1</div>
                  <div className={styles.paginationItem}>{">"}</div>
                </div>
              </div>

              <div className={styles.divider} />

              <div className={styles.deliverablesSection}>
                <div className={styles.tabContainer}>
                  <TabList
                    defaultSelectedValue="deliverables"
                    selectedValue={activeTab}
                    onTabSelect={(_event: any, data: { value: string }) => handleTabChange(data.value)}
                  >
                    <Tab value="deliverables">
                      <div className={styles.statItem}>
                        {activeTab === "deliverables" ? (
                          <Folder20Filled style={{ color: tokens.colorBrandForeground1 }} />
                        ) : (
                          <Folder20Regular />
                        )}
                        <span>Deliverables ({totalDeliverables})</span>
                      </div>
                    </Tab>
                    <Tab value="feedbacks">
                      <div className={styles.statItem}>
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
                    <div className={styles.actionsContainer}>
                      {currentSession && (
                        <AddDeliverableModal
                          sessionId={currentSession.id}
                          onDeliverableAdded={handleDeliverableAdded}
                        />
                      )}
                    </div>
                    {currentDeliverables.length > 0 ? (
                      currentDeliverables.map((item: { title: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; status: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; progress: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; change: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }, index: React.Key | null | undefined) => (
                        <div key={index} className={styles.deliverableCard}>
                          <div className={styles.deliverableInfo}>
                            <div className={styles.deliverableHeader}>
                              <h3 className={styles.deliverableName}>{item.title}</h3>
                              <div className={styles.statusBadge}>{item.status}</div>
                            </div>
                            <p className={styles.deliverableSubtext}>{item.description}</p>
                          </div>
                          <div className={styles.progressInfo}>
                            <span className={styles.progressPercentageSmall}>{item.progress}%</span>
                            <span className={styles.progressChange}>{item.change}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={styles.noFeedback}>
                        <div className={styles.noFeedbackIcon}>
                          <Folder20Filled />
                        </div>
                        <h3 className={styles.noFeedbackTitle}>No Deliverables Yet</h3>
                        <p className={styles.noFeedbackText}>
                          This session doesn't have any deliverables assigned yet.
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    <div className={styles.actionsContainer}>
                      {currentSession && (
                        <AddFeedbackModal sessionId={currentSession.id} onFeedbackAdded={handleFeedbackAdded} />
                      )}
                    </div>
                    {currentFeedbacks.length > 0 ? (
                      currentFeedbacks.map((feedback: { author: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; text: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined }, index: React.Key | null | undefined) => (
                        <div key={index} className={styles.feedbackCard}>
                          <div className={styles.feedbackAvatar}>
                            <DocumentRegular />
                          </div>
                          <div>
                            <h4 className={styles.deliverableName}>{feedback.author}</h4>
                            <p className={styles.feedbackText}>{feedback.text}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className={styles.noFeedback}>
                        <div className={styles.noFeedbackIcon}>
                          <CommentDismiss24Regular />
                        </div>
                        <h3 className={styles.noFeedbackTitle}>No Feedbacks Yet</h3>
                        <p className={styles.noFeedbackText}>
                          Once you submit your deliverable, your mentor will review it and leave feedback
                        </p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Progress
