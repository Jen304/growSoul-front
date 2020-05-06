import jwt_decode from 'jwt-decode'
const checkRefreshToken = ({ store, redirect }) => {
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
            store.dispatch('refreshAccessToken', token);
        }

    }
}
export default function ({ store, redirect }) {
    console.log('auth middleware')

    // check access token
    const token = localStorage.getItem('access_token');

    if (token) {
        const decodedToken = jwt_decode(token);
        const expire_time = new Date(decodedToken.exp * 1000);
        console.log(expire_time.getTime() < (new Date()).getTime())

        if (expire_time.getTime() <= (new Date()).getTime()) {
            checkRefreshToken({ store, redirect });
        }

    } else {
        return redirect('/login')
    }


}

