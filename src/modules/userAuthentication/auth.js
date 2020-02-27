import axios from "axios";
import jwt_decode from "jwt-decode";
import { JWT_TOKEN, JWT_PREFIX, JWT_HEADER } from "../../constants/constants";

const defaultState = {
  signedIn: false,
  username: "",
  error: "",
  authFailure: false
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case "AUTHENTICATED":
      return {
        signedIn: true,
        username: action.payload.username,
        error: "",
        authFailure: false
      };
    case "AUTHENTICATION_FAILURE":
      return {
        signedIn: false,
        username: "",
        error: action.payload.error,
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

export function authenticationFailure(authData) {
  return {
    type: "AUTHENTICATION_FAILURE",
    payload: authData
  };
}

export function login(username, password, remember) {
  return dispatch => {
    const credentials = { username, password };
    axios
      .post(`/api/auth/login`, credentials)
      .then(success => {
        let authorization = success.data;
        if (remember) localStorage.setItem(JWT_TOKEN, authorization);
        else sessionStorage.setItem(JWT_TOKEN, authorization);
        let token = jwt_decode(authorization);
        this.getUserProfile();
        // dispatch(
        //   authenticated({
        //     signedIn: true,
        //     username: token.sub.username,
        //     error: "",
        //     authFailure: false
        //   })
        // );
      })
      .catch(error => {
        dispatch(
          authenticationFailure({
            signedIn: false,
            username: "",
            // error: err.message,
            error: error.response.data.message,
            authFailure: true
          })
        );
      });
  };
}

export function loggedOut() {
  return {
    type: "LOGGED_OUT"
  };
}

export const logout = () => {
  return dispatch => {
    axios.post("/api/auth/logout").then(() => {
      localStorage.removeItem(JWT_TOKEN);
      dispatch(loggedOut());
    });
  };
};

const getTokenFromStorage = () => {
  let token = localStorage.getItem(JWT_TOKEN);
  if (token != null) return token;
  else {
    token = sessionStorage.getItem(JWT_TOKEN);
    if (token != null) return token;
  }
  return null;
};

export const getUserProfile = () => {
  return dispatch => {
    let token = getTokenFromStorage();
    let headers = {
      [JWT_HEADER]: `${JWT_PREFIX} ${token}`
    };
    axios
      .get(`/api/auth/user-profile`, { headers })
      .then(res => {
        dispatch(
          authenticated({
            signedIn: true,
            username: res.data.fullName,
            error: "",
            authFailure: false
          })
        );
      })
      .catch(error => {
        console.log("catch validate " + error);
        dispatch(loggedOut());
      });
  };
};
