export const registerSuccess = payload => ({
  type: 'REGISTER_SUCCESS',
  payload,
});

export const registerFail = error => ({
  type: 'REGISTER_FAIL',
  error,
});

export const loginSuccess = payload => ({
  type: 'LOGIN_SUCCESS',
  payload,
});

export const loginFail = error => ({
  type: 'LOGIN_FAIL',
  error,
});
