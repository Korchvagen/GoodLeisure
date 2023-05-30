import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4444/' 
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  config.headers.Language = window.localStorage.getItem('lang');

  return config;
})

export default instance;