import { useState } from 'react';
import { makeStyles, tokens, Button, ProgressBar, TabList, Tab } from '@fluentui/react-components';
import { ChevronRightRegular, DocumentRegular, CommentRegular, ChevronDownRegular, Folder20Filled, Folder20Regular, Comment20Filled, Comment20Regular, CommentDismiss24Regular } from '@fluentui/react-icons';



const useStyles = makeStyles({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  },
  contentWrapper: {
    display: 'flex',
    flex: 1,
    height: '100%',
    backgroundColor: tokens.colorNeutralBackground2,
    overflow: 'hidden',
    alignItems: 'stretch'
  },
  mainContent: {
    flex: 1,
    display: 'flex',
    padding: '2rem',
    gap: '2rem',
    overflow: 'auto',
    height: '100%',
  },
  programSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    flex: '1 1 33%'
  },
  programHeader: {
    fontSize: '24px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1
  },
  programSubtext: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2
  },
  progressWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  progressWrapper2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
    margin: '1rem 0',
  },
  progressText: {
    fontSize: '14px',
    color: tokens.colorBrandForeground1
  },
  progressText2: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground1
  },
  milestoneSection: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '8px',
    padding: '1rem'
  },
  milestoneHeader: {
    fontSize: '18px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
    marginBottom: '1rem'
  },
  milestoneItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '0.5rem',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground4
    }
  },
  milestoneHeaderContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  milestoneText: {
    flex: 1,
    fontSize: '14px',
    color: tokens.colorNeutralForeground1
  },
  documentIcon: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    marginTop: '0.5rem',
    marginLeft: '1.5rem',
    cursor: 'pointer',
    ':hover': {
      color: tokens.colorBrandForeground1
    }
  },
  activeMilestone: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground4
    }
  },
  deliverablesSection: {
    flex: '2 1 66%',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.25rem'
  },
  deliverableHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  deliverableTitle: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: '600',
    color: tokens.colorNeutralForeground1
  },
  deliverableTitle2: {
    fontSize: '18px',
    fontWeight: '600',
    color: tokens.colorBrandForeground1
  },
  deliverableStats: {
    display: 'flex',
    gap: '1rem',
    margin: '0.5rem 0'
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: '14px',
    color: tokens.colorNeutralForeground2
  },
  deliverableCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '8px',
    padding: '1rem 1.5rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '1rem',
  },
  deliverableName: {
    fontSize: tokens.fontSizeBase500,
    fontWeight: '500',
    color: tokens.colorNeutralForeground1,
    marginBottom: '0.5rem'
  },
  deliverableSubtext: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    marginBottom: '0.5rem'
  },
  feedbackCard: {
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    display: 'flex',
    alignItems: 'center',
    gap: '1rem'
  },
  feedbackText: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2
  },
  status: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    border: `2px solid ${tokens.colorNeutralStroke2}`,
    position: 'relative',
    marginRight: '0.5rem',
    overflow: 'hidden'
  },
  statusFill: {
    position: 'absolute',
    top: 0,
    left: '0',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    border: `2px solid ${tokens.colorBrandForeground1}`,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    transform: 'rotate(-90deg)',
    transformOrigin: 'center'
  },
  statusBadge: {
    fontSize: '12px',
    padding: '4px 8px 4px 4px',
    borderRadius: '16px',
    lineHeight: '1',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    position: 'relative',
    gap: '4px',
    color: tokens.colorNeutralForeground2,
  },
  badgeCircle: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '16px',
    height: '16px',
    borderRadius: '50%',
    fontSize: '10px',
    backgroundColor: 'transparent',
  },
  notSubmittedBadge: {
    border: `1px solid ${tokens.colorBrandStroke1}`,
    color: tokens.colorBrandForeground1,
  },
  pendingBadge: {
    border: `1px solid ${tokens.colorNeutralForeground2}`,
    color: tokens.colorNeutralForeground2,
  },
  acceptedBadge: {
    border: `1px solid ${tokens.colorStatusSuccessForeground3}`,
    color: tokens.colorStatusSuccessForeground3,
  },
  nextPhaseButton: {
    alignSelf: 'flex-end',
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorNeutralForeground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2
    }
  },
  tabContainer: {
    marginBottom: '1rem'
  },
  divider: {
    backgroundColor: tokens.colorNeutralStroke2,
    width: '2px',
    margin: '0 1rem',
    height: '100%',
  },
  feedbackAvatar: {
    width: '24px',
    height: '24px',
    borderRadius: '50%',
    backgroundColor: tokens.colorNeutralBackground4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerCard: {
    display: 'flex',
    flexDirection: 'column',
    padding: '24px',
    backgroundColor: tokens.colorNeutralBackground1,
    position: 'relative',
  },
  thinProgressBar: {
    height: '4px',
    backgroundColor: tokens.colorNeutralBackground4,
    '& .fui-ProgressBar__bar': {
      backgroundColor: tokens.colorBrandForeground1
    },
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
  },
  delivrablesubTitle: {
    display: 'flex',
    gap: '24px',
    alignItems: 'center',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  activeTabIcon: {
    color: tokens.colorBrandForeground1,
  },
  feedbackCount: {
    fontSize: '12px',
    color: tokens.colorNeutralForeground2,
    marginLeft: '8px',
  },
  customBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    padding: '4px 8px 4px 4px',
    borderRadius: '16px',
    lineHeight: '1',
    borderWidth: '1px' as any,

  },
  nofeed: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  titlefeed: {
    fontSize: tokens.fontSizeBase600,
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
    marginBottom: '1rem',
  },
  nofeedWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '0.5rem'
  },
  nofeedWrapper2: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px',
    width: '70%',
    textAlign: 'center'

  },
  
});

