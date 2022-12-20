import axios from "axios";

export const signup = (body) => axios.post('/api/1.0/users', body);

export const changeLanguage = language => {
    axios.defaults.headers['accept-language'] = language;
}

export const login = (creds) => {
    return axios.post('/api/1.0/auth', {}, {auth: creds});
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

export const setUserPost = (postBody) => axios.post('/api/1.0/posts', postBody);

// export const getUserAllPost = (size = 10, number = 0) => {
//     return axios.get(`/api/1.0/posts?pageSize=${size}&currentPage=${number}`)
// }

export const getPost = (number = 0,username) => {
    const path = username ? `/api/1.0/users/${username}/posts?currentPage=` : `/api/1.0/posts?currentPage=`;
    return axios.get(path + number);
}

export const getOldPosts = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/posts/` : `/api/1.0/posts/`;
    return axios.get(path + id);
}

export const getNewPostCount = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/posts/${id}?count=true` : `/api/1.0/posts/${id}?count=true`;
    return axios.get(path);
}

export const getNewPosts = (id, username) => {
    const path = username ? `/api/1.0/users/${username}/posts/${id}?direction=after` : `/api/1.0/posts/${id}?direction=after`
    return axios.get(path);
}
