'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser, setToken } from '@/store/authSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      const response = await axios.post('/api/auth/login', formData);
      const { token } = response.data;
      dispatch(setToken(token));

      const userResponse = await axios.get('/api/auth/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      dispatch(setUser(userResponse.data));
      toast.success('Login successful');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Invalid credentials');
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-blue-600 text-white p-2 rounded ${
            loading ? 'opacity-50' : ''
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
