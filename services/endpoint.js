import axios from 'axios';


const api = axios.create({
    baseURL: 'http://127.0.0.1:8000/v1/',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),

    }
})

export default api;