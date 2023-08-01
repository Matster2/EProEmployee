import PropTypes from 'prop-types';
import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';

const DefaultRoute = ({ children }) => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/sign-in" />;
  }

  return <Navigate to="/" />;
};

DefaultRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultRoute;
