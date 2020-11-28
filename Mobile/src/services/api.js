import axios from 'axios';

const api = axios.create({
  baseURL: 'https://psecapi.herokuapp.com'
});

export default api;