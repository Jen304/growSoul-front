import axios from 'axios';
import { login, refreshToken, signup } from "../services/authService";
export const state = () => ({
    axiosInstance: axios.create({
        baseURL: 'http://127.0.0.1:8000/v1/',
        timeout: 5000,
        headers: {
            'Authorization': "JWT " + localStorage.getItem('access_token'),

        }
    })
})
export const mutations = {
    setNewTokenToHeader(state, newToken) {
        state.axiosInstance.defaults.headers['Authorization']
            = "JWT " + newToken;

    }
}

export const actions = {
    // user info should be an objects
    async userLogin({ commit, state }, userInfo) {
        console.log('login')
        const api = state.axiosInstance;
        const res = await login(api, userInfo);
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        commit('setNewTokenToHeader', res.access);

    },
    async refreshAccessToken({ commit, state }, token) {
        const api = state.axiosInstance;
        const res = await refreshToken(api, token);
        localStorage.setItem('access_token', res.access);
        //localStorage.setItem('refresh_token', res.refresh);
        commit('setNewTokenToHeader', res.access);

    },
    async userSignup({ commit, state }, userInfo) {
        const api = state.axiosInstance;
        //await login(api, userInfo);
        const res = await signup(api, userInfo);
        localStorage.setItem('access_token', res.access);
        localStorage.setItem('refresh_token', res.refresh);
        commit('setNewTokenToHeader', res.access);

    }
}