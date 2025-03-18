import { makeStyles, mergeClasses, tokens, Button, Input, Text, Image, MessageBar, MessageBarBody, MessageBarTitle } from '@fluentui/react-components';
import { useState, useRef, KeyboardEvent } from 'react';
import logo from '../assets/Logo Image.svg';

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
  title: {
    fontSize: tokens.fontSizeHero800,
    fontFamily: tokens.fontFamilyBase,
    fontWeight: tokens.fontWeightSemibold,
    color: tokens.colorNeutralForeground1,
    lineHeight: '1.2',
  },
  otpContainer: {
    display: 'flex',
    gap: '0px', // No gap between inputs for continuous look
  },
  otpInput: {
    width: '60px',
    height: '50px',
    textAlign: 'center',
    fontSize: tokens.fontSizeBase400,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    color: tokens.colorNeutralForeground1,
    outline: 'none',
    borderRadius: '0px',
  },
  firstOtpInput: {
    borderRadius: '10px 0 0 10px',
  },
  lastOtpInput: {
    borderRadius: '0 10px 10px 0',
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
  resendCode: {
    color: tokens.colorBrandBackground,
    fontWeight: tokens.fontWeightSemibold,
    cursor: 'pointer',
    ":hover": {
      textDecoration: 'underline',
    }
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
  messageBox: {
    position: 'absolute',
    bottom: '-75px',
    left: '50%',
    transform: 'translateX(-50%)',
    transitionDuration: '0.3s',
    width: '300px',
  },
});

const Otp: React.FC = () => {
  const classes = useStyles();
  const [otp, setOtp] = useState<string>('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'warning' | null, message: React.ReactNode } | null>(null);

  const handleChange = (index: number, value: string, event?: React.KeyboardEvent<HTMLInputElement>) => {
    if (!/^[0-9]?$/.test(value)) return;
  
    const newOtp = otp.slice(0, index) + value + otp.slice(index + 1);
    setOtp(newOtp);
  
    if (event?.key === "Enter") {
      handleVerify();
      return;
    }
  
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleVerify = () => {
    if (otp.length < 6) {
      setAlert({ type: 'error', message: '' });
    } else {
      setAlert({ 
        type: 'success', 
        message: (
          <>
            Your email has been successfully verified.
          </>
        ) 
      });
    }
  };

  return (
    <div className={classes.background}>
      <div className={classes.container}>
        <Image src={logo} alt="Logo" />
        <div className={classes.header}>
          <Text className={classes.title} as="h2">Verify Your Email</Text>
          <Text className={classes.text}>
            We’ve sent a 6-digit code to your.email@esi-sba.dz,<br />
            enter the code below to verify your account.
          </Text>
        </div>
        
        <div className={classes.otpContainer}>
          {Array.from({ length: 6 }, (_, index) => (
            <Input
              key={index}
              ref={(el) => (inputRefs.current[index] = el)}
              className={mergeClasses(
                classes.otpInput,
                index === 0 && classes.firstOtpInput,
                index === 5 && classes.lastOtpInput
              )}
              type="text"
              maxLength={1}
              inputMode="numeric"
              value={otp[index] || ''}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement> | undefined) => handleChange(index, otp[index] || '', e)}
            />
          ))}
        </div>

        <Button className={classes.button} onClick={handleVerify}>Verify</Button>

        <div className={classes.textSection}>
          <Text className={classes.text}>
            Didn't receive code?{' '}
            <Text as="span" className={classes.resendCode}>Resend Code</Text>
          </Text>
          <Text className={classes.text}>
            By signing up, you agree to our Terms & Privacy Policy.
          </Text>
        </div>

        {alert && (
          <MessageBar key={alert.type} intent={alert.type || 'info'} className={classes.messageBox}>
            <MessageBarBody>
              <MessageBarTitle>
                {alert.type === 'success' ? 'Email verified' : 
                 alert.type === 'error' ? 'Invalid code. Please try again' : 
                 'Expired Code'}
              </MessageBarTitle>
              <br />
              {alert.message}
            </MessageBarBody>
          </MessageBar>
        )}
      </div>
    </div>
  );
};

export default Otp;