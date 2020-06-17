import { authHeader, config } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    getAccount,
    getBeneficiaryAccount,
    getBeneficiaryAccounts,
    updateListBeneficiaryInfo,
    addBeneficiary,
    transferIntrabank,
    sendOtp,
    getOtp,
    delete: _delete
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(config.apiUrl + '/api/auth/', requestOptions)
        .then(handleResponse, handleError)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user && user.accessToken) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/api/customer', requestOptions).then(handleResponse, handleError);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(config.apiUrl + '/users/' + _id, requestOptions).then(handleResponse, handleError);
}

function getAccount() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(config.apiUrl + '/api/customer/accounts', requestOptions).then(handleResponse, handleError);
}

function getBeneficiaryAccount(accountInfo) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(accountInfo)
    };
    return fetch(config.apiUrl + '/api/account/', requestOptions).then(handleResponse, handleError);
}

function addBeneficiary(beneficiaryInfor) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(beneficiaryInfor)
    };
    return fetch(config.apiUrl + '/api/customer/add-beneficiary', requestOptions).then(handleResponse, handleError);
}


function updateListBeneficiaryInfo(listInfo) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(listInfo)
    };
    return fetch(config.apiUrl + '/api/customer/update-beneficiary/', requestOptions).then(handleResponse, handleError);
}

function getBeneficiaryAccounts() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader() },
    };
    return fetch(config.apiUrl + '/api/customer/beneficiaries', requestOptions).then(handleResponse, handleError);
}

function transferIntrabank(transferInfor) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(transferInfor)
    };
    return fetch(config.apiUrl + '/api/customer/intrabank-transfer-money/', requestOptions).then(handleResponse, handleError);
}

function getOtp() {
    const requestOptions = {
        method: 'GET',
        headers: { ...authHeader() },
    };
    return fetch(config.apiUrl + '/api/auth/otp', requestOptions).then(handleResponse, handleError);
}

function sendOtp(optMgs) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(optMgs)
    };
    return fetch(config.apiUrl + '/api/auth/otp', requestOptions).then(handleResponse, handleError);
}

//----------------------------------
function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(config.apiUrl + '/api/customer/add', requestOptions).then(handleResponse, handleError);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return null
    // return fetch(config.apiUrl + '/users/' + user.id, requestOptions).then(handleResponse, handleError);
}



// prefixed function name with underscore because delete is a reserved word in javascript

function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };
    return null
    //return fetch(config.apiUrl + '/users/' + id, requestOptions).then(handleResponse, handleError);
}

function handleResponse(response) {
    return new Promise((resolve, reject) => {
        if (response.ok) {
            // return json if it was returned in the response
            var contentType = response.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                response.json().then(json => resolve(json));
            } else {
                resolve();
            }
        } else {
            // return error message from response body
            response.text().then(text => reject(text));
        }
    });
}

function handleError(error) {
    return Promise.reject(error && error.message);
}