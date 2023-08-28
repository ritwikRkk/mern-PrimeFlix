import React, { useEffect, useState } from 'react';
import "./searchtype.css";
// import "../../../styles/searchtype.css";
import MediaList from '../../../utility/mediaList/MediaList';
import mediaApi from '../../../../api/modules/media.api';
import castApi from '../../../../api/modules/cast.api';

const SerachType = () => {

  const [btnActive, setBtnActive] = useState("movie");
  const [searchTxt, setSearchTxt] = useState("");
  const [movieData, setMovieData] = useState(null);
  const [tvData, setTvData] = useState(null);
  const [castData, setCastData] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // CHANGE THE ACTIVE BUTTON
  const handleClick = (event) => {
    const { name } = event.target;
    setBtnActive(name);
    setPage(1);
  }

  const fetchData = async (searchVal) => {
    setPage(1);
    if (btnActive === "movie") {
      // console.log("movie");
      const response = await mediaApi.getMediaQuery({ mediaType: "movie", qs: { query: searchVal, page: 1 } });
      // console.log(response);
      setMovieData(response.data.results);
      setTotalPages(response.data.total_pages);
    } else if (btnActive === "tv") {
      // console.log("tv");
      const response = await mediaApi.getMediaQuery({ mediaType: "tv", qs: { query: searchVal, page: 1 } });
      // console.log(response);
      setTvData(response.data.results);
      setTotalPages(response.data.total_pages);
    }
    else if (btnActive === "cast") {
      // console.log("cast");
      const response = await castApi.getCastQuery({ qs: { query: searchVal, page: 1 } });
      // console.log(response);
      setCastData(response.data.results);
      setTotalPages(response.data.total_pages);
    }
  }

  const fetchMoreData = async () => {
    if (btnActive === "movie" && page < totalPages) {
      setPage(page + 1);
      // console.log("Fetching more movie data", page +1);
      const response = await mediaApi.getMediaQuery({ mediaType: "movie", qs: { query: searchTxt, page: page + 1 } });
      setTimeout(() => setMovieData(movieData.concat(response.data.results)), 2000);
      // setMovieData(movieData.concat(response.data.results));
    } else if (btnActive === "movie" && page >= totalPages) {
      // console.log(false);
      return false;
    }

    if (btnActive === "tv" && page < totalPages) {
      setPage(page + 1);
      // console.log("Fetching more tv data", page +1);
      const response = await mediaApi.getMediaQuery({ mediaType: "tv", qs: { query: searchTxt, page: page + 1 } });
      setTimeout(() => setTvData(tvData.concat(response.data.results)), 2000);
      // setTvData(tvData.concat(response.data.results));
    } else if(btnActive === "tv" && page >= totalPages) {
      // console.log(false);
      return false;
    }

    if (btnActive === "cast" && page < totalPages) {
      setPage(page + 1);
      // console.log("Fetching more cast data", page +1);
      const response = await castApi.getCastQuery({ qs: { query: searchTxt, page: page + 1 } });
      // console.log(response);
      setTimeout(() => setCastData(castData.concat(response.data.results)), 2000);
      // setCastData(castData.concat(response.data.results));
    } else if(btnActive === "cast" && page >= totalPages) {
      // console.log(false);
      return false;
    }
  }

  useEffect(() => {
    if (searchTxt.length > 0) {
      fetchData(searchTxt);
    } else {
      setMovieData(null);
      setTvData(null);
      setCastData(null);
    }
    // eslint-disable-next-line
  }, [btnActive])


  const handleOnChange = (event) => {
    setSearchTxt(event.target.value);
    if (event.target.value.length > 0) {
      fetchData(event.target.value);
      // setMovieData(data);
    } else {
      setMovieData(null);
      setTvData(null);
      setCastData(null);
    }
  }

  return (
    <div className="search_type_container">

      <div className="search_type">
        <button name="movie" className={`search_btn ${btnActive === "movie" ? "btn_active" : ""}`} onClick={handleClick} > Movie </button>
        <button name="tv" className={`search_btn ${btnActive === "tv" ? "btn_active" : ""}`} onClick={handleClick} > Tv </button>
        <button name="cast" className={`search_btn ${btnActive === "cast" ? "btn_active" : ""}`} onClick={handleClick} > Cast </button>
      </div>

      <div className="search_box">
        <input type="search" className="" value={searchTxt} onChange={handleOnChange} placeholder="Type your query here" />
      </div>

      {/* <p style={{ color: "white" }}> {searchTxt} {btnActive} </p> */}
      {(movieData !== null && btnActive === "movie") && <MediaList path="search" page="movie" data={movieData} fetchMoreSearchData={fetchMoreData} />}
      {(tvData !== null && btnActive === "tv") && <MediaList path="search" page="tv" data={tvData} fetchMoreSearchData={fetchMoreData} />}
      {(castData !== null && btnActive === "cast") && <MediaList path="search" page="cast" data={castData} fetchMoreSearchData={fetchMoreData} />}

    </div>
  )
}

export default SerachType