import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

interface UnProtectedLayoutProps {
  children: React.ReactNode;
}

const UnProtectedLayout: React.FC<UnProtectedLayoutProps> = ({ children }) => {
  
  const user = useSelector((state: RootState) => state?.user);

  if (user) return <Navigate to="/" />;
  return <>{children}</>;
};

export default UnProtectedLayout;