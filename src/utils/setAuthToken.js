import axios from 'axios';

const setAuthToken = token => {
  if (token) {
    // console.log(token)
    axios.defaults.headers.common['x-access-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-access-token'];
  }
};

export default setAuthToken;
