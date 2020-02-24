import axios from "axios";
import jwt_decode from "jwt-decode";

const defaultState = {
  signedIn: false,
  username: "",
  authFailure: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "AUTHENTICATED":
      return {
        signedIn: true,
        username: action.payload.username,
        authFailure: false
      };
    case "AUTHENTICATION_FAILURE":
      return {
        signedIn: false,
        username: "",
        authFailure: true
      };
    case "LOGGED_OUT":
      return defaultState;
    default:
      return state;
  }
};

export function authenticated(authData) {
  return {
    type: "AUTHENTICATED",
    payload: authData
  };
}

export function authenticationFailure() {
  return {
    type: "AUTHENTICATION_FAILURE",
    payload: { signedIn: false, username: "", authFailure: true }
  };
}

export function login(username, password) {
  return dispatch => {
    const credentials = { username, password };
    axios.post(`/api/auth/login`, credentials).then(
      success => {
        let authorization = success.data;
        localStorage.setItem("token", authorization);

        let token = jwt_decode(authorization);
        console.log(token);
        console.log(`token :${token.sub.username}`);
        dispatch(
          authenticated({
            signedIn: true,
            username: token.sub.username,
            authFailure: false
          })
        );
      },
      failure => {
        dispatch(authenticationFailure());
      }
    );
  };
}

export function loggedOut() {
  return {
    type: "LOGGED_OUT"
  };
}

export const logout = () => {
  console.log("clicked logout");
  return dispatch => {
    axios.post("/api/auth/logout").then(
      () => {
        localStorage.removeItem("token");
        dispatch(loggedOut());
      },
      failure => console.error(`Failed to log out successfully: ${failure}`)
    );
  };
};

export const validateToken = (token) => {
  return dispatch => {
    axios.post(`/api/auth/validate`, token)
      .then(success => {
        dispatch(authenticated({
          signedIn: true,
          username: "",
          authFailure: false
      }));
      },
      failure => {
        dispatch(authenticationFailure());
    })
  };
};

