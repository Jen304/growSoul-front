import jwt_decode from 'jwt-decode'
import { authRequest } from '../services/connectServer';

const checkRefreshToken = async ({ store, redirect }) => {
    const token = localStorage.getItem('refresh_token');
    if (token) {
        const decodedToken = jwt_decode(token);
        const expire_time = new Date(decodedToken.exp * 1000);
        console.log(expire_time);

        if (expire_time.getTime() <= (new Date()).getTime()) {
            // need to redirect to login page
            return redirect('/login')
        }
        else {
            // refresh token
            await store.dispatch('refreshAccessToken', token);
        }

    }
}
export default async function ({ store, redirect }) {
    //console.log('auth middleware')
    try {
        await authRequest();
    } catch (e) {
        console.log(e);
        redirect('/login');
    }





}

