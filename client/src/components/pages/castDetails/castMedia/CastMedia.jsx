import React, { useEffect, useState } from 'react';
// import "./castmedia.css";
import MediaCard from '../../../utility/mediaList/mediaCard/MediaCard';
import { useSelector } from 'react-redux';

const CastMedia = (props) => {
    const data = useSelector(state => state.cast.castMedias);

    let [grid, setGrid] = useState({ columns: 4, rows: 1 });
    let [mediaData, setMediaData] = useState(data.slice(0, grid.columns * grid.rows));

    const setGridVal = () => {
        // console.log('setGrid');
        let clientWidth = window.screen.availWidth;;
        if (clientWidth > 900 && grid.columns !== 4 && grid.rows !== 1) {
            // console.log(">900");
            setGrid({ columns: 4, rows: 1 });
            setMediaData(data.slice(0, 4 * 1))
        }
        if (clientWidth < 900 && grid.columns !== 3 && grid.rows !== 2) {
            // console.log("900");
            setGrid({ columns: 3, rows: 2 });
            setMediaData(data.slice(0, 3 * 2))

            // columns = 3;
        }
        if (clientWidth <= 600 && grid.columns !== 2 && grid.rows !== 2) {
            // console.log("600");
            setGrid({ columns: 2, rows: 2 });
            setMediaData(data.slice(0, 2 * 2))

            // columns = 2;
        }
    }
    useEffect(() => {
        setGridVal();
        // console.log(state);
        // eslint-disable-next-line
    }, [])
    // window.addEventListener("resize", setGridVal);

    let infiniteScroll = () => {
        let scrollHeight = document.documentElement.scrollHeight;
        let innerHeight = window.innerHeight;
        let scrollTop = Math.round(document.documentElement.scrollTop);
        let footerHeight = document.querySelector("footer").clientHeight - 20;

        if ((scrollTop + innerHeight) >= (scrollHeight - footerHeight)) {  // -2 for decimal errors
            // console.log("Reached bottom");
            let newData = data.slice(mediaData.length, mediaData.length + grid.columns * grid.rows);
            setMediaData(mediaData.concat(newData));
        }

    }
    window.addEventListener("scroll", infiniteScroll);

    const createMediaCard = (mediaCard) => {
        return (
            <MediaCard
                key={mediaCard.id}
                id={mediaCard.id}
                img={mediaCard.poster_path}
                rating={mediaCard.vote_average}
                year={mediaCard.media_type === "movie" ? mediaCard.release_date : mediaCard.first_air_date}
                name={mediaCard.media_type === "movie" ? mediaCard.title : mediaCard.original_name}
                page={mediaCard.media_type === "movie" ? "movie" : "tv"}
            />
        );
    }

    return (
        // <div className={`cast_media_container ${props.page}`}>
        //     <div className="cast_media_list">
        //         {mediaData.map(createMediaCard)}
        //     </div>
        // </div>
        <div className={`media_list_container`}>
            <div className="media_list">
                {mediaData.map(createMediaCard)}
            </div>
        </div>
    )
}

export default CastMedia