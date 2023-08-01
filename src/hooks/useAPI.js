import axios from 'axios';
import { LanguageContext } from 'contexts/LanguageContext';
import { useContext } from 'react';
import { isNullOrEmpty, isUndefined } from 'utils/utils';
import useAuth from './useAuth';

const getSearchParams = (parameters) => {
  const filters = {...parameters};
  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (isNullOrEmpty(value) || isUndefined(value) || (Array.isArray(value) && value.length === 0)) {
      delete filters[key];
    }
  });

  var searchParameters = new URLSearchParams(filters);

  Object.keys(filters).forEach((key) => {
    const value = filters[key];
    if (Array.isArray(value)) {
      searchParameters.delete(key);

      value.forEach((arrayValue) => {
        searchParameters.append(key, arrayValue);
      });
    }
  });

  return searchParameters;
};

const useAPI = () => {
  const { currentLanguage } = useContext(LanguageContext);
  const { tokens } = useAuth();

  const getSupportedLanguages = async () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/languages`);
  };

  const queryEmail = async (email) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/users/email/${email}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const register = async (email, password) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/register`, { email, password });
  };

  const forgotPassword = async (email) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/forgot-password`, { email });
  };

  const changePassword = async (userId, currentPassword, newPassword) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/users/${userId}/change-password`, { 
      userId: userId,
      currentPassword,
      newPassword  
    });
  };

  const resetPassword = async (email, resetToken, newPassword) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/reset-password`, {
      email,
      resetToken,
      newPassword,
    });
  };

  const getUser = async (userId) => {
    return axios.get(`${process.env.REACT_APP_API_URL}/v1.0/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getMe = async () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const getIngredients = async (parameters = {}) => {
    const url = new URL(`${process.env.REACT_APP_API_URL}/ingredients`);
    url.search = getSearchParams(parameters);

    return axios.get(url.href, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
        Language: currentLanguage
      },
    });
  };

  const createIngredient = async (ingredient) => {
    return axios.post(
      `${process.env.REACT_APP_API_URL}/ingredients`,
      {
        ...ingredient,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };

  const updateIngredient = async (id, data) => {
    return axios.put(
      `${process.env.REACT_APP_API_URL}/ingredients/${id}`,
      {
        ...data,
      },
      {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`,
        },
      }
    );
  };
  const deleteMyUser = async () => {
    return axios.delete(`${process.env.REACT_APP_API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    });
  };

  return {
    getSupportedLanguages,
    queryEmail,
    forgotPassword,
    changePassword,
    resetPassword,
    register,
    getUser,
    getMe,
    getIngredients,
    createIngredient,
    updateIngredient,
    deleteMyUser,
  };
};

export default useAPI;
