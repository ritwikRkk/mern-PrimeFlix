// import * as dotenv from 'dotenv';
// dotenv.config();

const baseUrl = process.env.TMDB_BASE_URL;
const key = process.env.TMDB_KEY;

const fetchUrl = (endpoint, qs) => {
    const query = new URLSearchParams(qs);
    const queryString = query.toString();
    const url = `${baseUrl}${endpoint}?api_key=${key}&${queryString}`;
    // console.log(url);
    // console.log(qs, query, queryString, url);
    return url;
};

export default {fetchUrl};