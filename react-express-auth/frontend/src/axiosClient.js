import axios from 'axios';
const instance = axios.create({
    baseURL: 'http://localhost:4000/api/v1/',
    withCredentials: true
})

instance.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error && error.response && error.response.status === 401 && error.config && error.response.data.error.name === "JsonWebTokenError") {
        instance.get('/auth/refresh').then(async (response) => {
            if (response) {
                try {
                    const verifiedData = await instance.get('/auth/verifyMe');
                    localStorage.setItem('user', JSON.stringify(verifiedData.data.user));
                }
                catch (err) {
                    localStorage.removeItem('user');
                    return Promise.reject(err);
                }
            }
        }).catch((err) => {
            localStorage.removeItem('user');
            return Promise.reject(err);
        })
    }
    return Promise.reject(error);
})

export default instance;