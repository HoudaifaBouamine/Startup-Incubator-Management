"use client";

import { useState, useEffect } from "react";
import { makeStyles, tokens, Button, Checkbox, Input, Avatar } from "@fluentui/react-components";
import { MoreHorizontalRegular, CopyRegular, ShareRegular, PersonAddRegular } from "@fluentui/react-icons";
import { getProjectMembers, getProjectEncadrants, addMemberToProject } from "../../api/project-service";
import { ProjectMember } from "../types";

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
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    gap: "2rem",
  },
  headerSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  subtext: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
    marginTop: "0.5rem",
  },
  inviteButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: "600",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    ":hover": {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginBottom: "2rem",
  },
  sectionTitle: {
    fontSize: "18px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  table: {
    width: "100%",
    borderCollapse: "separate",
    borderSpacing: "0 4px",
  },
  tableHeader: {
    textAlign: "left",
    padding: "0.5rem 1rem",
    fontSize: "12px",
    fontWeight: "600",
    color: tokens.colorNeutralForeground2,
  },
  tableRow: {
    backgroundColor: tokens.colorNeutralBackground1,
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  tableCell: {
    padding: "0.75rem 1rem",
    fontSize: "14px",
    color: tokens.colorNeutralForeground1,
    verticalAlign: "middle",
  },
  checkboxCell: {
    width: "40px",
    padding: "0.5rem 1rem",
  },
  profileCell: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
  },
  avatar: {
    position: "relative",
  },
  name: {
    fontSize: "14px",
    fontWeight: "500",
    color: tokens.colorNeutralForeground1,
  },
  emailCell: {
    fontSize: "14px",
    color: tokens.colorNeutralForeground2,
  },
  actionsCell: {
    width: "40px",
    textAlign: "center",
  },
  menuButton: {
    background: "transparent",
    border: "none",
    color: tokens.colorNeutralForeground2,
    padding: "4px",
    ":hover": {
      backgroundColor: tokens.colorNeutralBackground3,
      borderRadius: "4px",
    },
  },
});

