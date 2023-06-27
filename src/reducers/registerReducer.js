
const initialState = {
  isAuthenticated: false,
  user: null,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'REGISTER_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'REGISTER_FAIL':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    // Handle login actions here
    default:
      return state;
  }
};
export default userReducer;