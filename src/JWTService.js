 const saveToken = (token) => {
    window.localStorage.setItem('id_token',token);
}
 const getToken = () => {
    return window.localStorage.getItem('id_token');

}
const removeToken = () => {
    window.localStorage.removeItem('id_token');
}

export default {saveToken,getToken,removeToken};