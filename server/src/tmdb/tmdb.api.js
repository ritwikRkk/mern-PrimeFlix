import tmdbEndpoints from "./tmdb.endpoints.js";
import fetchapi from "../apicall/fetchapi.js";

const tmdbApi = {
    mediaList: async (mediaType, queryString) => await fetchapi.fetchTmdb(tmdbEndpoints.mediaList(mediaType, queryString)),
    mediaGenres: async (mediaType) => await fetchapi.fetchTmdb(tmdbEndpoints.mediaGenres(mediaType)),
    mediaQuery: async (mediaType, queryString) => await fetchapi.fetchTmdb(tmdbEndpoints.mediaQuery(mediaType, queryString)),
    mediaDetail: async (mediaType, mediaId) => await fetchapi.fetchTmdb(tmdbEndpoints.mediaDetail(mediaType, mediaId)),
    mediaCredits: async (mediaType, mediaId) => await fetchapi.fetchTmdb(tmdbEndpoints.mediaCredits(mediaType, mediaId)),
    mediaVideos: async (mediaType, mediaId) => await fetchapi.fetchTmdb(tmdbEndpoints.mediaVideos(mediaType, mediaId)),
    mediaImages: async (mediaType, mediaId) => await fetchapi.fetchTmdb(tmdbEndpoints.mediaImages(mediaType, mediaId)),
    mediaRecommendations: async (mediaType, mediaId) => await fetchapi.fetchTmdb(tmdbEndpoints.mediaRecommendations(mediaType, mediaId)),
    personDetail: async (personId) => await fetchapi.fetchTmdb(tmdbEndpoints.personDetail(personId)),
    personQuery: async (queryString) => await fetchapi.fetchTmdb(tmdbEndpoints.personQuery(queryString)),
    combinedCredits: async (personId) => await fetchapi.fetchTmdb(tmdbEndpoints.combinedCredits(personId)),
}

export default tmdbApi;