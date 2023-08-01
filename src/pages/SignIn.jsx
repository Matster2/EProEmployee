import NiceModal from '@ebay/nice-modal-react';
import { Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography } from '@mui/material';
import logo from 'assets/logo.png';
import useAuth from 'hooks/useAuth';
import useInput from 'hooks/useInput';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { isEmptyOrWhiteSpace, isUndefined } from 'utils/utils';
import styles from './SignIn.module.css';

const SignIn = ({ onSignUpClick, onForgottenPasswordClick, onComplete }) => {
  const { t } = useTranslation();
  var navigate = useNavigate();
  const auth = useAuth();

  const { value: accountNumber, onChange: onAccountNumberChange } = useInput('');
  const { value: employeeNumber, onChange: onEmployeeNumberChange } = useInput('');
  const { value: password, onChange: onPasswordChange } = useInput('');

  const [signingIn, setSigningIn] = useState(false);
  const [signedIn, setSignedin] = useState(false);

  const [inputErrors, setInputErrors] = useState({
    accountNumber: undefined,
    employeeNumber: undefined,
    password: undefined,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const clearErrors = () => {
    setInputErrors({
      accountNumber: undefined,
      employeeNumber: undefined,
      password: undefined,
    });
    setErrorMessage(undefined);
  };

  const validateInputs = () => {
    const newInputErrors = {
      accountNumber: (() => {
        if (isEmptyOrWhiteSpace(accountNumber)) {
          return t('forms.auth.signIn.inputs.accountNumber.validationMessages.empty');
        }

      })(),
      employeeNumber: (() => {
        if (isEmptyOrWhiteSpace(employeeNumber)) {
          return t('forms.auth.signIn.inputs.employeeNumber.validationMessages.empty');
        }

        return undefined;
      })(),
      password: (() => {
        if (isEmptyOrWhiteSpace(password)) {
          return t('forms.auth.signIn.inputs.password.validationMessages.empty');
        }

        return undefined;
      })(),
    };

    setInputErrors(newInputErrors);

    return (
      isUndefined(newInputErrors.accountNumber) &&
      isUndefined(newInputErrors.employeeNumber) &&
      isUndefined(newInputErrors.password))
  };

  const handleSignInClick = async () => {
    setSigningIn(true);

    if (!validateInputs()) {
      setSigningIn(false);
      console.log("FALSE")
      return;
    }

    try {
      console.log("LOGIN")
      await auth.login(accountNumber, employeeNumber, password);
      setSignedin(true);
      toast.success(t('requests.auth.signIn.success'));
      onComplete();
    } catch (e) {
      if (!isUndefined(e.response) && e.response.status === 400) {
        toast.error(t('requests.auth.signIn.invalid'));
      } else {
        toast.error(t('requests.auth.signIn.error'));
      }
    }

    setSigningIn(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    NiceModal.hide('authentication-modal');
  }

  useEffect(() => {
    clearErrors();
  }, [accountNumber, employeeNumber, password]);

  return (
    <Container
      maxWidth="xs"
    >
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img onClick={handleLogoClick} className={styles.logo} src={logo} alt="epro" />
        </Box>
      </Box>
      
      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="accountNumber"
          label={t('forms.auth.signIn.inputs.accountNumber.label')}
          name="accountNumber"
          autoComplete="accountNumber"
          autoFocus
          disabled={signedIn || signingIn}
          value={accountNumber}
          onChange={onAccountNumberChange}
          error={!isUndefined(inputErrors.accountNumber)}
          helperText={inputErrors.accountNumber}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="employeeNumber"
          label={t('forms.auth.signIn.inputs.employeeNumber.label')}
          name="employeeNumber"
          autoComplete="employeeNumber"
          disabled={signedIn || signingIn}
          value={employeeNumber}
          onChange={onEmployeeNumberChange}
          error={!isUndefined(inputErrors.employeeNumber)}
          helperText={inputErrors.employeeNumber}
        />

        <FormControlLabel
          control={<Checkbox
            value={true}
            onChange={() => {}}  
          />}            
          name="isVariant"
          label={t('forms.auth.signIn.inputs.rememberMe.label')}
        />

        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={t('forms.auth.signIn.inputs.password.label')}
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={signedIn || signingIn}
          value={password}
          onChange={onPasswordChange}
          error={!isUndefined(inputErrors.password)}
          helperText={inputErrors.password}
        />

        <Box
          sx={{
            marginBottom: 4,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Typography className="link" onClick={onForgottenPasswordClick}>
            {t('pages.signIn.links.forgottenPassword')}
          </Typography>
        </Box>

        <Button
          disabled={signedIn || signingIn}
          type="button"
          onClick={handleSignInClick}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t('forms.auth.signIn.buttons.submit.label')}
        </Button>
      </Box>
    </Container>
  );
};

SignIn.propTypes = {
  onSignUpClick: PropTypes.func,
  onForgottenPasswordClick: PropTypes.func,
  onComplete: PropTypes.func,
};

SignIn.defaultProps = {
  onComplete: () => {}
};

export default SignIn;
