import FuseUtils from "@fuse/utils/FuseUtils";
import axios from "axios";
import jwtDecode from "jwt-decode";
import jwtServiceConfig from "./jwtServiceConfig";
import { API_ROUTES } from "src/app/constant/apiRoutes";
import { APIRequest } from "src/app/utils/APIRequest";
import { getUserData } from "src/app/utils/User";
/* eslint-disable camelcase */

class JwtService extends FuseUtils.EventEmitter {
  init() {
    this.setInterceptors();
    this.handleAuthentication();
  }

  setInterceptors = () => {
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (err) => {
        return new Promise((resolve, reject) => {
          if (
            err.response.status === 401 &&
            err.config &&
            !err.config.__isRetryRequest
          ) {
            // if you ever get an unauthorized response, logout the user
            this.emit("onAutoLogout", "Invalid access_token");
            this.setSession(null);
          }
          throw err;
        });
      }
    );
  };

  handleAuthentication = () => {
    const access_token = this.getAccessToken();

    if (!access_token) {
      this.emit("onNoAccessToken");

      return;
    }

    if (this.isAuthTokenValid(access_token)) {
      this.setSession(access_token);
      this.emit("onAutoLogin", true);
    } else {
      this.setSession(null);
      this.emit("onAutoLogout", "access_token expired");
    }
  };

  createUser = (data) => {
    
    return new Promise((resolve, reject) => {
      const formData = new FormData();

    // Append form data fields to the FormData object
    Object.keys(data).forEach(key => {
      formData.append(key, data[key]);
    });

      APIRequest.post(API_ROUTES.signUp, formData)
        .then((response) => {
          window.location.href = '/sign-in';
          return response
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  getUser = () => {
    return new Promise((resolve, reject) => {
      APIRequest.get(API_ROUTES.getMe)
        .then((response) => {
          const loginuser = response.result;
          const user = getUserData(loginuser);
          resolve(user);
          this.emit("onLogin", user);
        })
        .catch((error) => {
          this.logout();
          this.emit('onAutoLogout', 'Invalid access_token');
          reject(new Error('Invalid access_token'));
        });
    });
  };
  
  signInWithEmailAndPassword = (username, password) => {
    return new Promise((resolve, reject) => {
      APIRequest.post(API_ROUTES.signIn, { username: username, password: password })
        .then((response) => {
          this.setSession(response.result.token);
          resolve(this.getUser());
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

  signInWithToken = () => {
    return new Promise((resolve, reject) => {
      const access_token = this.getAccessToken();

      if (access_token) {
        const decoded = jwtDecode(access_token);
        console.log(
          "🚀  file: jwtService.js:102  JwtService  returnnewPromise  decoded:",
          decoded
        );
        this.setSession(access_token);
        resolve(this.getUser());
      } else {
        this.logout();
        reject(new Error("Failed to login with token."));
      }
    });
  };

  updateUserData = (user) => {
    return axios.post(jwtServiceConfig.updateUser, {
      user,
    });
  };

  setSession = (access_token) => {
    if (access_token) {
      localStorage.setItem("jwt_access_token", access_token);
      axios.defaults.headers.common.Authorization = `Bearer ${access_token}`;
    } else {
      localStorage.removeItem("jwt_access_token");
      delete axios.defaults.headers.common.Authorization;
    }
  };

  logout = () => {
    this.setSession(null);
    this.emit("onLogout", "Logged out");
  };

  isAuthTokenValid = (access_token) => {
    if (!access_token) {
      return false;
    }
    const decoded = jwtDecode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp < currentTime) {
      console.warn("access token expired");
      return false;
    }

    return true;
  };

  getAccessToken = () => {
    return window.localStorage.getItem("jwt_access_token");
  };
}

const instance = new JwtService();

export default instance;
