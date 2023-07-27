import apiFunctions from "../apiFunction/api.functions";

const favoriteEndPoints = {
    getFavorites: () => `favourite/fetchallfavourites`,
    addFavorites: () => `favourite/addfavourite`,
    deleteFavorites: ( favoriteId ) => `favourite/delete/${favoriteId}`,
}

const favoriteApi = {
    getFavorites: async (token) => {
        try {
            const response = await apiFunctions.getData(favoriteEndPoints.getFavorites(), token);
            return response;
        } catch (error) {
            return error;
        }
    },
    addFavorites: async (favorite, token) => {
        try {
            const response = await apiFunctions.postData(favoriteEndPoints.addFavorites(), favorite, token);
            return response;
        } catch (error) {
            return error;
        }
    },
    deleteFavorites: async (favoriteId, token) => {
        try {
            const response = await apiFunctions.delete(favoriteEndPoints.deleteFavorites(favoriteId), token);
            return response;
        } catch (error) {
            return error;
        }
    },

}

export default favoriteApi;