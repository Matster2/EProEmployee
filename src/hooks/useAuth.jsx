import axios from 'axios';
import { useCallback, useContext } from 'react';

import { AuthContext } from 'contexts/AuthContext';
import { actions } from 'reducers/authReducer';

const useAuth = () => {
  const { state, dispatch } = useContext(AuthContext);

  const login = async (accountNumber, employeeNumber, password) => {
    dispatch({ type: actions.LOGIN_REQUESTED });

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/v1.0/auth/employee/login`, {
        accountNumber,
        employeeNumber,
        password,
      });

      dispatch({
        type: actions.LOGIN_SUCCESSFUL,
        payload: {
          tokens: data,
        },
      });
      return data;
    } catch (e) {
      dispatch({ type: actions.LOGIN_FAILED });
      throw e;
    }
  };

  const logout = () => {
    dispatch({ type: actions.LOGOUT });
  };

  const refreshTokens = async () => {
    dispatch({ type: actions.REFRESHING_TOKENS_REQUESTED });

    try {
      const { data } = await axios.post(`${process.env.REACT_APP_API_URL}/v1.0/tokens/refresh`, {
        accessToken: state.tokens.accessToken,
        refreshToken: state.tokens.refreshToken,
      });

      dispatch({
        type: actions.REFRESHING_TOKENS_SUCCESSFUL,
        payload: {
          tokens: data,
        },
      });

      return data;
    } catch (e) {
      dispatch({ type: actions.REFRESHING_TOKENS_FAILED });
      throw e;
    }
  };

  return {
    ...state,
    login: useCallback(login, [dispatch]),
    logout: useCallback(logout, [dispatch]),
    refreshTokens: useCallback(refreshTokens, [dispatch, state.tokens]),
  };
};

export default useAuth;