const Team = ({ projectId }: { projectId: string }) => {
  const styles = useStyles();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState<ProjectMember[]>([]);
  const [mentors, setMentors] = useState<ProjectMember[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const membersData = await getProjectMembers(projectId);
        const encadrantsData = await getProjectEncadrants(projectId);
        setMembers(membersData.relationData);
        setMentors(encadrantsData.relationData);
      } catch (error) {
        console.error("Failed to fetch project data:", (error as Error).message);
      }
    };
    if (projectId) fetchData();
  }, [projectId]);

  const handleCheckboxChange = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleInvite = async () => {
    if (!email || !projectId) return;
    try {
      await addMemberToProject(projectId, email);
      setEmail("");
      setIsModalOpen(false);
      const membersData = await getProjectMembers(projectId);
      setMembers(membersData.relationData);
    } catch (error) {
      console.error("Invite failed:", (error as Error).message);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://www.starthub.com/project/${projectId}`);
    console.log("Link copied to clipboard");
  };

  return (
    <div className={styles.root}>
      <div className={styles.mainContent}>
        <div className={styles.content}>
          <div className={styles.headerSection}>
            <div>
              <h1 className={styles.title}>My Team</h1>
              <p className={styles.subtext}>Manage your project team members and mentors</p>
            </div>
            <Button
              className={styles.inviteButton}
              icon={<PersonAddRegular />}
              onClick={() => setIsModalOpen(true)}
            >
              Invite Member
            </Button>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Members ({members.length})</h2>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.tableHeader} style={{ width: "40px" }}>
                    <Checkbox />
                  </th>
                  <th className={styles.tableHeader}>Name</th>
                  <th className={styles.tableHeader}>Email</th>
                  <th className={styles.tableHeader} style={{ width: "40px" }}></th>
                </tr>
              </thead>
              <tbody>
                {members.map((member) => (
                  <tr key={member.id} className={styles.tableRow}>
                    <td className={`${styles.tableCell} ${styles.checkboxCell}`}>
                      <Checkbox
                        checked={selectedMembers.includes(member.id)}
                        onChange={() => handleCheckboxChange(member.id)}
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.profileCell}>
                        <div className={styles.avatar}>
                          <Avatar
                            name={`${member.firstName} ${member.lastName}`}
                            size={32}
                            color="colorful"
                          />
                        </div>
                        <span className={styles.name}>{`${member.firstName} ${member.lastName}`}</span>
                      </div>
                    </td>
                    <td className={`${styles.tableCell} ${styles.emailCell}`}>{member.email}</td>
                    <td className={`${styles.tableCell} ${styles.actionsCell}`}>
                      <Button className={styles.menuButton} icon={<MoreHorizontalRegular />} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Mentors ({mentors.length})</h2>
            <table className={styles.table}>
              <tbody>
                {mentors.map((mentor) => (
                  <tr key={mentor.id} className={styles.tableRow}>
                    <td className={`${styles.tableCell} ${styles.checkboxCell}`}>
                      <Checkbox
                        checked={selectedMembers.includes(mentor.id)}
                        onChange={() => handleCheckboxChange(mentor.id)}
                      />
                    </td>
                    <td className={styles.tableCell}>
                      <div className={styles.profileCell}>
                        <div className={styles.avatar}>
                          <Avatar
                            name={`${mentor.firstName} ${mentor.lastName}`}
                            size={32}
                            color="colorful"
                          />
                        </div>
                        <span className={styles.name}>{`${mentor.firstName} ${mentor.lastName}`}</span>
                      </div>
                    </td>
                    <td className={`${styles.tableCell} ${styles.emailCell}`}>{mentor.email}</td>
                    <td className={`${styles.tableCell} ${styles.actionsCell}`}>
                      <Button className={styles.menuButton} icon={<MoreHorizontalRegular />} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: tokens.colorNeutralBackground1,
              borderRadius: "8px",
              padding: "1.5rem",
              width: "450px",
              maxWidth: "90vw",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.5rem",
              }}
            >
              <h2 style={{ margin: 0, fontSize: "18px", fontWeight: "600" }}>Invite a New Member</h2>
              <Button
                appearance="subtle"
                size="small"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close"
                icon={<span style={{ fontSize: "16px" }}>×</span>}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "0.75rem" }}>
                  Invite via Email
                </h3>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Input
                    style={{ flex: 1 }}
                    placeholder="example@esi-sba.dz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button
                    style={{
                      backgroundColor: tokens.colorBrandBackground,
                      color: tokens.colorNeutralForegroundOnBrand,
                      minWidth: "100px",
                    }}
                    onClick={handleInvite}
                  >
                    Send invite
                  </Button>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "0.75rem" }}>
                  Registered Users
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {members.map((user) => (
                    <div
                      key={user.id}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                        <div
                          style={{
                            width: "32px",
                            height: "32px",
                            borderRadius: "50%",
                            backgroundColor: tokens.colorNeutralBackground3,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <PersonAddRegular style={{ fontSize: "16px", color: tokens.colorNeutralForeground3 }} />
                        </div>
                        <div>
                          <div style={{ fontSize: "14px", fontWeight: "500" }}>
                            {`${user.firstName} ${user.lastName}`}
                          </div>
                          <div style={{ fontSize: "12px", color: tokens.colorNeutralForeground2 }}>
                            {user.email}
                          </div>
                        </div>
                      </div>
                      <Button
                        appearance="outline"
                        icon={<span>+</span>}
                        onClick={() => addMemberToProject(projectId, user.email)}
                      >
                        Invite
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: "14px", fontWeight: "600", marginBottom: "0.75rem" }}>
                  Invite via Link
                </h3>
                <div
                  style={{
                    display: "flex",
                    border: `1px solid ${tokens.colorNeutralStroke1}`,
                    borderRadius: "4px",
                    overflow: "hidden",
                  }}
                >
                  <input
                    style={{
                      flex: 1,
                      padding: "0.5rem 0.75rem",
                      border: "none",
                      outline: "none",
                      fontSize: "14px",
                    }}
                    value={`https://www.starthub.com/project/${projectId}`}
                    readOnly
                  />
                  <Button
                    appearance="subtle"
                    icon={<CopyRegular />}
                    onClick={handleCopyLink}
                    style={{ borderLeft: `1px solid ${tokens.colorNeutralStroke1}` }}
                  />
                  <Button
                    appearance="subtle"
                    icon={<ShareRegular />}
                    style={{ borderLeft: `1px solid ${tokens.colorNeutralStroke1}` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team;