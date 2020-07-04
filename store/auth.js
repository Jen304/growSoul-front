
import { login, signup, logout } from "../services/authService";
import jwt_decode from 'jwt-decode'
export const state = () => ({
    authenticated: false
})
export const mutations = {

    setAuthStatus(state, status) {
        state.authenticated = status
    }
}

export const actions = {
    // check auth status
    async checkTokenFirstLoaded({commit}){
        const token = localStorage.getItem('refresh_token');
        const decodedToken = jwt_decode(token);
        const expire_time = new Date(decodedToken.exp * 1000);
        if (expire_time.getTime() <= (new Date()).getTime()) {
            // need to redirect to login page
            commit('setAuthStatus', false)
            throw "token expired";
           
        }else{
            commit('setAuthStatus', true)
        }
    },
    // user info should be an objects
    async userLogin({ commit }, userInfo) {
        //console.log('login')
        try {
            await login(userInfo);
            commit('setAuthStatus', true);
        } catch (e) {
            // need to add feature to announce user
            console.log(e);
        }

    },

    async userSignup({ commit }, userInfo) {
        //await login(api, userInfo);
        signup(userInfo);
        commit('setAuthStatus', true);
    },
    async logout({ commit }) {
        await logout();
        commit('setAuthStatus', false);
    }
}