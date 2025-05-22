"use client"

import { useState } from "react"
import { makeStyles, tokens, Button } from "@fluentui/react-components"
import {
  ChevronRight20Regular,
  Clock20Regular,
  Map20Regular,
  ChevronDown20Regular,
  ChevronUp20Regular,
} from "@fluentui/react-icons"

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100vh",
    backgroundColor: tokens.colorNeutralBackground2,
  },
  sidebar: {
    width: "200px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRight: `1px solid ${tokens.colorNeutralStroke2}`,
    padding: "20px 0",
    display: "flex",
    flexDirection: "column",
  },
  sidebarLogo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "0 20px",
    marginBottom: "20px",
  },
  logoText: {
    fontSize: "16px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
  },
  sidebarItem: {
    display: "flex",
    alignItems: "center",
    padding: "10px 20px",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    cursor: "pointer",
    gap: "10px",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  sidebarItemActive: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderLeft: `3px solid ${tokens.colorBrandBackground}`,
    paddingLeft: "17px",
    fontWeight: "600",
  },
  sidebarIcon: {
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  mainContent: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    overflow: "auto",
  },
  header: {
    height: "64px",
    padding: "0 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    backgroundColor: tokens.colorNeutralBackground1,
  },
  searchContainer: {
    position: "relative",
    width: "400px",
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
    padding: "8px 12px 8px 40px",
    backgroundColor: tokens.colorNeutralBackground2,
    border: "none",
    borderRadius: "4px",
    fontSize: "14px",
  },
  headerActions: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  iconButton: {
    backgroundColor: "transparent",
    border: "none",
    color: tokens.colorNeutralForeground2,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "32px",
    height: "32px",
    borderRadius: "4px",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  avatar: {
    cursor: "pointer",
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

const Training = () => {
  const styles = useStyles()
  const [activeDay, setActiveDay] = useState(11)
  const [selectedDay, setSelectedDay] = useState(26)

  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
  const novemberDays = Array.from({ length: 30 }, (_, i) => i + 1)
  const nextMonthDays = Array.from({ length: 5 }, (_, i) => i + 1)
  const prevMonthDays = Array.from({ length: 2 }, (_, i) => i + 28)

  const calendarDays = [...prevMonthDays, ...novemberDays, ...nextMonthDays]

  const upcomingWorkshops = [
    {
      date: "August 17th",
      time: "9:00 AM to 5:00 PM",
      location: "ESI SBA Room 04",
      title: "Workshop title",
      description:
        'Come and be part of our session, "Future Innovations Unleashed," where we will explore groundbreaking concepts!',
      mentor: "@mentor_name",
    },
    {
      date: "August 17th",
      time: "9:00 AM to 5:00 PM",
      location: "ESI SBA Room 04",
      title: "Workshop title",
      description:
        'Come and be part of our session, "Future Innovations Unleashed," where we will explore groundbreaking concepts!',
      mentor: "@mentor_name",
    },
    {
      date: "August 17th",
      time: "9:00 AM to 5:00 PM",
      location: "ESI SBA Room 04",
      title: "Workshop title",
      description:
        'Come and be part of our session, "Future Innovations Unleashed," where we will explore groundbreaking concepts!',
      mentor: "@mentor_name",
    },
  ]

  return (
    <div className={styles.root}>

      <div className={styles.mainContent}>
       

        <div className={styles.content}>
          <h1 className={styles.pageTitle}>Training</h1>
          <p className={styles.pageSubtitle}>Attend workshops to learn, grow, and advance.</p>

          <h2 className={styles.sectionTitle}>Upcoming Workshops (2)</h2>

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
            <h2 className={styles.sectionTitle}>Past Workshops (7)</h2>
            <div className={styles.pastWorkshopsGrid}>
              {Array.from({ length: 3 }).map((_, index) => (
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
