import React from 'react';
import { Routes, Route } from 'react-router-dom';
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
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        <Route path="/progress" element={<Progress projectId="default-project-id" />} />
        <Route path="/team" element={<Team />} />
        <Route path="/training" element={<Training />} />
        <Route path="/support" element={<div>Support Page</div>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
      </Route>
      <Route path="/mentor/projects-management" element={<ProjectsManagement />} />
      <Route path="/mentor/projects/:projectId" element={<ProjectDetail />} />
    </Routes>
  );
};

export default App;