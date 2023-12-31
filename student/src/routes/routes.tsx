import React from 'react';
import { Outlet } from 'react-router-dom';
import UnProtectedLayout from './UnProtectedLayout';
import { SignupForm } from '../pages/signup/Signup';
import { Login } from '../pages/signup/Login';
import ProtectedLayout from './ProtectedLayout';
import Home  from '../pages/home/Home';
import { NavBar } from '../components/NavBar/NavBar';
import { Quiz } from '../pages/Quiz/Quiz'
import { PageNotFound } from '../components/PageNotFound';

const Layout: React.FC = () => {
  return (
    <div>
      <NavBar />
      <div className="d-flex">
        <div className="home-container">
          <Outlet /> 
        </div>
      </div>
    </div>
  );
};

const routes = [
  {
    path: '*',
    element: <PageNotFound />,
  },
  {
    path: '/',
    element: (
      <ProtectedLayout>
        <Layout /> 
      </ProtectedLayout>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/quiz/:quizid',
        element: <Quiz />,
      }
    ],
  },
  {
    path: '/login',
    element: (
      <UnProtectedLayout>
        <Login />
      </UnProtectedLayout>
    ),
  },
  {
    path: '/register',
    element: (
      <UnProtectedLayout>
        <SignupForm />
      </UnProtectedLayout>
    ),
  }
];

export default routes;
