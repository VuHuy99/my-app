import { LOGIN_USER, LOGOUT_USER } from "./actions";
const initialState = {
  users: {},
  polls: [],
  authedUser: {
    id: "",
    answers: [],
  },
};
export const providerReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, authedUser: action.user };
    case LOGOUT_USER:
      return { ...state, authedUser: initialState.authedUser };
    case "SET_USERS":
      return { ...state, users: action.users };
    case "SET_POLLS":
      return { ...state, polls: action.polls };
    case "SET_AUTHED_USER":
      return { ...state, authedUser: action.authedUser };
    default:
      return state;
  }
};
