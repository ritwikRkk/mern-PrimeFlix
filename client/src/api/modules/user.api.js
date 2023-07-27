import apiFunctions from "../apiFunction/api.functions";

const userEndPoints = {
    signup: () => `user/signup`,
    login: () => `user/login`,
    userInfo: () => `user/getuserinfo`,
    updatePassword: () => `user/update-password`,
}

const userApi = {
    signup: async (credentials) => {
        const data = {
            "username": credentials.userName,
            "email": credentials.email,
            "password": credentials.password,
            "confirmPassword": credentials.cpassword
        }

        try {
            const response = await apiFunctions.post(userEndPoints.signup(), data);
            return response;
        } catch (error) {
            return error;
        }
    },

    login: async (credentials) => {
        try {
            const response = await apiFunctions.post(userEndPoints.login(), credentials);
            return response;
        } catch (error) {
            return error;
        }
    },

    userInfo: async (token) => {
        try {
            const response = await apiFunctions.getData(userEndPoints.userInfo(), token);
            return response;
        } catch (error) {
            return error;
        }
    },

    updatePassword: async (credentials, token) => {
        const data = {
            "oldPassword": credentials.oldpassword,
            "newPassword": credentials.password,
            "confirmNewPassword": credentials.cpassword
        }
        try {
            const response = await apiFunctions.putData(userEndPoints.updatePassword(), data, token);
            return response;
        } catch (error) {
            return error;
        }
    },
}

export default userApi;