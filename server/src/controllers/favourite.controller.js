import favouriteModel from "../models/Favourite.js";

const addfavourite = async (req, res) =>{
    let success = false;
    try {
        // const { movieId} = req.params;

        // CHECK IF THE SAME MOVIE IS ALREADY ADDED AS A FAVORITE
        const favourite = await favouriteModel.findOne({ $and: [ { mediaId: req.body.mediaId }, { user: req.user.id} ] });
        if(favourite) return res.json({ success, "error": "Duplicate favourite"});

        const newFavourite = await favouriteModel.create({
            user: req.user.id,
            ...req.body
        });
        success = true;
        res.json({success, newFavourite});
    } catch (error) {
        res.json(error);
    }
}

const getFavourites = async (req, res) =>{
    let success = false;
    try {
        // console.log(req.user.id);
        const favourites = await favouriteModel.find({user: req.user.id}).sort({ createdAt: 'desc' });
        if(favourites.length === 0) return res.json({success, "errors": "No favourites found for this user Id."});
        success = true;
        res.json({success, favourites});
    } catch (error) {
        return res.json({"error message": error.message});
    }
}

const deleteFavourite = async (req, res) =>{
    let success = false;
    try {
        const { favouriteId } = req.params;
        // console.log(favouriteId);
        // const review = await reviewModel.findOneAndDelete({ _id: reviewId, user: req.user.id });
        const favourite = await favouriteModel.findOneAndDelete({ $and: [ { _id: favouriteId }, { user: req.user.id} ] });
        if(!favourite) return res.json({success, "error": "No favourite found"});
        success = true;
        return res.json({success, "msg": "favourite deleted successfully", favourite});
    } catch (error) {
        return res.json({"error message": error.message});
    }
}

export default {addfavourite, getFavourites, deleteFavourite};