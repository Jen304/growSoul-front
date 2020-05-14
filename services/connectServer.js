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
const endpoint = axios.create({
    baseURL: 'http://127.0.0.1:8000/v1/',//'http://ec2-3-23-98-73.us-east-2.compute.amazonaws.com/v1/',
    timeout: 5000,
    headers: {
        'Authorization': "JWT " + localStorage.getItem('access_token'),

    }
});
const resetEndpoint = () => {
    endpoint.defaults.headers['Authorization'] = "JWT " + localStorage.getItem('access_token');
}
const nonAuthRequest = async (request, data) => {
    await request(endpoint, data);
    // after send that request need to resetEndpoint
    resetEndpoint();
}
const authRequest = async (request, data) => {
    //console.log(request)
    const token = localStorage.getItem('access_token');
    //console.log(token)

    if (token) {
        console.log("token exisit")
        const decodedToken = jwt_decode(token);
        const expire_time = new Date(decodedToken.exp * 1000);
        console.log(expire_time.getTime() > (new Date()).getTime())

        if (expire_time.getTime() <= (new Date()).getTime()) {
            try {
                await checkRefreshToken();
                // check the request is exist or not

            } catch (e) {
                throw e;

            }

        }
        console.log("done this");
        console.log(request);
        if (request) {
            console.log(data);
            return await request(endpoint, data);
        }

    } else {
        throw "Unauthorized";
    }

}
import jwt_decode from 'jwt-decode'
import { refreshToken } from './authService';
// refresh the access token if refresh token still valid
const checkRefreshToken = async () => {
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
            refreshToken(endpoint);
        }

    }
}

export { authRequest, nonAuthRequest };