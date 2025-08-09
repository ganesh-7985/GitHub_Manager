import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  useEffect(() => {
    axios
      .get(`${backendUrl}/api/profile`, { withCredentials: true })
      .then((res) => {
        setProfile(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [backendUrl]);

  const logout = () => {
    axios
      .post(`${backendUrl}/auth/logout`, {}, { withCredentials: true })
      .then(() => {
        window.location.href = '/login';
      })
      .catch((err) => console.error(err));
  };

  if (loading) return <div>Loading profile...</div>;
  if (!profile) return <div>Profile not available.</div>;

  return (
    <div className="container">
      <h2>Profile</h2>
      <p><strong>Name:</strong> {profile.name}</p>
      <p><strong>Email:</strong> {profile.email}</p>
      <p><strong>Provider:</strong> {profile.provider}</p>
      <p><strong>Repositories with auto review:</strong> {profile.totalAutoReviewRepos}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default ProfilePage;

