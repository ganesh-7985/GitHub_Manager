import React from 'react';

const LoginPage = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
  return (
    <div className="container">
      <h2>Login with Git Provider</h2>
      <p>Select a provider to continue:</p>
      <div className="button-group">
        <a href={`${backendUrl}/auth/github`}>
          <button>Login with GitHub</button>
        </a>
        <a href={`${backendUrl}/auth/gitlab`}>
          <button>Login with GitLab</button>
        </a>
        <a href={`${backendUrl}/auth/bitbucket`}>
          <button>Login with Bitbucket</button>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;

