
export const state = () => ({
    /*
    axiosInstance: axios.create({
        baseURL: 'http://127.0.0.1:8000/v1/',
        timeout: 5000,
        headers: {
            'Authorization': "JWT " + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
            'accept': 'application/json'
        }
    })*/

})



export const mutations = {
    refreshToken(state, newToken) {
        state.axiosInstance.defaults.headers['Authorization'] = "JWT " + newToken;

    }
}

