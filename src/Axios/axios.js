import axios from "axios";

export const BASE_URL = 'http://localhost:57233';

const instance = axios.create({ baseURL: BASE_URL });

instance.interceptors.request.use(async (req) => {
  const token = localStorage.getItem('jwt');
  req.headers = {
    ...req.headers,
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
  return req;
});

instance.interceptors.response.use(
  (response) => {
    if (response.data.accessToken) {
      localStorage.setItem('jwt', response.data.accessToken);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;