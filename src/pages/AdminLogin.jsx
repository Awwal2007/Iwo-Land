// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import './css/SignupPage.css'; 

const AdminLogin = () => {
  const { signin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const formData = { email, password };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await signin(formData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="signup-container">
        {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
        <form className="signup-form" onSubmit={handleSubmit} >
          <h2>Create Admin Account</h2>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg shadow-md transition-colors"
          >
            Login
          </button>
        </form>
      </div>
  );
};

export default AdminLogin;
