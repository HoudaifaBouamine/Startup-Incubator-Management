import { useState } from 'react';
import { makeStyles, tokens, Button, Text, Textarea, ProgressBar, Radio, Dropdown, Option, RadioGroup, Label, Tag, Avatar, useId, Badge } from '@fluentui/react-components';
import { ArrowLeft32Filled, TargetArrow24Filled, Rocket24Regular, ClockRegular } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import Input from './components/Input';

interface FormData {
    startupName: string;
    industry: string;
    about: string;
    problem: string;
    solution: string;
    targetAudience: string;
    competitiveAdvantage: string;
    teamMembers: string[];
    mentors: string[];
    stage: string;
    motivation: string;
}

interface TempEmail {
    teamMember: string;
    mentor: string;
}

interface Errors {
    [key: string]: string | null | undefined;
}

const useStyles = makeStyles({
    background: {
        backgroundColor: tokens.colorNeutralBackground2,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
    },
    container: {
        backgroundColor: tokens.colorNeutralBackground1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.25rem',
        padding: '2rem',
        borderRadius: '1rem',
        width: '450px',
        minHeight: '60vh',
        maxHeight: '90vh',
        height: 'auto',
        boxShadow: tokens.shadow8,
        boxSizing: 'border-box',
        '@media (max-width: 768px)': {
            width: '80%', 
            padding: '1.5rem',
        },
        '@media (max-width: 480px)': {
            width: '100%',
            padding: '1rem',
            borderRadius: '0.5rem',
            maxHeight: '100vh',
        },
    },
    header: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        textAlign: 'center',
        width: '100%',
    },
    progressSection: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        gap: '1rem',
        '@media (max-width: 480px)': {
            flexDirection: 'column',
            gap: '0.5rem',
        },
    },
    title: {
        fontSize: '2.5rem',
        fontFamily: tokens.fontFamilyBase,
        fontWeight: tokens.fontWeightBold,
        color: tokens.colorNeutralForeground1,
        lineHeight: '1.1',
        '@media (max-width: 768px)': {
            fontSize: '2rem',
        },
        '@media (max-width: 480px)': {
            fontSize: '1.75rem',
        },
    },
    inputWrapper: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    labelWrapper: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.25rem',
    },
    button: {
        width: '100%',
        padding: '12px',
        backgroundColor: tokens.colorBrandBackground,
        borderRadius: tokens.borderRadiusMedium,
        fontWeight: tokens.fontWeightSemibold,
        color: tokens.colorNeutralForegroundOnBrand,
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        ':hover': {
            backgroundColor: tokens.colorBrandBackgroundHover,
        },
        '@media (max-width: 480px)': {
            padding: '10px',
            fontSize: tokens.fontSizeBase300,
        },
    },
    secondaryButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: tokens.colorNeutralBackground1,
        border: `1px solid ${tokens.colorNeutralStroke2}`,
        borderRadius: tokens.borderRadiusMedium,
        fontWeight: tokens.fontWeightRegular,
        color: tokens.colorNeutralForeground2,
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        ':hover': {
            backgroundColor: tokens.colorNeutralBackground3,
        },
        '@media (max-width: 480px)': {
            padding: '10px',
            fontSize: tokens.fontSizeBase300,
        },
    },
    text: {
        color: tokens.colorNeutralForeground4,
        fontWeight: tokens.fontWeightSemibold,
        fontSize: tokens.fontSizeBase400,
        '@media (max-width: 480px)': {
            fontSize: tokens.fontSizeBase300,
        },
    },
    textarea: {
        width: '100%',
        height: '130px',
        border: 'none',
        background: 'transparent',
        fontSize: tokens.fontSizeBase300,
        color: tokens.colorNeutralForeground1,
        padding: '0.5rem',
        outline: 'none',
        borderRadius: tokens.borderRadiusMedium,
        resize: 'none',
        '::placeholder': {
            color: tokens.colorNeutralForeground4,
        },
        '@media (max-width: 480px)': {
            height: '100px',
            fontSize: tokens.fontSizeBase200,
        },
    },
    Label: {
        fontWeight: tokens.fontWeightSemibold,
        flexShrink: 0,
        '@media (max-width: 480px)': {
            fontSize: tokens.fontSizeBase300,
        },
    },
    Dropdown: {
        display: 'grid',
        gridTemplateRows: 'repeat(1fr)',
        justifyItems: 'start',
        gap: '2px',
        width: '100%',
        '@media (max-width: 480px)': {
            fontSize: tokens.fontSizeBase200,
        },
    },
    errorText: {
        color: tokens.colorPaletteRedForeground1,
        fontSize: tokens.fontSizeBase200,
        padding: '0.25rem 0.5rem',
        borderRadius: tokens.borderRadiusSmall,
        backgroundColor: tokens.colorNeutralBackground1,
        boxShadow: tokens.shadow4,
        whiteSpace: 'nowrap',
    },
    radioGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        '@media (max-width: 480px)': {
            gap: '0.25rem',
        },
    },
    radio: {
        '&:checked + span': {
            backgroundColor: tokens.colorNeutralBackgroundDisabled,
            color: tokens.colorNeutralForeground1,
        },
        '&:checked + span::before': {
            backgroundColor: tokens.colorNeutralForeground1,
        },
        '&:checked + span::after': {
            backgroundColor: 'transparent',
        },
        '&:disabled': {
            opacity: 1,
            backgroundColor: tokens.colorNeutralBackgroundDisabled,
            color: tokens.colorNeutralForeground1,
        },
    },
   
    successMessage: {
        color: tokens.colorNeutralForeground3,
        fontSize: tokens.fontSizeBase300,
        fontWeight: tokens.fontWeightRegular,
        textAlign: 'center',
        lineHeight: '1.5',
        maxWidth: '80%',
        '@media (max-width: 480px)': {
            fontSize: tokens.fontSizeBase200,
        },
    },
    applicationInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '1rem',
        backgroundColor: tokens.colorNeutralBackground3,
        borderRadius: tokens.borderRadiusMedium,
        marginTop: '0.5rem',
        '@media (max-width: 480px)': {
            flexDirection: 'column',
            gap: '0.5rem',
            padding: '0.75rem',
        },
        '@media (min-width: 481px) and (max-width: 768px)': {
            padding: '1rem',
            gap: '1rem',
        },
    },
    applicationInfoText: {
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        '@media (max-width: 480px)': {
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        '@media (min-width: 481px) and (max-width: 768px)': {
            gap: '0.75rem',
        },
    },
    badge: {
        backgroundColor: tokens.colorNeutralBackground1,
        color: tokens.colorNeutralForeground4,
        border: `1px solid ${tokens.colorNeutralStroke1}`,
        padding: '10px',
        '@media (max-width: 480px)': {
            padding: '6px',
            fontSize: tokens.fontSizeBase200,
        },
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        width: '100%',
        '@media (max-width: 480px)': {
            gap: '0.75rem',
        },
        '@media (min-width: 481px) and (max-width: 768px)': {
            gap: '1.25rem',
        },
    },
    teamMembersGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gridTemplateRows: 'repeat(3, auto)',
        gap: '0.5rem',
        width: '100%',
        marginTop: '0.5rem',
        '@media (max-width: 480px)': {
            gridTemplateColumns: '1fr',
            gridTemplateRows: 'auto',
        },
        '@media (min-width: 481px) and (max-width: 768px)': {
            gap: '0.75rem',
        },
    },
    teamMemberTag: {
        width: '100',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        '@media (max-width: 480px)': {
            fontSize: tokens.fontSizeBase200,
        },
    },
});

