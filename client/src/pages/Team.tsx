import { useState } from 'react';
import { makeStyles, tokens, Button, Checkbox, Text, Image, Input } from '@fluentui/react-components';
import { MoreHorizontal20Regular, Dismiss20Regular, Copy20Regular, Share20Regular } from '@fluentui/react-icons';

import profilePicture from '../../src/assets/Profile Picture.jpg';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    height: '100vh',
    backgroundColor: tokens.colorNeutralBackground2,
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
  },
  content: {
    padding: '2rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '2rem',
  },
  headerSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
  },
  subtext: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    marginTop: '0.5rem',
  },
  inviteButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: '600',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  listHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    fontSize: '12px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground2,
  },
  listItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '4px',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  checkbox: {
    marginRight: '1rem',
  },
  profileWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    flex: 1,
  },
  profilePicture: {
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    objectFit: 'cover',
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    backgroundColor: tokens.colorStatusSuccessBackground3,
    border: `2px solid ${tokens.colorNeutralBackground1}`,
  },
  name: {
    fontSize: '14px',
    fontWeight: '500',
    color: tokens.colorNeutralForeground1,
  },
  lastActive: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    flex: 1,
  },
  role: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    flex: 1,
  },
  menuButton: {
    background: 'transparent',
    border: 'none',
    color: tokens.colorNeutralForeground2,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3,
      borderRadius: '4px',
    },
  },
  // Modal styles
  modalBackdrop: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modalSurface: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '8px',
    padding: '1.5rem',
    width: '400px',
    maxWidth: '90vw',
    boxShadow: tokens.shadow16,
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  modalTitle: {
    fontSize: '18px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
  },
  closeButton: {
    background: 'transparent',
    border: 'none',
    color: tokens.colorNeutralForeground2,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3,
      borderRadius: '4px',
    },
  },
  modalSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    marginBottom: '1.5rem',
  },
  modalSectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground2,
    textTransform: 'uppercase',
  },
  emailInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  emailInput: {
    flex: 1,
    backgroundColor: tokens.colorNeutralBackground3,
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    color: tokens.colorNeutralForeground4,
  },
  sendInviteButton: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: '600',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
  memberItem: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0.5rem 0',
  },
  memberInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  },
  memberName: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground1,
  },
  memberEmail: {
    fontSize: '12px',
    color: tokens.colorNeutralForeground2,
  },
  roleSelect: {
    backgroundColor: tokens.colorNeutralBackground3,
    border: 'none',
    borderRadius: '4px',
    padding: '0.25rem 0.5rem',
    color: tokens.colorNeutralForeground1,
    fontSize: '14px',
  },
  inviteLinkWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    backgroundColor: tokens.colorNeutralBackground3,
    padding: '0.5rem 1rem',
    borderRadius: '4px',
  },
  inviteLink: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  copyButton: {
    background: 'transparent',
    border: 'none',
    color: tokens.colorNeutralForeground2,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground4,
      borderRadius: '4px',
    },
  },
  shareButton: {
    background: 'transparent',
    border: 'none',
    color: tokens.colorNeutralForeground2,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground4,
      borderRadius: '4px',
    },
  },
});

