import favoriteApi from "../../../api/modules/favorites.api";
import { addFavorite, removeFavorite } from "../../../store/slices/FavoriteSlice";

let getFavArr = (favorites, page) => {
    let favArr = [];
    if (favorites.length > 0) {
        favArr = favorites.filter((fav) => {
            return fav.mediaType === page;
        })
    }
    return favArr;
}

const checkFav = (favId, favArr, setFavId) => {
    for (let val of favArr) {
        if (val.mediaId === String(favId)) {
            setFavId(val._id);
            return true;
        }
        // console.log("checkFav called");
    }
}

const createFavorites = async (props, authToken) => {
    const { id, img, rating, year, name, page } = props;
    let favData = {
        "mediaId": id,
        "mediaType": page,
        "mediaTitle": name,
        "mediaPoster": img,
        "mediaRating": rating,
        "release_date": year
    }
    // let authToken = localStorage.getItem('auth-token');

    let data = await favoriteApi.addFavorites(favData, authToken);
    return data;

}

const removeFavorites = async (favId, authToken) => {
    let data = await favoriteApi.deleteFavorites(favId, authToken);
    return data;
}

const favoriteHandler = async (fnDetails, props) => {

    const { highlight, favId, setLoading, authToken, setFavId, setHightlight, dispatch } = fnDetails;
    // ALREADY FAVORITES --> DELETE FAVORITES
    if (highlight && favId) {
        setLoading(true);
        // console.log("delete favorite", favId);
        let data = await removeFavorites(favId, authToken);
        if (data.success) {
            // console.log(data, favId);
            setTimeout(() => {
                dispatch(removeFavorite(favId));
                setFavId(null);
                setHightlight(false);
                setLoading(false);

            }, 2000);
        }
    }

    // ADD FAVORITES
    else {
        setLoading(true);
        let data = await createFavorites(props, authToken);
        // console.log(data);
        if (data.success) {
            // console.log(data);
            setTimeout(() => {
                dispatch(addFavorite(data.newFavourite));
                setFavId(data.newFavourite._id)
                setHightlight(true);
                setLoading(false);
            }, 2000);
        }
    }
}


export { getFavArr, checkFav, createFavorites, removeFavorites, favoriteHandler } 