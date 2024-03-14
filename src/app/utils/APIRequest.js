const BASE_URL = process.env.REACT_APP_BASE_URL;
const handleResponse = async (response) => {
    if (!response.ok) {
        const error = await response.json();
        console.log("🚀 ~ file: APIRequest.js:9 ~ handleResponse ~ error:", error)
        throw error.message || 'Something went wrong';
    }
    return response.json();
};




const getBody = (data) => (data instanceof FormData) ? data : JSON.stringify(data)



export const getAccessToken = () => {
    return window.localStorage.getItem('jwt_access_token');
};

// const getHeaders = (body = {}) => {
//     // You can customize headers based on your needs (e.g., authentication headers)
//     return {
//         ...(getAccessToken() && { Authorization: `Bearer ${getAccessToken()}` }),
//         ...(!(body instanceof FormData) && {
//             'Content-Type': 'application/json',
//         })


//     };
// };

const getHeaders = (body = {}) => {
    // You can customize headers based on your needs (e.g., authentication headers)
    const headers = {
        ...(getAccessToken() && { Authorization: `Bearer ${getAccessToken()}` }),
        ...(!(body instanceof FormData) && {
            'Content-Type': 'application/json',
        }),
    };

    // Add any additional headers needed for CORS
    headers['Access-Control-Allow-Origin'] = '*';
    headers['Access-Control-Allow-Headers'] = 'Authorization, Content-Type';
    headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, PATCH, DELETE';

    return headers;
};


const buildQueryString = (params) => {
    return Object.keys(params)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
        .join('&');
};


export const APIRequest = {

    get: async (endpoint, params = {}) => {
        const queryString = buildQueryString(params);
        const response = await fetch(`${BASE_URL}/${endpoint}?${queryString}`, {
            method: 'GET',
            headers: getHeaders(),
        });

        return handleResponse(response);
    },

    post: async (endpoint, data, params = {}) => {
        const queryString = buildQueryString(params);
        const response = await fetch(`${BASE_URL}/${endpoint}${queryString}`, {
            method: 'POST',
            headers: getHeaders(data),
            body: getBody(data),
        });

        return handleResponse(response);
    },

    put: async (endpoint, data, params = {}) => {
        const queryString = buildQueryString(params);
        const response = await fetch(`${BASE_URL}/${endpoint}?${queryString}`, {
            method: 'PUT',
            headers: getHeaders(data),
            body: getBody(data),
        });

        return handleResponse(response);
    },

    patch: async (endpoint, data, params = {}) => {
        const queryString = buildQueryString(params);
        const response = await fetch(`${BASE_URL}/${endpoint}?${queryString}`, {
            method: 'PATCH',
            headers: getHeaders(data),
            body: getBody(data),
        });

        return handleResponse(response);
    },

    remove: async (endpoint, params = {}) => {
        const queryString = buildQueryString(params);
        const response = await fetch(`${BASE_URL}/${endpoint}?${queryString}`, {
            method: 'DELETE',
            headers: getHeaders(),
        });

        return handleResponse(response);
    }
}