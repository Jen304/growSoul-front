import { authRequest } from '../services/connectServer';


export default async function ({ store, redirect }) {
    //console.log('auth middleware')
    try {
        console.log("middleware")
        await authRequest();
        store.commit('auth/setAuthStatus', true);
    } catch (e) {
        console.log(e);
        redirect('/login');
    }





}

