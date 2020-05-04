import axios from 'axios';

const api = axios.create({
    // need to change in the production
    baseURL: 'http://127.0.0.1:8000/v1/',
    timeout: 5000
})

export default api;