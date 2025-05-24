import React, { useEffect, useState } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
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
import { getProjectByUserId } from '../api/project-service';
import ProtectedRoute from './pages/components/ProtectedRoute';

const ProjectIdWrapper: React.FC<{ Component: React.FC<{ projectId: string }> }> = ({ Component }) => {
  const { projectId } = useParams<{ projectId?: string }>();
  const [fetchedProjectId, setFetchedProjectId] = useState<string | null>(null);
  const userId = localStorage.getItem("userEmail") || "current-user-id";

  useEffect(() => {
    const fetchProjectId = async () => {
      try {
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
        const projectData = await getProjectByUserId(userId);
        const newProjectId = projectData[0]?.id || 'default-project-id';
        setFetchedProjectId(newProjectId);
        localStorage.setItem('projectId', newProjectId);
      } catch (error) {
        console.error("Failed to fetch project ID:", error);
        setFetchedProjectId('default-project-id');
      }
    };
    fetchProjectId();
  }, [userId, projectId]);

  return <Component projectId={fetchedProjectId || 'default-project-id'} />;
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
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
};

export default App;
