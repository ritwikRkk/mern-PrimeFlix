import tmdbApi from '../tmdb/tmdb.api.js';


const search = async (req, res) => {
    try {
        const { mediaType } = req.params;
        const queryString = req.query;
        // console.log(mediaType, queryString);
        const data = await tmdbApi.mediaList(mediaType, queryString);
        res.json({ mediaType: mediaType, data: data });
    } catch (error) {
        res.json(error);
    }
};

const querySearch = async (req, res) => {
    try {
        const { mediaType } = req.params;
        const queryString = req.query;
        const data = await tmdbApi.mediaQuery(mediaType, queryString);
        res.json({ mediaType: mediaType, data: data });
    } catch (error) {
        res.json(error);
    }
};

const fetchGenres = async (req, res) => {
    try {
        const { mediaType } = req.params;
        const data = await tmdbApi.mediaGenres(mediaType);
        res.json({ mediaType: mediaType, data: data });
        // console.log(mediaType);
    } catch (error) {
        res.json(error);
    }
};

const mediaDetails = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params;
        const data = await tmdbApi.mediaDetail(mediaType, mediaId);
        res.json({ mediaType: mediaType, data: data });
        // console.log(mediaType);
    } catch (error) {
        res.json(error);
    }
};

const mediaCredits = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params;
        const data = await tmdbApi.mediaCredits(mediaType, mediaId);
        res.json({ mediaType: mediaType, data: data });
        // console.log(mediaType);
    } catch (error) {
        res.json(error);
    }
};

const mediaVideos = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params;
        const data = await tmdbApi.mediaVideos(mediaType, mediaId);
        res.json({ mediaType: mediaType, data: data });
        // console.log(mediaType);
    } catch (error) {
        res.json(error);
    }
};
const mediaImages = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params;
        const data = await tmdbApi.mediaImages(mediaType, mediaId);
        res.json({ mediaType: mediaType, data: data });
        // console.log(mediaType);
    } catch (error) {
        res.json(error);
    }
};
const mediaRecommendations = async (req, res) => {
    try {
        const { mediaType, mediaId } = req.params;
        const data = await tmdbApi.mediaRecommendations(mediaType, mediaId);
        res.json({ mediaType: mediaType, data: data });
        // console.log(mediaType);
    } catch (error) {
        res.json(error);
    }
};
const personDetail = async (req, res) => {
    try {
        const { personId } = req.params;
        const data = await tmdbApi.personDetail(personId);
        res.json({ data: data });
        // console.log(mediaType);
    } catch (error) {
        res.json(error);
    }
};
const personQuery = async (req, res) => {
    try {
        const queryString = req.query;
        const data = await tmdbApi.personQuery(queryString);
        res.json({ data: data });
    } catch (error) {
        res.json(error);
    }
};
const combinedCredits = async (req, res) => {
    try {
        const { personId } = req.params;
        const data = await tmdbApi.combinedCredits(personId);
        res.json({ data: data });
        // console.log(mediaType);
    } catch (error) {
        res.json(error);
    }
};

export default {
    search,
    fetchGenres,
    querySearch,
    mediaDetails,
    mediaCredits,
    mediaVideos,
    mediaImages,
    mediaRecommendations,
    personDetail,
    personQuery,
    combinedCredits
};