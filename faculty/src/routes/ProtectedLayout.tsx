import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
const user = useSelector((state: RootState) => state.user);

if (!user) return <Navigate to='/login' />;
return <>{children}</>;
};

export default ProtectedLayout;