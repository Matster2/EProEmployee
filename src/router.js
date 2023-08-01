import { Outlet, createBrowserRouter } from 'react-router-dom';

import MainLayout from 'layouts/MainLayout';

import ForgottenPassword from 'pages/ForgottenPassword';
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';
import Register from 'pages/Register';
import SignIn from 'pages/SignIn';
import AuthRoute from 'routings/AuthRoute';
import UnAuthRoute from 'routings/UnAuthRoute';

const ErrorBoundary = () => {
  // let error = useRouteError();
  return <NotFound />;
}

export default createBrowserRouter([
  {
    element: (
      <UnAuthRoute>
        <Outlet />
      </UnAuthRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/sign-in',
        element: <SignIn />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/forgot-password',
        element: <ForgottenPassword />,
      },
    ]
  },
  {
    element: (
      <AuthRoute>
        <MainLayout />
      </AuthRoute>
    ),
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '*',
        element: <Home />,
      },
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/home',
        element: <Home />,
      },
    ]
  }
]);
