"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { makeStyles, tokens, Input, Button, Dropdown, Option, Avatar, Spinner } from "@fluentui/react-components"
import { Search24Regular, MoreHorizontalRegular, CircleRegular } from "@fluentui/react-icons"
import { useAuth } from "../../../hooks/use-auth"

const useStyles = makeStyles({
  container: {
    padding: "24px",
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "calc(100vh - 60px)",
  },
  header: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "24px",
  },
  searchFilterRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "24px",
    gap: "16px",
  },
  searchContainer: {
    position: "relative",
    flex: 1,
  },
  searchIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: tokens.colorNeutralForeground3,
  },
  searchInput: {
    width: "100%",
    paddingLeft: "40px",
  },
  filterContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  filterLabel: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
  },
  projectsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
    gap: "16px",
  },
  projectCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "16px",
    boxShadow: tokens.shadow4,
  },
  projectHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px",
  },
  progressBadge: {
    backgroundColor: tokens.colorBrandBackground2,
    color: tokens.colorBrandForeground1,
    padding: "4px 8px",
    borderRadius: "16px",
    fontSize: tokens.fontSizeBase200,
    display: "flex",
    alignItems: "center",
    gap: "4px",
  },
  projectTitle: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: tokens.fontWeightSemibold,
    marginBottom: "8px",
  },
  projectDescription: {
    fontSize: tokens.fontSizeBase300,
    color: tokens.colorNeutralForeground2,
    marginBottom: "16px",
  },
  metadataRow: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingTop: "12px",
  },
  metadataSection: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  metadataLabel: {
    fontSize: tokens.fontSizeBase200,
    color: tokens.colorNeutralForeground3,
  },
  avatarGroup: {
    display: "flex",
    marginTop: "4px",
  },
  avatar: {
    marginLeft: "-8px",
    border: `2px solid ${tokens.colorNeutralBackground1}`,
    "&:first-child": {
      marginLeft: 0,
    },
  },
  moreAvatars: {
    width: "24px",
    height: "24px",
    borderRadius: "50%",
    backgroundColor: tokens.colorNeutralBackground3,
    color: tokens.colorNeutralForeground3,
    fontSize: tokens.fontSizeBase200,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "-8px",
    border: `2px solid ${tokens.colorNeutralBackground1}`,
  },
  pagination: {
    display: "flex",
    justifyContent: "center",
    gap: "8px",
    marginTop: "32px",
  },
  paginationItem: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: tokens.fontSizeBase300,
    "&:hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  paginationItemActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    fontWeight: tokens.fontWeightSemibold,
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

interface Project {
  id: string
  name: string
  description: string
  progress: number
  teamMembers: {
    id: string
    name: string
    avatar?: string
  }[]
  mentors: {
    id: string
    name: string
    avatar?: string
  }[]
}

