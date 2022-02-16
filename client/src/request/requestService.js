import axios from 'axios';
import store from '@/store';
import router from '@/router';

const API_ENDPOINT = 'http://localhost:8000'
// const API_ENDPOINT = 'https://www.api-kpkdev.ml'
// const API_ENDPOINT = process.env;


const TOKEN_NAME = 'token';
const SALT = 'eVhfwAhfwDfewuIfenwKbfuweLfbewiefOfejbwOefwuknqdX'

function getToken() {
  return JSON.parse(localStorage.getItem(TOKEN_NAME));
}
axios.interceptors.request.use(
  (config) => {
    if (getToken()) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${getToken() + SALT}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  (success) => success,
  (error) => {
    if (error.response.data?.statusCode === 401) {
      localStorage.removeItem(TOKEN_NAME);
      store.state.auth.user = null;
      store.state.loader.isLoading = false;
      router.push({ path: '/' });
    }
    // eslint-disable-next-line prefer-promise-reject-errors
    return Promise.reject(error?.response?.data);
  },
);
export default {

    get(url, params = {}, headers = {}) {
      return axios.get(
        API_ENDPOINT + url,
        {
          params,
          headers,
        },
      );
    },
    post(url, body = {}, config = {}) {
      return axios.post(
        API_ENDPOINT + url,
        body,
        config,
      );
    },
    delete(url, config = {}) {
      return axios.delete(API_ENDPOINT + url, config);
    },
    put(url, body = {}, config = {}) {
      return axios.put(
        API_ENDPOINT + url,
        body,
        config,
      );
    },
    postExternal(url, body = {}, config = {}) {
      return axios.post(
        API_ENDPOINT + url,
        body,
        config,
      );
    },
  };