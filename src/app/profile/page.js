'use client';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { user, token } = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push('/login'); // Redirect to login if not logged in
    }
  }, [token, router]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(`Welcome back, ${response.data.name}`);
    } catch (error) {
      toast.error('Failed to fetch profile');
    }
  };

  useEffect(() => {
    if (token) {
      fetchProfile();
    }
  }, [token]);

  if (!user) {
    return (
      <div className="text-center">
        <h1>Please log in to view your profile.</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
        <div className="mb-4">
          <strong>Name: </strong> {user.name}
        </div>
        <div className="mb-4">
          <strong>Email: </strong> {user.email}
        </div>
        {/* Display other user data here */}
      </div>
    </div>
  );
}
