import { makeStyles, tokens, Text, Image, mergeClasses } from '@fluentui/react-components';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo Image.svg';
import { PersonRegular, BookRegular } from '@fluentui/react-icons';
import { useTheme } from "../ThemeContext"
const useStyles = makeStyles({
  background: {
    backgroundColor: tokens.colorNeutralBackground2,
    height: '100vh',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: tokens.colorNeutralBackground1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '2rem',
    padding: '2rem',
    paddingTop: '2.5rem',
    paddingBottom: '3rem',
    position: 'relative',
    borderRadius: '1rem',
    width: '450px',
    maxHeight: '90vh',
    minHeight: '400px', 
    boxShadow: tokens.shadow8, 
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
  },
  title: {
    fontSize: tokens.fontSizeHero800,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: '1.2',
  },
  text: {
    color: tokens.colorNeutralForeground4,
    fontWeight: tokens.fontWeightSemibold,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    padding: '12px',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightSemibold,
    fontSize: tokens.fontSizeBase400,
    color: tokens.colorNeutralForegroundOnBrand,
    cursor: 'pointer',
    textDecoration: 'none',
    textAlign: 'center',
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
      color: tokens.colorNeutralForegroundOnBrand,
    },
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    width: '100%',
  },
  logo:{
    width: '50px',
    height: 'auto',
    marginBottom: '1rem',
  },
  logoDark: {
    filter: 'brightness(0) invert(1)', 
  },
});

const SignUpSelection = () => {
  const classes = useStyles();
  const { isDarkMode } = useTheme();
  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <Image src={logo} alt="Logo" className={mergeClasses(classes.logo, isDarkMode && classes.logoDark)} />
        <div className={classes.header}>
          <Text className={classes.title} as="h2">
            Choose Your Role
          </Text>
          <Text className={classes.text}>
            Select your role to continue with the signup process.
          </Text>
        </div>

        <div className={classes.buttonContainer}>

        <Link to="/signup/student" className={classes.button}>
          <BookRegular style={{ marginRight: '8px' }} /> Student
        </Link>
        <Link to="/signup/professor" className={classes.button}>
          <PersonRegular style={{ marginRight: '8px' }} /> Professor
        </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpSelection;