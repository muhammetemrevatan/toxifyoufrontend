import axios from "axios";

export const signup = (body) => axios.post('/api/1.0/users', body);

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}

export const login = (creds) => {
    return axios.post('api/1.0/auth', {}, {auth: creds});
}

export const getUsers = (size = 3, number = 0) => {
    return axios.get(`/api/1.0/users?pageSize=${size}&currentPage=${number}`);
}

export const setAuthorizationHeader = ({username, password, isLoggedIn}) => {
    if (isLoggedIn) {
        axios.defaults.headers['Authorization'] = `Basic ${btoa(username + ':' + password)}`;
    } else {
        delete axios.defaults.headers['Authorization'];
    }
}

export const getUser = username => {
    return axios.get(`/api/1.0/users/${username}`);
}

export const updateUser = (username, body) => {
    return axios.put(`/api/1.0/users/${username}`,body);
}