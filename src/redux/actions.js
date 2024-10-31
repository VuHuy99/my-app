export const setUsers = (users) => ({
  type: "SET_USERS",
  users,
});

export const setPolls = (polls) => ({
  type: "SET_POLLS",
  polls,
});

export const setAuthedUser = (auth) => ({
  type: "SET_AUTHED_USER",
  authedUser: auth,
});
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";

export const loginUser = (user) => ({
  type: LOGIN_USER,
  user,
});
export const setBadId = (badId) => ({
  type: "SET_BAD_ID",
  badId,
});
export const logoutUser = () => ({
  type: LOGOUT_USER,
});
