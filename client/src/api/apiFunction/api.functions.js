

// const baseUrl = "http://localhost:5000/api/v1";
const baseUrl = process.env.REACT_APP_API_URI;

const apiFunctions = {
    get: async (endPoint, qs) => {
        const query = new URLSearchParams(qs);
        const queryString = query.toString();
        const url = `${baseUrl}/${endPoint}?${queryString}`;
        // console.log(qs, query, queryString, url);
        // console.log(url);
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'api-token': process.env.REACT_APP_API_TOKEN,
                },
            });
            const json = await response.json();
            // console.log(json);
            return json;

        } catch (error) {
            // console.error(error);
            return error;
        }
    },

    post: async (endPoint, data) => {
        const url = `${baseUrl}/${endPoint}`;
        // console.log(data);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-token': process.env.REACT_APP_API_TOKEN,
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            // console.log(json);
            return json;
        } catch (error) {
            console.error(error);
            return error;
        }

    },

    getData: async (endPoint, token) => {
        const url = `${baseUrl}/${endPoint}`;
        // console.log(token, query, queryString, url);
        // console.log(url);
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'api-token': process.env.REACT_APP_API_TOKEN,
                    'auth-token': token
                },
            });
            const json = await response.json();
            // console.log(json);
            return json;

        } catch (error) {
            // console.error(error);
            return error;
        }
    },

    putData: async (endPoint, data, token) => {
        const url = `${baseUrl}/${endPoint}`;
        // console.log(token, query, queryString, url);
        // console.log(url);
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'api-token': process.env.REACT_APP_API_TOKEN,
                    'auth-token': token
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            // console.log(json);
            return json;

        } catch (error) {
            // console.error(error);
            return error;
        }
    },

    postData: async (endPoint, data, token) => {
        const url = `${baseUrl}/${endPoint}`;
        // console.log(token, query, queryString, url);
        // console.log(url);
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-token': process.env.REACT_APP_API_TOKEN,
                    'auth-token': token
                },
                body: JSON.stringify(data)
            });
            const json = await response.json();
            // console.log(json);
            return json;

        } catch (error) {
            // console.error(error);
            return error;
        }
    },

    delete: async (endPoint, token) => {
        const url = `${baseUrl}/${endPoint}`;
        // console.log(token, query, queryString, url);
        // console.log(url);
        try {
            const response = await fetch(url, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'api-token': process.env.REACT_APP_API_TOKEN,
                    'auth-token': token
                },
            });
            const json = await response.json();
            // console.log(json);
            return json;

        } catch (error) {
            // console.error(error);
            return error;
        }
    },


}

export default apiFunctions;