import React, { useEffect } from 'react';

const Login: React.FC = () => {
  useEffect(() => {
    console.log('Login component mounted');
    console.log('GITHUB_CLIENT_ID:', import.meta.env.VITE_GITHUB_CLIENT_ID);
    console.log('REDIRECT_URI:', import.meta.env.VITE_REDIRECT_URI);
  }, []);

  const handleLogin = () => {
    const GITHUB_CLIENT_ID = import.meta.env.VITE_GITHUB_CLIENT_ID;
    const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
    console.log('Initiating GitHub login');
    console.log('Login URL:', `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo`);
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=repo`;
  };

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-4">Connect to GitHub</h2>
      <button
        onClick={handleLogin}
        className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
      >
        Login with GitHub
      </button>
    </div>
  );
};

export default Login;