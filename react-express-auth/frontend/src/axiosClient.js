import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true
})

axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response && error.response.status === 401 && error.config) {
        localStorage.removeItem('user');
        instance.get('/auth/refresh').then((response) => {
            if (response) {
                console.log("response", response);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                return instance(error.config);
            }
        }).catch((err) => {
            localStorage.removeItem('user');
            return Promise.reject(error);
        })
    }
})

export default instance;