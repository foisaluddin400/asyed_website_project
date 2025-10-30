'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const token = useSelector((state) => state.logInUser?.token);

  useEffect(() => {
    // Wait until we are sure about the token state
    if (token !== undefined) {
      if (token) {
        setIsLoading(false); // User is logged in
      } else {
        router.replace('/signIn');
        setIsLoading(false);
      }
    }
  }, [token, router]);

  // Show loader while checking token
  if (token === undefined || isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-primary"></div>
      </div>
    );
  }

  // If no token, redirect already handled in useEffect
  // Just return null or nothing
  if (!token) {
    return null;
  }

  // Token exists → render children
  return <>{children}</>;
};

export default ProtectedRoute;