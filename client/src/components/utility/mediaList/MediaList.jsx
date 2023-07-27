import React, { useEffect, useState } from 'react';
import "./mediaList.css";
// import "../../styles/mediaList.css";
// import { results } from '../../Data';
import MediaCard from './mediaCard/MediaCard';
import CastCard from '../../pages/mediaDetails/castCard/CastCard';
// import SliderCard from '../sliderCard/SliderCard';
import mediaApi from '../../../api/modules/media.api';
import { getNewMovieContent } from '../../../store/slices/MovieSlice';
import { getNewTvContent } from '../../../store/slices/TvSlice';
import { useDispatch } from 'react-redux';
import LoadingCircular from '../loadingCircle/LoadingCircular';

const MediaList = (props) => {
    const dispatch = useDispatch();
    let data = props.data;
    // const [data, setData] = useState(props.data);
    const [page, setPage] = useState(2);
    const [isLoading, setIsLoading] = useState(false);
    let [grid, setGrid] = useState({ columns: 4, rows: 1 });
    let [mediaData, setMediaData] = useState(props.data.slice(0, grid.columns * grid.rows));
    useEffect(() => {
        if (props.page === "favorites") {
            setMediaData(props.data.slice(0, grid.columns * grid.rows))
        } else {
            if (data.length <= 20) {
                // For First Page Only
                setMediaData(props.data.slice(0, grid.columns * grid.rows))
            } else {
                // when more data is requested and it finally reaches here
                setIsLoading(false);
            }
        }
        // eslint-disable-next-line
    }, [data])

    const setGridVal = () => {
        // console.log('setGrid');
        let clientWidth = window.screen.availWidth;;
        if (clientWidth > 900 && grid.columns !== 4 && grid.rows !== 1) {
            // console.log(">900");
            setGrid({ columns: 4, rows: 1 });
            setMediaData(props.data.slice(0, 4 * 1))
        }
        if (clientWidth < 900 && grid.columns !== 3 && grid.rows !== 2) {
            // console.log("900");
            setGrid({ columns: 3, rows: 2 });
            setMediaData(props.data.slice(0, 3 * 2))

            // columns = 3;
        }
        if (clientWidth <= 600 && grid.columns !== 2 && grid.rows !== 2) {
            // console.log("600");
            setGrid({ columns: 2, rows: 2 });
            setMediaData(props.data.slice(0, 2 * 2))

            // columns = 2;
        }
    }
    useEffect(() => {
        setGridVal();
        // eslint-disable-next-line
    }, [])
    // window.addEventListener("resize", setGridVal);

    const fetchMoreData = async () => {
        if (props.path === "movie") {
            setPage((prevVal) => prevVal + 1);
            const media = await mediaApi.getList({ mediaType: props.page, qs: { page: page, sort_by: "popularity.desc" } });
            setTimeout(() => dispatch(getNewMovieContent(media.data.results)), 2000);
            // dispatch(getNewMovieContent(media.data.results));
            // setIsLoading(false);
            // console.log(media);
        }
        else if (props.path === "tv") {
            setPage((prevVal) => prevVal + 1);
            const media = await mediaApi.getList({ mediaType: props.page, qs: { page: page, sort_by: "popularity.desc" } });
            setTimeout(() => dispatch(getNewTvContent(media.data.results)), 2000);
            // dispatch(getNewTvContent(media.data.results));
            // setIsLoading(false);
            // console.log(media);
        }
        else if (props.path === "search") {
            // setTimeout(() => props.fetchMoreSearchData(), 2000);
            let response = await props.fetchMoreSearchData();
            if(response === false){
                setIsLoading(false);
                // console.log(response);
            }
            // props.fetchMoreSearchData();
            // setIsLoading(false);
            // console.log(media);
        }
    }
    useEffect(() => {
        if (mediaData.length === data.length && isLoading === false) {
            // console.log(mediaData.length, data.length, "calling fetchMoreData");
            setIsLoading(true);
            fetchMoreData();
            // setTimeout(() => {
            //     fetchMoreData();
            // }, 1000);
        }
        // eslint-disable-next-line
    }, [mediaData])

    let infiniteScroll = () => {
        let scrollHeight = document.documentElement.scrollHeight;
        let innerHeight = window.innerHeight;
        let scrollTop = Math.round(document.documentElement.scrollTop);
        // let footerHeight = document.querySelector("footer").clientHeight - 20; 

        // if ((scrollTop + innerHeight) >= (scrollHeight - footerHeight)) {  // -2 for decimal errors
        if ((scrollTop + innerHeight) >= (scrollHeight - 2)) {  // -2 for decimal errors
            // console.log(scrollTop, innerHeight, scrollHeight);
            // console.log("Reached bottom");
            let newData = data.slice(mediaData.length, mediaData.length + grid.columns * grid.rows);
            setMediaData(mediaData.concat(newData));
            // console.log(mediaData.length, props.data.length);
        }

    }
    window.addEventListener("scroll", infiniteScroll);

    const createMediaCard = (mediaCard) => {
        return (
            <div key={mediaCard.id || mediaCard._id}>
                {(props.page !== "cast" && props.page !== "favorites") &&
                    <MediaCard
                        key={mediaCard.id}
                        id={mediaCard.id}
                        img={mediaCard.poster_path}
                        rating={mediaCard.vote_average}
                        year={props.page === "movie" ? mediaCard.release_date : mediaCard.first_air_date}
                        name={props.page === "movie" ? mediaCard.title : mediaCard.original_name}
                        page={props.page}
                    />
                }
                {(props.page === "favorites") &&
                    <MediaCard
                        key={mediaCard.mediaId}
                        id={mediaCard.mediaId}
                        img={mediaCard.mediaPoster}
                        rating={mediaCard.mediaRating}
                        year={mediaCard.release_date}
                        name={mediaCard.mediaTitle}
                        page={props.pageType}
                    />
                }
                {props.page === "cast" &&
                    <CastCard
                        key={mediaCard.id}
                        id={mediaCard.id}
                        img={mediaCard.profile_path}
                        name={mediaCard.original_name}
                    />
                }

            </div>
        );
    }

    return (
        <div className={`media_list_container ${props.page}`}>
            <div className="media_list">
                {mediaData.map(createMediaCard)}
            </div>
            {(isLoading && props.page !== "favorites") &&
                <div className="loading_circle">
                    <LoadingCircular />
                </div>
            }
        </div>
    )
}

export default MediaList