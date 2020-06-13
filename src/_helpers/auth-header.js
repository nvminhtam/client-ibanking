import jwt_decode from 'jwt-decode';

export function authHeader() {
    // return authorization header with jwt token

    const token =
        JSON.parse(localStorage.getItem("user")) &&
        JSON.parse(localStorage.getItem("user"))["accessToken"];
    if (jwt_decode(token).exp < Date.now() / 1000) {
        // localStorage.clear();
        localStorage.removeItem(user);
        // localStorage.setItem('')
        return {}
    }

    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.accessToken) {
        return { 'x-access-token': user.accessToken };
    } else {
        return {};
    }
}