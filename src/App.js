import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import axios from 'axios';
import { AppContext } from 'contexts/AppContext';
import { LanguageContext } from 'contexts/LanguageContext';
import useAPI from 'hooks/useAPI';
import useAuth from 'hooks/useAuth';
import { useContext, useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { RouterProvider } from 'react-router-dom';

import OfflinePage from 'pages/Offline';

import router from 'router';

import '@fancyapps/ui/dist/fancybox/fancybox.css';


const App = () => {
  const { authenticated, claims, refreshTokens } = useAuth();
  const api = useAPI();

  const { setSupportedLanguages } = useContext(LanguageContext);
  const { initialized, setInitialized } = useContext(AppContext);

  let isRefreshing = false;
  let failedQueue = [];

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error);
      } else {
        prom.resolve(token);
      }
    });

    failedQueue = [];
  };

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return axios(originalRequest);
            })
            .catch((err) => Promise.reject(error));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
          try {
            const newTokens = await refreshTokens();
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
            processQueue(null, newTokens.accessToken);
            resolve(axios(originalRequest));
          } catch (e) {
            processQueue(e, null);
            reject(e);
          }

          isRefreshing = false;
        });
      }

      return Promise.reject(error);
    }
  );

  // const fetchSupportedLanguages = async () => {
  //   try {
  //     const { data } = await api.getSupportedLanguages();
  //     setSupportedLanguages(data.results.map(x => x.code));
  //   } catch {
  //     console.log('error fetching supported languages');
  //   }
  // }

  const fetchUser = async () => {
    try {
      const { data } = await api.getUser(claims.userId);
      setUser(data);
    } catch (e) {
      console.log('error fetching user');
    }
  }

  useEffect(() => {
    //fetchSupportedLanguages();
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchUser();
    }
  }, [authenticated])

  const cssVar = (name) =>
    getComputedStyle(document.documentElement).getPropertyValue(name).trim();
    
  const theme = createTheme({
    typography: {
      // fontFamily: `"Urbanist", sans-serif`,
      fontSize: 14,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      h1: {
        fontSize: ['1.6rem', '!important'],
        fontWeight: 'bold',
      },
      h2: {
        fontSize: ['1.5rem', '!important'],
        fontWeight: 'bold',
      },
      h3: {
        fontSize: ['1.4rem', '!important'],
        fontWeight: 'bold',
      },
      h4: {
        fontSize: ['1.3rem', '!important'],
        fontWeight: 'bold',
      },
      h5: {
        fontSize: ['1.2rem', '!important'],
        fontWeight: 'bold',
      },
      h6: {
        fontSize: ['1.0rem', '!important'],
        fontWeight: 'bold',
        marginBottom: '0.4rem',
      },
      subtitle2: {
        fontSize: ['0.8rem', '!important'],
        fontWeight: 'normal',
      },
    },
    palette: {
      background: {
        default: '#f5f5f5',
      },
      primary: {
        main: cssVar('--primary-colour'),
        contrastText: '#fff',
      },
    },
    components: {
      MuiInputBase: {
        styleOverrides: {
          input: {
            borderRadius: 10,
            position: 'relative',
            fontSize: 16,
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 'normal',
            background: cssVar('--primary-colour'),
            color: 'white',
            borderBottom: '1px solid white',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          colorPrimary: {
            backgroundColor: '#ffffff',
            color: '#757B7A',
            borderRadius: 4,
          },
          colorSecondary: {
            backgroundColor: '#ffffff',
          },
        },
      },
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            backgroundColor: 'white',
            background: 'white',
          },
        },
      },
    },
  });

  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    // Update network status
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen to the online status
    window.addEventListener('online', handleStatusChange);

    // Listen to the offline status
    window.addEventListener('offline', handleStatusChange);

    // Specify how to clean up after this effect for performance improvment
    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, [isOnline]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      {!isOnline && (
        <OfflinePage />
      )}
        
      {(isOnline && initialized) && (<RouterProvider router={router} />)}

      <Toaster />
    </ThemeProvider>
  );
};

export default App;
