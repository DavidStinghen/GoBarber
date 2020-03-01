import axios from 'axios';

const api = axios.create({
  baseURL: 'http://169.254.80.80:3333',
});

export default api;
