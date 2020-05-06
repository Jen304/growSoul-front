//import api from './endpoint';
//import jwt_decode from 'jwt-decode'




const login = (api, userInfo) => {
    return api.post('auth/login/', userInfo)
        .then(response => {
            //api.defaults.headers['Authorization'] = "JWT " + response.data.access;
            //localStorage.setItem('access_token', response.data.access);
            //localStorage.setItem('refresh_token', response.data.refresh);
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })

}
const refreshToken = (api, refreshToken) => {
    //const payload = localStorage.getItem('refresh_token');
    return api.post('auth/refresh/', refreshToken)
        .then(response => {
            //api.defaults.headers['Authorization'] = "JWT " + response.data.access;
            //localStorage.setItem('access_token', response.data.access);
            return response.data;
        })
        .catch(error => {
            console.log(error);
        })

}
const signup = (api, userInfo) => {
    return api.post('user/create/', userInfo).then(response => {
        console.log(response);
        return login(api, userInfo);
        //return response.data;

    }).catch(error => {
        console.log(error);
    });


}


export { signup, login, refreshToken, }