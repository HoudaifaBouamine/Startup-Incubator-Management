"use client"

import { useState, useEffect } from "react"
import { makeStyles, tokens, Button } from "@fluentui/react-components"
import {
  ChevronRight20Regular,
  Clock20Regular,
  Map20Regular,
  ChevronUp20Regular,
  ChevronDown20Regular,
} from "@fluentui/react-icons"
import { getProjectSessions } from "../../api/project-service"
import { Session } from "../types"

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  content: {
    padding: "32px",
    flex: 1,
  },
  pageTitle: {
    fontSize: "24px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "8px",
  },
  pageSubtitle: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "32px",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    marginBottom: "16px",
  },
  calendarContainer: {
    display: "flex",
    gap: "24px",
    marginBottom: "24px",
  },
  calendar: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "16px",
    width: "350px",
  },
  calendarHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
  },
  calendarMonth: {
    fontSize: "14px",
    fontWeight: "600",
  },
  calendarControls: {
    display: "flex",
    gap: "8px",
  },
  calendarGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "8px",
  },
  calendarDay: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    borderRadius: "50%",
    cursor: "pointer",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  calendarDayHeader: {
    width: "32px",
    height: "32px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground2,
  },
  calendarDayActive: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: "600",
  },
  calendarDaySelected: {
    border: `2px solid ${tokens.colorBrandStroke1}`,
    fontWeight: "600",
  },
  workshopList: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  workshopItem: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  workshopInfo: {
    display: "flex",
    gap: "24px",
  },
  workshopDate: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "8px",
    width: "120px",
  },
  workshopDateTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  workshopMeta: {
    display: "flex",
    alignItems: "center",
    gap: "4px",
    fontSize: "12px",
    color: tokens.colorNeutralForeground2,
  },
  workshopDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: 1,
  },
  workshopTitle: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  workshopDescription: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginBottom: "4px",
  },
  mentorName: {
    fontSize: "14px",
    color: tokens.colorBrandForeground1,
  },
  pastWorkshops: {
    marginTop: "40px",
  },
  pastWorkshopsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "16px",
  },
  pastWorkshopCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    height: "120px",
  },
})

const Training = ({ projectId }: { projectId: string }) => {
  const styles = useStyles()
  const [activeDay, setActiveDay] = useState(11)
  const [selectedDay, setSelectedDay] = useState(26)
  const [sessions, setSessions] = useState<Session[]>([])

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const novemberDays = Array.from({ length: 30 }, (_, i) => i + 1)
  const nextMonthDays = Array.from({ length: 5 }, (_, i) => i + 1)
  const prevMonthDays = Array.from({ length: 2 }, (_, i) => i + 28)

  const calendarDays = [...prevMonthDays, ...novemberDays, ...nextMonthDays]

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const data = await getProjectSessions(projectId)
        setSessions(data)
      } catch (error) {
        console.error("Failed to fetch sessions:", error)
      }
    }
    fetchSessions()
  }, [projectId])

  const currentDate = new Date("2025-05-23")
  const upcomingWorkshops = sessions
    .filter((session) => new Date(session.date) >= currentDate)
    .map((session) => ({
      date: new Date(session.date).toLocaleDateString("en-US", { month: "long", day: "numeric" }),
      time: "9:00 AM to 5:00 PM", // Placeholder, adjust based on API data
      location: "ESI SBA Room 04", // Placeholder
      title: `Session ${session.id}`,
      description: session.feedbacks?.[0]?.text || "No description available",
      mentor: session.feedbacks?.[0]?.author || "@mentor_name",
    }))

  const pastWorkshops = sessions
    .filter((session) => new Date(session.date) < currentDate)

  return (
    <div className={styles.root}>
      <div className={styles.mainContent}>
        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Training</h1>
          <p className={styles.pageSubtitle}>Attend workshops to learn, grow, and advance.</p>

          <h2 className={styles.sectionTitle}>Upcoming Workshops ({upcomingWorkshops.length})</h2>

          <div className={styles.calendarContainer}>
            <div className={styles.calendar}>
              <div className={styles.calendarHeader}>
                <span className={styles.calendarMonth}>November</span>
                <div className={styles.calendarControls}>
                  <Button appearance="subtle" icon={<ChevronUp20Regular />} size="small" />
                  <Button appearance="subtle" icon={<ChevronDown20Regular />} size="small" />
                </div>
              </div>

              <div className={styles.calendarGrid}>
                {days.map((day) => (
                  <div key={day} className={styles.calendarDayHeader}>
                    {day}
                  </div>
                ))}

                {calendarDays.map((day, index) => {
                  const isCurrentMonth = index >= 2 && index < 32
                  const isActive = isCurrentMonth && day === activeDay
                  const isSelected = isCurrentMonth && day === selectedDay

                  return (
                    <div
                      key={`${index}-${day}`}
                      className={`${styles.calendarDay} ${isActive ? styles.calendarDayActive : ""} ${
                        isSelected ? styles.calendarDaySelected : ""
                      }`}
                      style={{
                        color: isCurrentMonth ? undefined : tokens.colorNeutralForeground3,
                        cursor: isCurrentMonth ? "pointer" : "default",
                      }}
                      onClick={() => isCurrentMonth && setActiveDay(day)}
                    >
                      {day}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className={styles.workshopList}>
              {upcomingWorkshops.map((workshop, index) => (
                <div key={index} className={styles.workshopItem}>
                  <div className={styles.workshopInfo}>
                    <div className={styles.workshopDate}>
                      <div className={styles.workshopDateTitle}>{workshop.date}</div>
                      <div className={styles.workshopMeta}>
                        <Clock20Regular />
                        <span>{workshop.time}</span>
                      </div>
                      <div className={styles.workshopMeta}>
                        <Map20Regular />
                        <span>{workshop.location}</span>
                      </div>
                    </div>

                    <div className={styles.workshopDetails}>
                      <div className={styles.workshopTitle}>{workshop.title}</div>
                      <div className={styles.workshopDescription}>{workshop.description}</div>
                      <div className={styles.mentorName}>{workshop.mentor}</div>
                    </div>
                  </div>

                  <ChevronRight20Regular />
                </div>
              ))}
            </div>
          </div>

          <div className={styles.pastWorkshops}>
            <h2 className={styles.sectionTitle}>Past Workshops ({pastWorkshops.length})</h2>
            <div className={styles.pastWorkshopsGrid}>
              {pastWorkshops.map((session, index) => (
                <div key={index} className={styles.pastWorkshopCard}></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Training