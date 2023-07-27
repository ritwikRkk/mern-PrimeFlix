import apiFunctions from "../apiFunction/api.functions";

const castEndPoints = {
    details: ({ castId }) => `media/search/person/${castId}`,
    medias: ({ castId }) => `media/search/person/${castId}/combined_credits`,
    castQuery: () => `media/search/person/query/qs`,
}

const castApi = {
    getCastDetail: async ({ castId }) => {
        try {
            const response = await apiFunctions.get(castEndPoints.details({ castId }));
            return response;
        } catch (error) {
            return error;
        }
    },
    getMedias: async ({ castId }) => {
        try {
            const response = await apiFunctions.get(castEndPoints.medias({ castId }));
            return response;
        } catch (error) {
            return error;
        }
    },
    getCastQuery: async ({ qs }) => {
        try {
            const response = await apiFunctions.get(castEndPoints.castQuery(), qs);
            return response;
        } catch (error) {
            return error;
        }
    },

}

export default castApi;