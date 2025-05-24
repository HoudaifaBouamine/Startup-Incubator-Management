import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUpSelection from './pages/SignUpSelection';
import StudentSignUp from './pages/StudentSignUp';
import ProfessorSignUp from './pages/ProfessorSignUp';
import Otp from './pages/Otp';
import Application from './pages/Application';
import Team from './pages/Team';
import DashboardLayout from './pages/components/DashboardLayout';
import Progress from './pages/Progress';
import Training from './pages/Training';
import ResetPassword from './pages/ResetPassword';
import ForgotPassword from './pages/forgot_password';
import Support from './pages/Support';
import Settings from './pages/Settings';
import ProjectsManagement from './pages/mentor/project-management';
import ProjectDetail from './pages/mentor/project-details';
import { getProjectByUser } from '../api/project-service';
import ProtectedRoute from './pages/components/ProtectedRoute';
import { useAuthContext } from './pages/components/AuthContext';

const DUMMY_PROJECT_ID = 'dummy-project-id';

const ProjectIdWrapper: React.FC<{ Component: React.FC<{ projectId: string }> }> = ({ Component }) => {
  const { projectId } = useParams<{ projectId?: string }>();
  const { user } = useAuthContext();
  const [fetchedProjectId, setFetchedProjectId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectId = async () => {
      try {
        if (!user) {
          setError("User not authenticated. Please log in.");
          return;
        }

        const userFirstName = user.name?.split(' ')[0] || user.name || '';

        if (!user.id || !userFirstName) {
          setError("Missing user information (ID or name). Please log in again.");
          return;
        }

        if (projectId) {
          setFetchedProjectId(projectId);
          localStorage.setItem('projectId', projectId);
          return;
        }

        const storedProjectId = localStorage.getItem('projectId');
        if (storedProjectId) {
          setFetchedProjectId(storedProjectId);
          return;
        }

        const projects = await getProjectByUser({ id: user.id, firstName: userFirstName });
        if (!projects || projects.length === 0) {
          console.warn("No projects found for user, using dummy project ID:", DUMMY_PROJECT_ID);
          setFetchedProjectId(DUMMY_PROJECT_ID);
        } else {
          const newProjectId = projects[0].id;
          setFetchedProjectId(newProjectId);
          localStorage.setItem('projectId', newProjectId);
        }
      } catch (err) {
        console.error("Failed to fetch project ID:", err);
        setError("Failed to load project ID. Please check your user data or contact support.");
      }
    };

    fetchProjectId();
  }, [projectId, user]);

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>Error</h2>
        <p>{error}</p>
        <a href="/login">Log in again</a>
      </div>
    );
  }

  if (!fetchedProjectId) {
    return <div>Loading project...</div>;
  }

  return <Component projectId={fetchedProjectId} />;
};

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpSelection />} />
      <Route path="/signup/student" element={<StudentSignUp />} />
      <Route path="/signup/professor" element={<ProfessorSignUp />} />
      <Route path="/verifyEmail" element={<Otp />} />
      <Route path="/application" element={<Application />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute allowedRoles={['MEMBER', 'SUPERVISOR']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/support" element={<Support />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['MEMBER']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/progress/:projectId?" element={<ProjectIdWrapper Component={Progress} />} />
          <Route path="/team/:projectId?" element={<ProjectIdWrapper Component={Team} />} />
          <Route path="/training/:projectId?" element={<ProjectIdWrapper Component={Training} />} />
        </Route>
      </Route>
      <Route element={<ProtectedRoute allowedRoles={['SUPERVISOR']} />}>
        <Route element={<DashboardLayout />}>
          <Route path="/mentor/projects-management" element={<ProjectsManagement />} />
          <Route path="/mentor/projects/:projectId" element={<ProjectIdWrapper Component={ProjectDetail} />} />
          <Route path="/mentor/teams-management" element={<div>Teams Management</div>} />
        </Route>
      </Route>
      <Route path="/404" element={<div>404 - Page Not Found</div>} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
};

export default App;