import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    timeout: 5000,
})

instance.defaults.withCredentials = true;

export default instance;