const Team = () => {
  const styles = useStyles();
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState('');

  const members = [
    { name: 'Arlene McCoy', lastActive: 'Yesterday', role: 'Product management', isOnline: false, isOwner: true },
    { name: 'Arlene McCoy', lastActive: 'Yesterday', role: 'Product management', isOnline: true },
    { name: 'Arlene McCoy', lastActive: 'Yesterday', role: 'Product management', isOnline: true },
    { name: 'Arlene McCoy', lastActive: 'Yesterday', role: 'Product management', isOnline: true },
    { name: 'Arlene McCoy', lastActive: 'Yesterday', role: 'Product management', isOnline: true },
  ];

  const mentors = [
    { name: 'Arlene McCoy', lastActive: 'Yesterday', role: 'Product management', isOnline: true },
    { name: 'Arlene McCoy', lastActive: 'Yesterday', role: 'Product management', isOnline: true },
  ];

  const projectMembers = [
    { name: 'User name', email: 'email@esi-sba.dz', role: 'Founder' },
    { name: 'User name', email: 'email@esi-sba.dz', role: 'Co-Founder' },
    { name: 'User name', email: 'email@esi-sba.dz', role: 'Tech Lead' },
  ];

  const handleCheckboxChange = (name: string) => {
    setSelectedMembers((prev) =>
      prev.includes(name) ? prev.filter((item) => item !== name) : [...prev, name]
    );
  };

  const handleInvite = () => {
    if (email) {
      console.log(`Inviting ${email}`);
      setEmail('');
      setIsModalOpen(false);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://www.starthub.com/user/example@');
    console.log('Link copied to clipboard');
  };

  return (
    <div className={styles.root}>
      <div className={styles.mainContent}>
        <div className={styles.content}>
          <div className={styles.headerSection}>
            <div>
              <Text className={styles.title}>My Team</Text>
              <Text className={styles.subtext}>Upload your file before the deadline to submit for review</Text>
            </div>
            <Button
              className={styles.inviteButton}
              icon={<MoreHorizontal20Regular />}
              onClick={() => setIsModalOpen(true)}
            >
              Invite Member
            </Button>
          </div>

          <div className={styles.section}>
            <Text className={styles.sectionTitle}>Members ({members.length})</Text>
            <div className={styles.list}>
              <div className={styles.listHeader}>
                <div className={styles.checkbox}></div>
                <Text style={{ flex: 1 }}>Owner</Text>
                <Text style={{ flex: 1 }}>Last active time</Text>
                <Text style={{ flex: 1 }}>Role</Text>
                <div style={{ width: '24px' }}></div>
              </div>
              {members.map((member, index) => (
                <div key={index} className={styles.listItem}>
                  <Checkbox
                    className={styles.checkbox}
                    checked={selectedMembers.includes(member.name)}
                    onChange={() => handleCheckboxChange(member.name)}
                  />
                  <div className={styles.profileWrapper}>
                    <div style={{ position: 'relative' }}>
                      <Image
                        src={profilePicture}
                        alt={member.name}
                        className={styles.profilePicture}
                      />
                      {member.isOnline && <div className={styles.onlineIndicator}></div>}
                    </div>
                    <Text className={styles.name}>{member.name}</Text>
                  </div>
                  <Text className={styles.lastActive}>{member.lastActive}</Text>
                  <Text className={styles.role}>{member.role}</Text>
                  <Button className={styles.menuButton}>
                    <MoreHorizontal20Regular />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.section}>
            <Text className={styles.sectionTitle}>Mentors ({mentors.length})</Text>
            <div className={styles.list}>
              {mentors.map((mentor, index) => (
                <div key={index} className={styles.listItem}>
                  <Checkbox
                    className={styles.checkbox}
                    checked={selectedMembers.includes(mentor.name)}
                    onChange={() => handleCheckboxChange(mentor.name)}
                  />
                  <div className={styles.profileWrapper}>
                    <div style={{ position: 'relative' }}>
                      <Image
                        src={profilePicture}
                        alt={mentor.name}
                        className={styles.profilePicture}
                      />
                      {mentor.isOnline && <div className={styles.onlineIndicator}></div>}
                    </div>
                    <Text className={styles.name}>{mentor.name}</Text>
                  </div>
                  <Text className={styles.lastActive}>{mentor.lastActive}</Text>
                  <Text className={styles.role}>{mentor.role}</Text>
                  <Button className={styles.menuButton}>
                    <MoreHorizontal20Regular />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalSurface}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
          >
            <div className={styles.modalHeader}>
              <Text className={styles.modalTitle}>Invite a New Member</Text>
              <Button
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
                aria-label="Close dialog"
              >
                <Dismiss20Regular />
              </Button>
            </div>
            <div>
              <div className={styles.modalSection}>
                <Text className={styles.modalSectionTitle}>Invite via Email</Text>
                <div className={styles.emailInputWrapper}>
                  <Input
                    className={styles.emailInput}
                    placeholder="example@esi-sba.dz"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button className={styles.sendInviteButton} onClick={handleInvite}>
                    Send Invite
                  </Button>
                </div>
              </div>

              <div className={styles.modalSection}>
                <Text className={styles.modalSectionTitle}>Project Members</Text>
                {projectMembers.map((member, index) => (
                  <div key={index} className={styles.memberItem}>
                    <div className={styles.memberInfo}>
                      <Image
                        src={profilePicture}
                        alt={member.name}
                        className={styles.profilePicture}
                      />
                      <div>
                        <Text className={styles.memberName}>{member.name}</Text>
                        <Text className={styles.memberEmail}>{member.email}</Text>
                      </div>
                    </div>
                    <select className={styles.roleSelect} defaultValue={member.role}>
                      <option value="Founder">Founder</option>
                      <option value="Co-Founder">Co-Founder</option>
                      <option value="Tech Lead">Tech Lead</option>
                    </select>
                  </div>
                ))}
              </div>

              <div className={styles.modalSection}>
                <Text className={styles.modalSectionTitle}>Invite via Link</Text>
                <div className={styles.inviteLinkWrapper}>
                  <Text className={styles.inviteLink}>https://www.starthub.com/user/example@</Text>
                  <Button className={styles.copyButton} onClick={handleCopyLink}>
                    <Copy20Regular />
                  </Button>
                  <Button className={styles.shareButton}>
                    <Share20Regular />
                  </Button>
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