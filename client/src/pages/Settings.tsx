

"use client";

import React, { useState } from 'react';
import { makeStyles, tokens, Button, Input, Text } from '@fluentui/react-components';
import { Clock20Regular, Eye24Filled, EyeOff24Filled } from '@fluentui/react-icons';
import { useNavigate } from 'react-router-dom';
import { updateUserPassword } from '../../api/user-service';

const useStyles = makeStyles({
  noProjectContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: tokens.colorNeutralBackground2,
    padding: '2rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: tokens.colorNeutralForeground1,
    marginBottom: '1rem',
  },
  subtext: {
    fontSize: '14px',
    color: tokens.colorNeutralForeground2,
    maxWidth: '400px',
    marginBottom: '2rem',
  },
  settingsSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1.5rem',
    width: '100%',
    maxWidth: '400px',
  },
  settingItem: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '14px',
  },
  button: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    fontWeight: '600',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },
  passwordToggle: {
    position: 'absolute',
    right: '10px',
    top: 'calc(50% + 10px)', // Adjust for label
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: tokens.colorNeutralForeground3,
    padding: '4px',
  },
  errorText: {
    color: tokens.colorPaletteRedForeground1,
    fontSize: '14px',
    marginTop: '0.5rem',
  },
  successText: {
    color: tokens.colorStatusSuccessForeground1,
    fontSize: '14px',
    marginTop: '0.5rem',
  },
  passwordRequirements: {
    fontSize: '12px',
    color: tokens.colorNeutralForeground3,
    marginTop: '0.25rem',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    borderRadius: '1rem',
  },
  loadingText: {
    fontSize: '16px',
    fontWeight: '600',
    color: tokens.colorBrandForeground1,
  },
});

const Settings: React.FC = () => {
  const styles = useStyles();
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  // Placeholder for user email; replace with actual user context or auth state
  const userEmail = 'user@example.com'; // Replace with auth context

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setLoading(true);

    try {
      await updateUserPassword(userEmail, currentPassword, newPassword);
      setSuccess(true);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setError(err.message || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.noProjectContainer}>
      <h2 className={styles.title}>Settings</h2>
      <p className={styles.subtext}>
        Update your password to keep your account secure.
      </p>
      <form className={styles.settingsSection} onSubmit={handleResetPassword}>
        {loading && (
          <div className={styles.loadingOverlay}>
            <Text className={styles.loadingText}>Updating password...</Text>
          </div>
        )}
        {error && <Text className={styles.errorText}>{error}</Text>}
        {success && (
          <Text className={styles.successText}>Password updated successfully!</Text>
        )}
        <div className={styles.settingItem}>
          <Clock20Regular />
          <Input
            className={styles.input}
            type={showCurrentPassword ? 'text' : 'password'}
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
          >
            {showCurrentPassword ? <Eye24Filled /> : <EyeOff24Filled />}
          </button>
        </div>
        <div className={styles.settingItem}>
          <Clock20Regular />
          <Input
            className={styles.input}
            type={showNewPassword ? 'text' : 'password'}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowNewPassword(!showNewPassword)}
            aria-label={showNewPassword ? 'Hide password' : 'Show password'}
          >
            {showNewPassword ? <Eye24Filled /> : <EyeOff24Filled />}
          </button>
        </div>
        <Text className={styles.passwordRequirements}>
          Password must be at least 8 characters long.
        </Text>
        <div className={styles.settingItem}>
          <Clock20Regular />
          <Input
            className={styles.input}
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            className={styles.passwordToggle}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
          >
            {showConfirmPassword ? <Eye24Filled /> : <EyeOff24Filled />}
          </button>
        </div>
        <Button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </form>
    </div>
  );
};

export default Settings;
