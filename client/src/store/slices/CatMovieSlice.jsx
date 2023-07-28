import { createSlice } from "@reduxjs/toolkit";

import { createAsyncThunk } from "@reduxjs/toolkit";
import mediaApi from "../../api/modules/media.api";

const initialState = {
  actionContent: [],
  comedyContent: [],
  animationContent: [],
  crimeContent: [],
  dramaContent: [],
  isLoading: true,
  error: null,
}

// const params = ["with_genres=action", "with_genres=Adventure", "with_genres=Animation", "with_genres=Comedy", "with_genres=crime", ]
const genres = [
  {
    "id": 28,
    "name": "Action"
  },
  {
    "id": 12,
    "name": "Adventure"
  },
  {
    "id": 16,
    "name": "Animation"
  },
  {
    "id": 35,
    "name": "Comedy"
  },
  {
    "id": 80,
    "name": "Crime"
  },
  {
    "id": 99,
    "name": "Documentary"
  },
  {
    "id": 18,
    "name": "Drama"
  },
  {
    "id": 10751,
    "name": "Family"
  },
  {
    "id": 14,
    "name": "Fantasy"
  },
  {
    "id": 36,
    "name": "History"
  },
  {
    "id": 27,
    "name": "Horror"
  },
  {
    "id": 10402,
    "name": "Music"
  },
  {
    "id": 9648,
    "name": "Mystery"
  },
  {
    "id": 10749,
    "name": "Romance"
  },
  {
    "id": 878,
    "name": "Science Fiction"
  },
  {
    "id": 10770,
    "name": "TV Movie"
  },
  {
    "id": 53,
    "name": "Thriller"
  },
  {
    "id": 10752,
    "name": "War"
  },
  {
    "id": 37,
    "name": "Western"
  }
]

export const fetchCatMovieContent = createAsyncThunk(
  'fetchCatMovieContent',
  async (req) => {
    const action = await mediaApi.getList({ mediaType: req.mediaType, qs: { page: req.qs.page, with_genres: genres[0].id } });
    const comedy = await mediaApi.getList({ mediaType: req.mediaType, qs: { page: req.qs.page, with_genres: genres[3].id } });
    const animation = await mediaApi.getList({ mediaType: req.mediaType, qs: { page: req.qs.page, with_genres: genres[2].id } });
    const crime = await mediaApi.getList({ mediaType: req.mediaType, qs: { page: req.qs.page, with_genres: genres[4].id } });
    const drama = await mediaApi.getList({ mediaType: req.mediaType, qs: { page: req.qs.page, with_genres: genres[6].id } });
    return { action, comedy, animation, crime, drama };

  }
)

const catMovieSlice = createSlice({
  name: "catMovie",
  initialState,
  reducers: {

  },

  extraReducers: (builder) => {
    builder.addCase(fetchCatMovieContent.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchCatMovieContent.fulfilled, (state, action) => {
      state.isLoading = false
      // console.log(action.payload)
      state.actionContent = action.payload.action.data.results;
      state.comedyContent = action.payload.comedy.data.results;
      state.animationContent = action.payload.animation.data.results;
      state.crimeContent = action.payload.crime.data.results;
      state.dramaContent = action.payload.drama.data.results;
    })
    builder.addCase(fetchCatMovieContent.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
  },

});

export default catMovieSlice.reducer;
// --------------------------------------------------------------- //
