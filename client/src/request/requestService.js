import axios from 'axios';

const API_ENDPOINT = 'http://3.17.162.70'
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
      return axios.delete(url, config);
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