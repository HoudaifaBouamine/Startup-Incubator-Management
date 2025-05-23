import React, { useState, useEffect } from 'react';
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
import ProjectsManagement from './pages/mentor/project-management';
import ProjectDetail from './pages/mentor/project-details';
import { getProjectByUserId } from '../api/project-service';
import Support from './pages/Support';
import Settings from './pages/Settings';

const ProjectIdWrapper: React.FC<{ Component: React.FC<{ projectId: string }> }> = ({ Component }) => {
  const { projectId } = useParams<{ projectId?: string }>();
  const [fetchedProjectId, setFetchedProjectId] = useState<string | null>(null);
  const userId = "current-user-id";

  useEffect(() => {
    const fetchProjectId = async () => {
      try {
        const storedProjectId = localStorage.getItem('projectId');
        if (storedProjectId) {
          setFetchedProjectId(storedProjectId);
          return;
        }
        const projectData = await getProjectByUserId(userId);
        const newProjectId = projectData[0]?.id || projectId || 'default-project-id';
        setFetchedProjectId(newProjectId);
        localStorage.setItem('projectId', newProjectId);
      } catch (error) {
        console.error("Failed to fetch project ID:", error);
        setFetchedProjectId(projectId || 'default-project-id');
      }
    };
    fetchProjectId();
  }, [userId, projectId]);

  return <Component projectId={fetchedProjectId || 'default-project-id'} />;
};

const App: React.FC = () => (
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
    <Route element={<DashboardLayout />}>
      <Route path="/dashboard" element={<div>Dashboard Page</div>} />
      <Route path="/progress/:projectId?" element={<ProjectIdWrapper Component={Progress} />} />
      <Route path="/team/:projectId?" element={<ProjectIdWrapper Component={Team} />} />
      <Route path="/training/:projectId?" element={<ProjectIdWrapper Component={Training} />} />
      <Route path="/support" element={<Support/>} />
      <Route path="/settings" element={<Settings/>} />
    </Route>
    <Route path="/mentor/projects-management" element={<ProjectsManagement />} />
    <Route path="/mentor/projects/:projectId" element={<ProjectDetail />} />
  </Routes>
);

export default App;