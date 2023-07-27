const mediaType = {
    movie: "movie",
    tv: "tv",
};

const mediaCategory = {
    popular: "popular",
    top_rated: "top_rated",
};

const backdropPath = (imgEndPoint) => {
    if (imgEndPoint === null) {
        return "../images/no_img_backdrop.png";
    } else {
        // return `https://image.tmdb.org/t/p/w500${imgEndPoint}`;
        return `https://image.tmdb.org/t/p/original${imgEndPoint}`;
    }
};

const posterPath = (imgEndPoint) => {
    if (imgEndPoint === null) {
        return "../images/no_img_poster.png";
    } else {
        return `https://image.tmdb.org/t/p/w500${imgEndPoint}`;
        // return `https://image.tmdb.org/t/p/original${imgEndPoint}`;
    }
};

const youtubePath = (vidEndPoint) => `https://www.youtube.com/embed/${vidEndPoint}`;

const tmdbURL = {
    mediaType,
    mediaCategory,
    backdropPath,
    posterPath,
    youtubePath,
}

export default tmdbURL;