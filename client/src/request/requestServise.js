import axios from 'axios';

export default {
    get(url, params = {}, headers = {}) {
      return axios.get(
        {
          params,
          headers,
        },
      );
    },
    post(url, body = {}, config = {}) {
      return axios.post(
        body,
        config,
      );
    },
    delete(url, config = {}) {
      return axios.delete(url, config);
    },
    put(url, body = {}, config = {}) {
      return axios.put(
        url,
        body,
        config,
      );
    },
    postExternal(url, body = {}, config = {}) {
      return axios.post(
        url,
        body,
        config,
      );
    },
  };