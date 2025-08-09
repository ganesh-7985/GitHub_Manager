import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import ReposPage from './pages/ReposPage.jsx';
import RepoDetailsPage from './pages/RepoDetailsPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/repos" element={<ReposPage />} />
        <Route path="/repos/:provider/:repoId" element={<RepoDetailsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