const MyProgram = () => {
  const styles = useStyles();
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const [expandedMilestone, setExpandedMilestone] = useState(0);
  const [selectedMilestoneContent, setSelectedMilestoneContent] = useState<{ name: string; status: string }[] | null>(null);
  const [selectedMilestoneFeedbacks, setSelectedMilestoneFeedbacks] = useState<{ author: string; text: string }[] | null>(null);
  const [activeMilestoneName, setActiveMilestoneName] = useState('M1: Application & Selection');
  const [activeMilestoneNumber, setActiveMilestoneNumber] = useState(1);
  const [activeTab, setActiveTab] = useState('deliverables');
  const milestones = [
    {
      name: 'M1: Application & Selection',
      content: [
        { name: 'Those are Required documents', status: 'Not Submitted Yet' },
        { name: 'Submit your application form', status: 'Pending Review' },
        { name: 'Provide financial statements', status: 'Not Submitted Yet' },
        { name: 'Include team bios', status: 'Not Submitted Yet' }
      ],
      feedbacks: [
        { author: 'Primary string', text: 'Great progress so far. A few adjustments are needed to refine the submission.' },
        { author: 'Secondary string', text: 'The prototype looks good' }
      ],
      progress: 0.75
    },
    {
      name: 'M2: Planning & Budgeting',
      content: [
        { name: 'Upload project proposal', status: 'Not Submitted Yet' },
        { name: 'Submit budget plan', status: 'Pending Review' },
        { name: 'Provide team roles', status: 'Not Submitted Yet' },
        { name: 'Include references', status: 'Not Submitted Yet' }
      ],
      feedbacks: [],
      progress: 0.5
    },
    {
      name: 'M3: Application & Selection',
      content: [
        { name: 'Upload project proposal', status: 'Not Submitted Yet' },
        { name: 'Submit budget plan', status: 'Pending Review' },
        { name: 'Provide team roles', status: 'Not Submitted Yet' },
        { name: 'Include references', status: 'Not Submitted Yet' }
      ],
      feedbacks: [
        { author: 'Primary string', text: 'Please clarify the team roles.' },
        { author: 'Secondary string', text: 'References are well-structured.' },
        { author: 'Tertiary string', text: 'Timeline needs to be more detailed.' }
      ],
      progress: 0.5
    },
    {
      name: 'M4: Application & Selection',
      content: [
        { name: 'Submit legal documents', status: 'Not Submitted Yet' },
        { name: 'Provide market analysis', status: 'Not Submitted Yet' },
        { name: 'Include project timeline', status: 'Pending Review' },
        { name: 'Upload pitch deck', status: 'Not Submitted Yet' }
      ],
      feedbacks: [
        { author: 'Primary string', text: 'Market analysis needs more depth.' }
      ],
      progress: 0.25
    },
    {
      name: 'M5: Application & Selection',
      content: [
        { name: 'Submit team resumes', status: 'Not Submitted Yet' },
        { name: 'Provide funding history', status: 'Not Submitted Yet' },
        { name: 'Upload business plan', status: 'Not Submitted Yet' },
        { name: 'Prototype Details', status: 'Accepted' }
      ],
      feedbacks: [],
      progress: 0.1
    },
  ];

  const defaultContent = milestones[0].content;
  const defaultFeedbacks = milestones[0].feedbacks;

  const toggleMilestone = (index: number) => {
    setExpandedMilestone(expandedMilestone === index ? -1 : index);
    setSelectedMilestone(index);
  };

  const handleContentClick = (milestoneIndex: number) => {
    setSelectedMilestoneContent(milestones[milestoneIndex].content);
    setSelectedMilestoneFeedbacks(milestones[milestoneIndex].feedbacks);
    setActiveMilestoneName(milestones[milestoneIndex].name);
    setActiveMilestoneNumber(milestoneIndex + 1);
    setActiveTab('deliverables');
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const overallProgress = milestones.reduce((acc, milestone) => acc + milestone.progress, 0) / milestones.length;

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.contentWrapper}>
          <div className={styles.mainContent}>
            <div className={styles.programSection}>
              <h1 className={styles.programHeader}>Incubation Program</h1>
              <p className={styles.programSubtext}>Upload your file before the deadline to submit for review</p>
              <div className={styles.progressWrapper}>
                <div className={styles.progressWrapper2}>
                  <div className={styles.progressText}>{Math.round(overallProgress * 100)}% Progress</div>
                  <div className={styles.progressText2}>{milestones.filter(m => m.progress < 1).length} Milestones to complete</div>
                </div>
                <ProgressBar value={overallProgress} thickness="large" color="brand" />
              </div>
              <div className={styles.milestoneSection}>
                <h2 className={styles.milestoneHeader}>Milestones</h2>
                {milestones.map((milestone, index) => (
                  <div key={index}>
                    <div
                      className={`${styles.milestoneItem} ${selectedMilestone === index ? styles.activeMilestone : ''}`}
                      onClick={() => toggleMilestone(index)}
                    >
                      <div className={styles.milestoneHeaderContent}>
                        <span className={styles.milestoneText}>
                          {milestone.name}

                        </span>
                        <div className={styles.status}>
                          <div
                            className={styles.statusFill}
                            style={{
                              borderLeftColor: milestone.progress >= 0.25 ? tokens.colorBrandForeground1 : 'transparent',
                              borderBottomColor: milestone.progress >= 0.5 ? tokens.colorBrandForeground1 : 'transparent',
                              borderRightColor: milestone.progress >= 0.75 ? tokens.colorBrandForeground1 : 'transparent',
                              borderTopColor: milestone.progress >= 1 ? tokens.colorBrandForeground1 : 'transparent'
                            }}
                          />
                        </div>

                        {expandedMilestone === index ? <ChevronDownRegular /> : <ChevronRightRegular />}
                      </div>
                    </div>
                    {expandedMilestone === index && (
                      <div>
                        {milestone.content.map((item, idx) => (
                          <div
                            key={idx}
                            className={styles.documentIcon}
                            onClick={() => handleContentClick(index)}
                          >
                            <DocumentRegular />
                            <span>{item.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.divider} />
            <div className={styles.deliverablesSection}>
              <div className={styles.headerCard}>
                <div className={styles.deliverableHeader}>
                  <div className={styles.titleWrapper}>
                    <h2 className={styles.deliverableTitle2}>Milestone {activeMilestoneNumber} of {milestones.length}</h2>
                    <h3 className={styles.deliverableTitle}>{activeMilestoneName}</h3>
                  </div>
                  <Button className={styles.nextPhaseButton}>Next Phase</Button>
                </div>
                <ProgressBar
                  value={0.6}
                  thickness="medium"
                  className={styles.thinProgressBar}
                />
              </div>
              <div className={styles.tabContainer}>
                <TabList
                  defaultSelectedValue="deliverables"
                  selectedValue={activeTab}
                  onTabSelect={(_event: any, data: { value: string }) => handleTabChange(data.value)}
                >
                  <Tab value="deliverables">
                    <div className={styles.statItem}>
                      {activeTab === 'deliverables' ? (
                        <Folder20Filled className={styles.activeTabIcon} />
                      ) : (
                        <Folder20Regular />
                      )}
                      <span>Deliverables ({selectedMilestoneContent ? selectedMilestoneContent.length : defaultContent.length})</span>
                    </div>
                  </Tab>
                  <Tab value="feedbacks">
                    <div className={styles.statItem}>
                      {activeTab === 'feedbacks' ? (
                        <Comment20Filled className={styles.activeTabIcon} />
                      ) : (
                        <Comment20Regular />
                      )}
                      <span>Feedbacks ({selectedMilestoneFeedbacks ? selectedMilestoneFeedbacks.length : defaultFeedbacks.length})</span>
                    </div>
                  </Tab>
                </TabList>
              </div>
              {activeTab === 'deliverables' ? (
                (selectedMilestoneContent || defaultContent).map((item, index) => (
                  <div key={index} className={styles.deliverableCard}>
                    <div>
                      <div className={styles.deliverableHeader}>
                        <div className={styles.delivrablesubTitle}>
                          <h4 className={styles.deliverableName}>{item.name}</h4>
                          <div
                            className={`${styles.customBadge} ${item.status === 'Pending Review' ? styles.pendingBadge :
                              item.status === 'Accepted' ? styles.acceptedBadge :
                                styles.notSubmittedBadge
                              }`}
                          >
                            <span className={styles.badgeCircle}>O</span>
                            {item.status}
                          </div>
                        </div>
                      </div>
                      <p className={styles.deliverableSubtext}>Upload your file before the deadline to submit for review</p>
                    </div>
                  </div>
                ))
              ) : (
                (selectedMilestoneFeedbacks || defaultFeedbacks).length > 0 ? (
                  (selectedMilestoneFeedbacks || defaultFeedbacks).map((feedback, index) => (
                    <div key={index} className={styles.feedbackCard}>
                      <div className={styles.feedbackAvatar}>
                        <CommentRegular />
                      </div>
                      <div>
                        <h4 className={styles.deliverableName}>{feedback.author}</h4>
                        <p className={styles.feedbackText}>{feedback.text}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={styles.nofeed}>
                    <div className={styles.nofeedWrapper}>
                      <CommentDismiss24Regular />
                      <div className={styles.nofeedWrapper2}>

                        <h3 className={styles.titlefeed}>No Feedbacks Yet</h3>
                        <p className={styles.deliverableSubtext}>Once you submit your deliverable, your mentor will review it and leave feedback</p>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyProgram;