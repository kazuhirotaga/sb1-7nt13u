import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Callback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');

      console.log('Callback component mounted');
      console.log('Code from GitHub:', code);

      if (code) {
        try {
          console.log('Sending request to /api/github/callback');
          const response = await axios.post('/api/github/callback', { code });
          console.log('Response from /api/github/callback:', response.data);
          const { access_token } = response.data;
          localStorage.setItem('github_token', access_token);
          navigate('/repos');
        } catch (error) {
          console.error('Error fetching token:', error);
          if (axios.isAxiosError(error)) {
            console.error('Axios error details:', error.response?.data);
          }
          navigate('/');
        }
      } else {
        console.error('No code received from GitHub');
        navigate('/');
      }
    };

    fetchToken();
  }, [navigate]);

  return <div>Processing GitHub login...</div>;
};

export default Callback;