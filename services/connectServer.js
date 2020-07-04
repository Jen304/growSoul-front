/*
    this is the layer to check authentication of user
    for every request to server
    @params: request
             data (optional)
    @return promise

*/
// inspect access token
// check refresh token
import axios from 'axios';
import jwt_decode from 'jwt-decode' 

const endpoint = axios.create({
    baseURL: 'http://127.0.0.1:8000/v1/',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),

    }
});
const resetEndpoint = (newToken) => {
    endpoint.defaults.headers['Authorization'] = "JWT " + newToken;
    return endpoint;
}
const nonAuthRequest = async (request, data) => {
    const endpoint = axios.create({
        baseURL: 'http://127.0.0.1:8000/v1/',//'http://ec2-3-23-98-73.us-east-2.compute.amazonaws.com/v1/',
        timeout: 5000,

    });
    try {
        await request(endpoint, data);
        console.log(data);
        // after send that request need to resetEndpoint
        resetEndpoint();
    } catch (e) {
        console.log(e);
    }
}
const authRequest = async (request, data) => {

    //console.log(request)
    const token = localStorage.getItem('access_token');
    console.log(token)

    if (token) {

        const decodedToken = jwt_decode(token);
        const expire_time = new Date(decodedToken.exp * 1000);
        console.log(expire_time.getTime() > (new Date()).getTime())
        
        if (expire_time.getTime() > (new Date()).getTime()) {
            if (request) {
                console.log(data);
                return await request(endpoint, data);
            }
        }
        else{
            try {
                const apiEndpoint = await checkRefreshToken();
                console.log(apiEndpoint)
                if (request) {
                    console.log(data);
                    return await request(apiEndpoint, data);
                }

            } catch (e) {
                throw e;

            }
        }
        console.log("done this");
        console.log(request);
       

    } else {
        throw "Unauthorized";
    }

}

//import { refreshToken } from './authService';
// refresh the access token if refresh token still valid
const checkRefreshToken = async () => {
    console.log("refreshToken");
    const token = localStorage.getItem('refresh_token');

    if (token) {
        const decodedToken = jwt_decode(token);
        const expire_time = new Date(decodedToken.exp * 1000);
        console.log(expire_time);

        if (expire_time.getTime() <= (new Date()).getTime()) {
            // need to redirect to login page
            throw "token expired";
        }
        else {
            // refresh token
            console.log('refresh');
            endpoint.post('auth/refresh/', { refresh: token })
                .then(response => {
                    //api.defaults.headers['Authorization'] = "JWT " + response.data.access;
                    localStorage.setItem('access_token', response.data.access);
                    console.log(response.data.access);
                    const enpointAPI = resetEndpoint(response.data.access);
                    return endpointAPI;
                })
                .catch(error => {
                    console.log(error);
                    throw "Error occurs";
                })
        }

    }
}

export { authRequest, nonAuthRequest };