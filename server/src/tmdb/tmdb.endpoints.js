import tmdbUrl from "./tmdb.url.js";


const tmdbEndpoints = {
    mediaList: (mediaType, queryString) => tmdbUrl.fetchUrl(`discover/${mediaType}`, queryString),
    mediaGenres: (mediaType) => tmdbUrl.fetchUrl(`genre/${mediaType}/list`),
    mediaQuery: (mediaType, queryString) => tmdbUrl.fetchUrl(`search/${mediaType}`, queryString),
    mediaDetail: (mediaType, mediaId) => tmdbUrl.fetchUrl(`${mediaType}/${mediaId}`),
    mediaCredits: (mediaType, mediaId) => tmdbUrl.fetchUrl(`${mediaType}/${mediaId}/credits`),
    mediaVideos: (mediaType, mediaId) => tmdbUrl.fetchUrl(`${mediaType}/${mediaId}/videos`),
    mediaImages: (mediaType, mediaId) => tmdbUrl.fetchUrl(`${mediaType}/${mediaId}/images`),
    mediaRecommendations: (mediaType, mediaId) => tmdbUrl.fetchUrl(`${mediaType}/${mediaId}/recommendations`),
    personDetail: (personId) => tmdbUrl.fetchUrl(`person/${personId}`),
    personQuery: (queryString) => tmdbUrl.fetchUrl(`search/person`, queryString),
    combinedCredits: (personId) => tmdbUrl.fetchUrl(`person/${personId}/combined_credits`),
}


export default tmdbEndpoints;