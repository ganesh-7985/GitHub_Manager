import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ReposPage = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/repos`, { withCredentials: true })
      .then((res) => {
        setRepos(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [backendUrl]);

  const toggleAutoReview = (repo) => {
    axios
      .post(
        `${backendUrl}/api/repos/${repo.provider || 'github'}/${repo.id}/auto-review`,
        {},
        { withCredentials: true }
      )
      .then((res) => {
        const updated = repos.map((r) =>
          r.id === repo.id ? { ...r, autoReview: res.data.autoReview } : r
        );
        setRepos(updated);
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <div>Loading repositories...</div>;

  return (
    <div className="container">
      <h2>Your Repositories</h2>
      {repos.length === 0 ? (
        <p>No repositories found for this user.</p>
      ) : (
        <ul className="repo-list">
          {repos.map((repo) => (
            <li key={repo.id} className="repo-item">
              <div>
                <strong>{repo.name}</strong>
                <div className="repo-meta">
                  Stars: {repo.stars} &nbsp;|&nbsp; Default branch: {repo.defaultBranch}
                </div>
              </div>
              <div className="repo-actions">
                <button onClick={() => toggleAutoReview(repo)}>
                  {repo.autoReview ? 'Disable Auto Review' : 'Enable Auto Review'}
                </button>
                <button onClick={() => navigate(`/repos/github/${repo.id}`)}>Details</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReposPage;

