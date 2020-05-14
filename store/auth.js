
import { login, signup, logout } from "../services/authService";
export const state = () => ({
    authenticated: false
})
export const mutations = {

    setAuthStatus(state, status) {
        state.authenticated = status
    }
}

export const actions = {
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