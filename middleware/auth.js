import { authRequest } from '../services/connectServer';


export default async function ({ redirect }) {
    //console.log('auth middleware')
    try {
        console.log("middleware")
        await authRequest();
    } catch (e) {
        console.log(e);
        redirect('/login');
    }





}

