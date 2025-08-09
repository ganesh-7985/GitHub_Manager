import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const RepoDetailsPage = () => {
  const { provider, repoId } = useParams();
  const [repo, setRepo] = useState(null);
  const [loading, setLoading] = useState(true);
  const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/repos/${provider}/${repoId}/stats`, { withCredentials: true })
      .then((res) => {
        setRepo(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [backendUrl, provider, repoId]);

  if (loading) return <div>Loading repository details...</div>;
  if (!repo) return <div>Repository not found.</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{repo.name}</h2>
      <p><strong>Stars:</strong> {repo.stars}</p>
      <p><strong>Default branch:</strong> {repo.defaultBranch}</p>
      <p><strong>Auto review enabled:</strong> {repo.autoReview ? 'Yes' : 'No'}</p>
      <p><strong>Total lines (bonus):</strong> {repo.lines}</p>
    </div>
  );
};

export default RepoDetailsPage;