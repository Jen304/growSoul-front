//import api from './endpoint';
//import jwt_decode from 'jwt-decode'

import { nonAuthRequest, authRequest } from './connectServer';


const loginRequest = (api, userInfo) => {
    return api.post('auth/login/', userInfo)
        .then(response => {
            //api.defaults.headers['Authorization'] = "JWT " + response.data.access;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            return response.data.access;
        })
        .catch(error => {
            console.log(error);
            throw "Error occurs"
        })

}

const signupRequest = (api, userInfo) => {
    return api.post('user/create/', userInfo).then(response => {
        console.log(response);
        // should modify the server to return token rather than this
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        return response.data.access;

        //return response.data;

    }).catch(error => {
        console.log(error);
        throw "Error occur"
    });


}
const logoutRequest = (api, refreshToken) => {
    //const payload = localStorage.getItem('refresh_token');
    console.log(refreshToken);
    return api.post('auth/logout/', { token: refreshToken })
        .then(response => {
            //api.defaults.headers['Authorization'] = "JWT " + response.data.access;
            //localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('access_token', null);
            localStorage.setItem('refresh_token', null);
            return response;
        })
        .catch(error => {
            console.log(error);
        })

}

const login = (userInfo) => {
    return nonAuthRequest(loginRequest, userInfo);
}

const signup = (userInfo) => {
    return nonAuthRequest(signupRequest, userInfo);
}


const logout = () => {
    const token = localStorage.getItem('refresh_token');
    authRequest(logoutRequest, token);
}

export { signup, login, logout }