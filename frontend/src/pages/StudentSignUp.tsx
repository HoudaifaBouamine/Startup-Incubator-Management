import { makeStyles, mergeClasses, tokens, Button, Text } from '@fluentui/react-components';
import logo from '../assets/Logo Image.svg';
import { Link } from 'react-router-dom';
import Input from './components/Input';

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
    alignItems: 'flex-start',
    gap: '2rem',
    padding: '2rem',
    paddingTop: '2.5rem',
    position: 'relative',
    borderRadius: '1rem',
    overflow: 'hidden',
    width: '450px',
    maxHeight: '90vh',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  nameInputs: {
    display: 'flex',
    gap: '1.5rem',
    width: '100%',
  },
  title: {
    fontSize: tokens.fontSizeHero900,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: '1.2',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: tokens.colorBrandBackground,
    borderRadius: tokens.borderRadiusMedium,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForegroundOnBrand,
    cursor: 'pointer',
    ":hover": {
      backgroundColor: tokens.colorBrandBackground3Static,
    },
  },
  text: {
    color: tokens.colorNeutralForeground4,
    fontWeight: tokens.fontWeightSemibold,
  },
  textSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  text_link: {
    fontSize: tokens.fontSizeBase400,
  },
  link: {
    color: tokens.colorBrandForeground1,
    ':hover': {
      color: tokens.colorNeutralForeground1,
    },
  },
});

import { useState } from 'react';

const StudentSignUp = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <div className={classes.header}>
          <div>
            <img src={logo} alt="Logo" />
          </div>
          <Text as="h1" className={classes.title}>
            Create Your Student Account
          </Text>
          <Text className={classes.text}>
            Join the ESI SBA incubator platform and start your journey.
          </Text>
          <Input
            label="First Name"
            placeholder="Riad"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

        <div className={classes.nameInputs}>
          <Input
            label="First Name"
            placeholder="Riad"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
          <Input
            label="Last Name"
            placeholder="Mohamed"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            label="Last Name"
            placeholder="Mohamed"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <Input
          label="Email"
          placeholder="m.riad@esi-sba.dz"
          value=""
          onChange={() => {}}
        />

        <Button className={classes.button}>Sign Up</Button>

        <div className={classes.textSection}>
          <Text className={mergeClasses(classes.text, classes.text_link)}>
            Already have an account?{' '}
            <Link to="/login" className={classes.link}>
              Log in
            </Link>
          </Text>
          <Text className={classes.text}>
            By signing up, you agree to our Terms & Privacy Policy.
          </Text>
        </div>
      </div>
    </div>
  </div>
  );
};

export default StudentSignUp;