import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUpSelection from "./pages/SignUpSelection";
import StudentSignUp from "./pages/StudentSignUp";
import ProfessorSignUp from "./pages/ProfessorSignUp";
import Otp from "./pages/Otp";
import Application from "./pages/Application";
const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpSelection />} />
        <Route path="/signup/student" element={<StudentSignUp />} />
        <Route path="/signup/professor" element={<ProfessorSignUp/>} />
        <Route path="/verifyEmail" element={<Otp />} />
        <Route path="/application" element={<Application/>} />
      </Routes>
  );  
};

export default App;