const Application: React.FC = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [step, setStep] = useState<number>(1);
    const industryDropdownId = useId('industry-dropdown');
    const stageDropdownId = useId('stage-dropdown');

    const industryOptions: string[] = ['Technology', 'Healthcare', 'Finance', 'Education'];

    const [formData, setFormData] = useState<FormData>({
        startupName: '',
        industry: '',
        about: '',
        problem: '',
        solution: '',
        targetAudience: '',
        competitiveAdvantage: '',
        teamMembers: [],
        mentors: [],
        stage: '',
        motivation: '',
    });

    const [tempEmail, setTempEmail] = useState<TempEmail>({
        teamMember: '',
        mentor: '',
    });

    const [errors, setErrors] = useState<Errors>({});

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateStep = (): boolean => {
        const newErrors: Errors = {};
        switch (step) {
            case 1:
                if (!formData.startupName) newErrors.startupName = 'Startup name is required';
                if (!formData.about) newErrors.about = 'About is required';
                break;
            case 2:
                if (!formData.problem) newErrors.problem = 'Problem statement is required';
                if (!formData.solution) newErrors.solution = 'Solution description is required';
                break;
            case 3:
                if (!formData.targetAudience) newErrors.targetAudience = 'Target audience is required';
                if (!formData.competitiveAdvantage) newErrors.competitiveAdvantage = 'Competitive advantage is required';
                break;
            case 4:
                if (formData.teamMembers.length < 4) newErrors.teamMembers = 'At least 4 team members required';
                break;
            case 5:
                if (!formData.stage) newErrors.stage = 'Startup stage is required';
                break;
            case 6:
                if (!formData.motivation) newErrors.motivation = 'Motivation is required';
                break;
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setFormData({ ...formData, [field]: e.target.value });
        setErrors({ ...errors, [field]: null });
    };

    const handleDropdownChange = (field: keyof FormData) => (_e: any, data: { optionValue?: string }): void => {
        if (data.optionValue) {
            setFormData({ ...formData, [field]: data.optionValue });
            setErrors({ ...errors, [field]: null });
        }
    };

    const handleEmailInput = (field: keyof TempEmail) => (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTempEmail({ ...tempEmail, [field]: e.target.value });
        setErrors({ ...errors, [field]: null });
    };

    const handleRadioChange = (value: string) => {
        setFormData({ ...formData, stage: value });
        setErrors({ ...errors, stage: null });
    };

    const addTeamMember = (): void => {
        if (!emailRegex.test(tempEmail.teamMember)) {
            setErrors({ ...errors, teamMember: 'Invalid email format' });
            return;
        }
        if (tempEmail.teamMember && !formData.teamMembers.includes(tempEmail.teamMember)) {
            setFormData({ ...formData, teamMembers: [...formData.teamMembers, tempEmail.teamMember] });
            setTempEmail({ ...tempEmail, teamMember: '' });
            setErrors({ ...errors, teamMembers: null, teamMember: null });
        }
    };

    const addMentor = (): void => {
        if (!emailRegex.test(tempEmail.mentor)) {
            setErrors({ ...errors, mentor: 'Invalid email format' });
            return;
        }
        if (tempEmail.mentor && !formData.mentors.includes(tempEmail.mentor)) {
            setFormData({ ...formData, mentors: [...formData.mentors, tempEmail.mentor] });
            setTempEmail({ ...tempEmail, mentor: '' });
            setErrors({ ...errors, mentor: null });
        }
    };

    const handleTeamMemberKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addTeamMember();
        }
    };

    const handleMentorKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addMentor();
        }
    };

    const removeTeamMember = (email: string): void => {
        setFormData({ ...formData, teamMembers: formData.teamMembers.filter(member => member !== email) });
        setErrors({ ...errors, teamMembers: formData.teamMembers.length - 1 < 4 ? 'At least 4 team members required' : null });
    };

    const removeMentor = (email: string): void => {
        setFormData({ ...formData, mentors: formData.mentors.filter(mentor => mentor !== email) });
    };

    const nextStep = (): void => {
        if (validateStep()) {
            if (step < 7) {
                setStep(step + 1);
            }
        }
    };

    const prevStep = (): void => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate(-1);
        }
    };

    return (
        <div className={classes.background}>
            <div className={classes.container}>
                {step !== 7 && (
                    <div className={classes.progressSection}>
                        <ArrowLeft32Filled onClick={prevStep} style={{ cursor: 'pointer' }} />
                        <ProgressBar thickness="large" value={step / 6} />
                        <span>{step}/6</span>
                    </div>
                )}

                {step === 1 && (
                    <div style={{ alignSelf: 'flex-start', width: '100%' }}>
                        <div className={classes.header}>
                            <Text as="h1" className={classes.title}>Tell us about your startup</Text>
                            <Text className={classes.text}>Provide some basic details to get started.</Text>
                        </div>
                        <div className={classes.inputWrapper}>
                            <Input
                                label="Startup name"
                                placeholder="Starthub"
                                value={formData.startupName}
                                onChange={handleInputChange('startupName')}
                                errorMessage={errors.startupName ?? undefined}
                            />
                            <div className={classes.inputWrapper}>
                                <div className={classes.labelWrapper}>
                                    <Label className={classes.Label} htmlFor={industryDropdownId}>Industry</Label>
                                    {errors.industry && <Text className={classes.errorText}>{errors.industry}</Text>}
                                </div>
                                <Dropdown
                                    id={industryDropdownId}
                                    className={classes.Dropdown}
                                    placeholder="Select industry"
                                    onOptionSelect={handleDropdownChange('industry')}
                                    value={formData.industry}
                                >
                                    {industryOptions.map((option) => (
                                        <Option key={option} value={option}>
                                            {option}
                                        </Option>
                                    ))}
                                </Dropdown>
                            </div>
                            <div className={classes.inputWrapper}>
                                <div className={classes.labelWrapper}>
                                    <Label className={classes.Label}>About Startup</Label>
                                    {errors.about && <Text className={classes.errorText}>{errors.about}</Text>}
                                </div>
                                <Textarea
                                    placeholder="Briefly describe your startup’s vision and purpose."
                                    className={classes.textarea}
                                    value={formData.about}
                                    onChange={handleInputChange('about')}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div style={{ alignSelf: 'flex-start', width: '100%' }}>
                        <div className={classes.header}>
                            <Text as="h1" className={classes.title}>What problem are you solving?</Text>
                            <Text className={classes.text} style={{ marginBottom: '0.5rem' }}>Explain the challenge your startup addresses.</Text>
                        </div>
                        <div className={classes.inputWrapper}>
                            <div className={classes.inputWrapper}>
                                <div className={classes.labelWrapper}>
                                    <Label className={classes.Label}>Problem Statement</Label>
                                    {errors.problem && <Text className={classes.errorText}>{errors.problem}</Text>}
                                </div>
                                <Textarea
                                    placeholder="Describe the key problem your target audience faces."
                                    className={classes.textarea}
                                    value={formData.problem}
                                    onChange={handleInputChange('problem')}
                                />
                            </div>
                            <div className={classes.inputWrapper}>
                                <div className={classes.labelWrapper}>
                                    <Label className={classes.Label}>Solution Description</Label>
                                    {errors.solution && <Text className={classes.errorText}>{errors.solution}</Text>}
                                </div>
                                <Textarea
                                    placeholder="Explain how your startup solves this problem."
                                    className={classes.textarea}
                                    value={formData.solution}
                                    onChange={handleInputChange('solution')}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div style={{ alignSelf: 'flex-start', width: '100%' }}>
                        <div className={classes.header}>
                            <Text as="h1" className={classes.title}>Who are your customers?</Text>
                            <Text className={classes.text} style={{ marginBottom: '0.5rem' }}>Define your target audience.</Text>
                        </div>
                        <div className={classes.inputWrapper}>
                            <div className={classes.inputWrapper}>
                                <div className={classes.labelWrapper}>
                                    <Label className={classes.Label}>Target Audience</Label>
                                    {errors.targetAudience && <Text className={classes.errorText}>{errors.targetAudience}</Text>}
                                </div>
                                <Textarea
                                    placeholder="Describe your ideal customers and their characteristics."
                                    className={classes.textarea}
                                    value={formData.targetAudience}
                                    onChange={handleInputChange('targetAudience')}
                                />
                            </div>
                            <div className={classes.inputWrapper}>
                                <div className={classes.labelWrapper}>
                                    <Label className={classes.Label}>Competitive Advantage</Label>
                                    {errors.competitiveAdvantage && <Text className={classes.errorText}>{errors.competitiveAdvantage}</Text>}
                                </div>
                                <Textarea
                                    placeholder="Explain what makes your solution better than competitors."
                                    className={classes.textarea}
                                    value={formData.competitiveAdvantage}
                                    onChange={handleInputChange('competitiveAdvantage')}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 4 && (
                    <div style={{ alignSelf: 'flex-start', width: '100%' }}>
                        <div className={classes.header}>
                            <Text as="h1" className={classes.title}>Invite your team</Text>
                            <Text className={classes.text} style={{ marginBottom: '0.5rem' }}>Add your team members and mentors.</Text>
                        </div>
                        <div className={classes.inputWrapper}>
                            <Input
                                label="Team Members (4–6 members)"
                                placeholder="user@esi-sba.dz"
                                value={tempEmail.teamMember}
                                onChange={handleEmailInput('teamMember')}
                                onKeyDown={handleTeamMemberKeyPress}
                                errorMessage={(errors.teamMember || errors.teamMembers) ?? undefined}
                            />
                            {formData.teamMembers.length > 0 && (
                                <div className={classes.teamMembersGrid}>
                                    {formData.teamMembers.slice(0, 6).map(email => (
                                        <Tag
                                            key={email}
                                            dismissible
                                            dismissIcon={{ 'aria-label': 'remove' }}
                                            media={<Avatar name={email.split('@')[0]} />}
                                            onDismiss={() => removeTeamMember(email)}
                                            className={classes.teamMemberTag}
                                        >
                                            <Text style={{ fontSize: tokens.fontSizeBase100 }}>{email}</Text>
                                        </Tag>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div className={classes.inputWrapper}>
                            <Input
                                label="Mentors"
                                placeholder="user@esi-sba.dz"
                                value={tempEmail.mentor}
                                onChange={handleEmailInput('mentor')}
                                onKeyDown={handleMentorKeyPress}
                                errorMessage={errors.mentor ?? undefined}
                            />
                            {formData.mentors.length > 0 && (
                                <div className={classes.teamMembersGrid}>
                                    {formData.mentors.map(email => (
                                        <Tag
                                            key={email}
                                            dismissible
                                            dismissIcon={{ 'aria-label': 'remove' }}
                                            media={<Avatar name={email.split('@')[0]} />}
                                            onDismiss={() => removeMentor(email)}
                                            className={classes.teamMemberTag}
                                        >
                                            <Text style={{ fontSize: tokens.fontSizeBase100 }}>{email}</Text>
                                        </Tag>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div style={{ alignSelf: 'flex-start', width: '100%' }}>
                        <div className={classes.header}>
                            <Text as="h1" className={classes.title}>How far along is your startup?</Text>
                            <Text className={classes.text} style={{ marginBottom: '0.5rem' }}>Tell us about your current stage.</Text>
                        </div>
                        <div className={classes.inputWrapper}>
                            <div className={classes.inputWrapper}>
                                <div className={classes.labelWrapper}>
                                    <Label className={classes.Label} htmlFor={stageDropdownId} required>
                                        Startup Stage
                                    </Label>
                                    {errors.stage && <Text className={classes.errorText}>{errors.stage}</Text>}
                                </div>
                                <RadioGroup className={classes.radioGroup} value={formData.stage} onChange={(_, data) => handleRadioChange(data.value)} layout="vertical">
                                    <Radio value="Idea" label="I have just the idea" className={classes.radio} />
                                    <Radio value="Prototype" label="I have built a prototype" className={classes.radio} />
                                    <Radio value="MVP" label="I have an MVP ready" className={classes.radio} />
                                    <Radio value="Startup" label="I have launched my startup" className={classes.radio} />
                                </RadioGroup>
                            </div>
                        </div>
                    </div>
                )}

                {step === 6 && (
                    <div style={{ alignSelf: 'flex-start', width: '100%' }}>
                        <div className={classes.header}>
                            <Text as="h1" className={classes.title}>What motivates you to join the incubator</Text>
                            <Text className={classes.text} style={{ marginBottom: '0.5rem' }}>
                                Understanding your startup's current stage helps us tailor the incubator's support
                            </Text>
                        </div>
                        <div className={classes.inputWrapper}>
                            <div className={classes.inputWrapper}>
                                <div className={classes.labelWrapper}>
                                    <Label className={classes.Label}>Motivation</Label>
                                    {errors.motivation && <Text className={classes.errorText}>{errors.motivation}</Text>}
                                </div>
                                <Textarea
                                    placeholder="Share your motivation and what you hope to gain from this experience."
                                    className={classes.textarea}
                                    value={formData.motivation}
                                    onChange={handleInputChange('motivation')}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 7 && (
                    <div className={classes.wrapper}>
                        <TargetArrow24Filled  />
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                            <Text as="h1" className={classes.title} style={{ textAlign: 'center' }}>
                                Application Submitted!
                            </Text>
                            <Text className={classes.successMessage}>
                                Great job! Your application is now under review. We’ll notify you once a decision is made.
                            </Text>
                        </div>
                        <div className={classes.applicationInfo}>
                            <div className={classes.applicationInfoText}>
                                <Avatar icon={<Rocket24Regular />} />
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                                    <Text style={{ fontWeight: tokens.fontWeightSemibold }}>{formData.startupName || 'My Startup'}</Text>
                                    <Text style={{ fontSize: tokens.fontSizeBase300, color: tokens.colorNeutralForeground3 }}>{formData.industry || 'Industry'}</Text>
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', alignItems: 'flex-end' }}>
                                <Badge appearance="outline" className={classes.badge} icon={<ClockRegular aria-label="clock" />}>
                                    Pending
                                </Badge>
                                <Text className={classes.text} style={{ fontSize: tokens.fontSizeBase300, fontWeight: tokens.fontWeightRegular }}>
                                    Less than 24h
                                </Text>
                            </div>
                        </div>
                        <Button className={classes.button} onClick={() => navigate('/dashboard')}>
                            Go to Dashboard
                        </Button>
                        <Button className={classes.secondaryButton} onClick={() => navigate('/application-details')}>
                            View My Application
                        </Button>
                    </div>
                )}

                {step !== 7 && (
                    <Button className={classes.button} onClick={nextStep}>
                        {step === 6 ? 'Complete my application' : 'Proceed to the next step'}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default Application;