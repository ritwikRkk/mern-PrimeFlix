import apiFunctions from "../apiFunction/api.functions";


const mediaEndPoints = {
    list: ({ mediaType }) => `media/search/${mediaType}`,
    genre: ({ mediaType }) => `media/genres/${mediaType}`,
    mediaDetail: ({ mediaType, mediaId }) => `media/search/${mediaType}/${mediaId}`,
    cast: ({ mediaType, mediaId }) => `media/search/${mediaType}/${mediaId}/credits`,
    images: ({ mediaType, mediaId }) => `media/search/${mediaType}/${mediaId}/images`,
    videos: ({ mediaType, mediaId }) => `media/search/${mediaType}/${mediaId}/videos`,
    recommendations: ({ mediaType, mediaId }) => `media/search/${mediaType}/${mediaId}/recommendations`,
    mediaQuery: ({ mediaType }) => `media/search/query/${mediaType}`,
}

const mediaApi = {
    getList: async ({ mediaType, qs }) => {
        try {
            // console.log(qs)
            const response = await apiFunctions.get(mediaEndPoints.list({ mediaType }), qs);
            return response;
        } catch (error) {
            return error;
        }
    },
    getGenre: async ({ mediaType }) => {
        try {
            const response = await apiFunctions.get(mediaEndPoints.genre({ mediaType }));
            return response;
        } catch (error) {
            return error;
        }
    },
    getMediaDetail: async ({ mediaType, mediaId }) => {
        try {
            const response = await apiFunctions.get(mediaEndPoints.mediaDetail({ mediaType, mediaId }));
            return response;
        } catch (error) {
            return error;
        }
    },
    getCast: async ({ mediaType, mediaId }) => {
        try {
            const response = await apiFunctions.get(mediaEndPoints.cast({ mediaType, mediaId }));
            return response;
        } catch (error) {
            return error;
        }
    },
    getImages: async ({ mediaType, mediaId }) => {
        try {
            const response = await apiFunctions.get(mediaEndPoints.images({ mediaType, mediaId }));
            return response;
        } catch (error) {
            return error;
        }
    },
    getVideos: async ({ mediaType, mediaId }) => {
        try {
            const response = await apiFunctions.get(mediaEndPoints.videos({ mediaType, mediaId }));
            return response;
        } catch (error) {
            return error;
        }
    },
    getRecommendations: async ({ mediaType, mediaId }) => {
        try {
            const response = await apiFunctions.get(mediaEndPoints.recommendations({ mediaType, mediaId }));
            return response;
        } catch (error) {
            return error;
        }
    },
    getMediaQuery: async ({ mediaType, qs }) => {
        try {
            const response = await apiFunctions.get(mediaEndPoints.mediaQuery({ mediaType }), qs);
            return response;
        } catch (error) {
            return error;
        }
    },
}

export default mediaApi;