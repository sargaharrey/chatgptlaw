// rootReducer.js

import { combineReducers } from '@reduxjs/toolkit';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';

const rootReducer = combineReducers({
  login: loginReducer,
  register: registerReducer,
});

export default rootReducer;