const ProjectsManagement = () => {
  const styles = useStyles()
  const navigate = useNavigate()
  const { user, isLoading } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    // Check if user is a mentor
    if (!isLoading && user && user.role !== "MENTOR") {
      // Redirect non-mentors
      navigate("/dashboard")
    }
  }, [user, isLoading, navigate])

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // In a real app, you would fetch from your API
        // For now, we'll use mock data
        setTimeout(() => {
          const mockProjects: Project[] = [
            {
              id: "1",
              name: "Project Name",
              description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
              progress: 10,
              teamMembers: [
                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32" },
              ],
              mentors: [{ id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=32&width=32" }],
            },
            {
              id: "2",
              name: "Project Name",
              description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
              progress: 10,
              teamMembers: [
                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32" },
              ],
              mentors: [{ id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=32&width=32" }],
            },
            {
              id: "3",
              name: "Project Name",
              description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
              progress: 10,
              teamMembers: [
                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32" },
              ],
              mentors: [{ id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=32&width=32" }],
            },
            {
              id: "4",
              name: "Project Name",
              description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
              progress: 10,
              teamMembers: [
                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32" },
              ],
              mentors: [{ id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=32&width=32" }],
            },
            {
              id: "5",
              name: "Project Name",
              description: "AI-powered diagnostic assistant aiming to improve medical decision-making in rural clinics",
              progress: 10,
              teamMembers: [
                { id: "1", name: "John Doe", avatar: "/placeholder.svg?height=32&width=32" },
                { id: "2", name: "Jane Smith", avatar: "/placeholder.svg?height=32&width=32" },
                { id: "3", name: "Bob Johnson", avatar: "/placeholder.svg?height=32&width=32" },
              ],
              mentors: [{ id: "1", name: "Dr. Smith", avatar: "/placeholder.svg?height=32&width=32" }],
            },
          ]
          setProjects(mockProjects)
          setLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching projects:", error)
        setLoading(false)
      }
    }

    fetchProjects()
  }, [])

  const handleProjectClick = (projectId: string) => {
    navigate(`/mentor/projects/${projectId}`)
  }

  // If user is not a mentor, show unauthorized message
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

  if (loading || isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <Spinner size="large" label="Loading projects..." />
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Projects Management</h1>

      <div>
        <h2>Active Projects ({projects.length})</h2>

        <div className={styles.searchFilterRow}>
          <div className={styles.searchContainer}>
            <Search24Regular className={styles.searchIcon} />
            <Input
              className={styles.searchInput}
              placeholder="Search by name, email, or project..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={styles.filterContainer}>
            <span className={styles.filterLabel}>Filter by</span>
            <Dropdown value={statusFilter} onOptionSelect={(_: any, data: { optionValue: any }) => setStatusFilter(data.optionValue || "all")}>
              <Option value="all">Status</Option>
              <Option value="in-progress">In Progress</Option>
              <Option value="completed">Completed</Option>
              <Option value="not-started">Not Started</Option>
            </Dropdown>
          </div>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <div
              key={project.id}
              className={styles.projectCard}
              onClick={() => handleProjectClick(project.id)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.projectHeader}>
                <div className={styles.progressBadge}>
                  <CircleRegular />
                  In Progress {project.progress}%
                </div>
                <Button
                  icon={<MoreHorizontalRegular />}
                  appearance="subtle"
                  onClick={(e: { stopPropagation: () => void }) => {
                    e.stopPropagation()
                  }}
                />
              </div>

              <h3 className={styles.projectTitle}>{project.name}</h3>
              <p className={styles.projectDescription}>{project.description}</p>

              <div className={styles.metadataRow}>
                <div className={styles.metadataSection}>
                  <span className={styles.metadataLabel}>Team ID</span>
                  <div className={styles.avatarGroup}>
                    {project.teamMembers.slice(0, 3).map((member, index) => (
                      <Avatar
                        key={member.id}
                        name={member.name}
                        image={{ src: member.avatar }}
                        size={24}
                        className={styles.avatar}
                      />
                    ))}
                    {project.teamMembers.length > 3 && (
                      <div className={styles.moreAvatars}>+{project.teamMembers.length - 3}</div>
                    )}
                  </div>
                </div>

                <div className={styles.metadataSection}>
                  <span className={styles.metadataLabel}>Mentors</span>
                  <div className={styles.avatarGroup}>
                    {project.mentors.map((mentor) => (
                      <Avatar
                        key={mentor.id}
                        name={mentor.name}
                        image={{ src: mentor.avatar }}
                        size={24}
                        className={styles.avatar}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.pagination}>
          <div className={styles.paginationItem}>&lt;</div>
          <div className={`${styles.paginationItem} ${styles.paginationItemActive}`}>1</div>
          <div className={styles.paginationItem}>2</div>
          <div className={styles.paginationItem}>3</div>
          <div className={styles.paginationItem}>&gt;</div>
        </div>
      </div>
    </div>
  )
}

export default ProjectsManagement
