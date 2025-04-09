import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUpSelection from './pages/SignUpSelection';
import StudentSignUp from './pages/StudentSignUp';
import ProfessorSignUp from './pages/ProfessorSignUp';
import Otp from './pages/Otp';
import Application from './pages/Application';
import MyProgram from './pages/MyProgram';
import Team from './pages/Team'; 
import DashboardLayout from './pages/components/DashboardLayout';

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

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<div>Dashboard Page</div>} /> 
        <Route path="/incubation-program" element={<MyProgram />} />
        <Route path="/startup" element={<div>Startup Page</div>} />
        <Route path="/team" element={<Team />} />
        <Route path="/training" element={<div>Training Page</div>} />
        <Route path="/support" element={<div>Support Page</div>} />
        <Route path="/settings" element={<div>Settings Page</div>} />
      </Route>
    </Routes>
  );
};

export default App;