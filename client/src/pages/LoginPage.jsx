import React from 'react';

const LoginPage = () => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Login with Git Provider</h2>
      <p>Select a provider to continue:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '200px' }}>
        <a href={`${backendUrl}/auth/github`}>
          <button style={{ width: '100%' }}>Login with GitHub</button>
        </a>
        <a href={`${backendUrl}/auth/gitlab`}>
          <button style={{ width: '100%' }}>Login with GitLab</button>
        </a>
        <a href={`${backendUrl}/auth/bitbucket`}>
          <button style={{ width: '100%' }}>Login with Bitbucket</button>
        </a>
      </div>
    </div>
  );
};

export default LoginPage;