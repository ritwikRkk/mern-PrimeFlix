
# PrimeFlix

A MERN stack Movie website, where you can find latest and trending movies/tv-shows, and even comment down your thoughts on it, by creating your account.

## Features
This website has several Features, which are developed from scratch, without using any pre-built libraries.

##### Features without any pre-built libraries
- Light/Dark Mode
- Top scroller
- Auto Image Player/Slider
- Infinite scroller
- Notification Bar
- Horizontal Image/video Slider
- Custom Form Validator with warning message
- Device Friendly
- User Login/SignUp
- User Password Change
- Add/Remove Favorites
- Add/Edit/Delete comments

##### Features having pre-built libraries
- Top Loading Bar
- Spinner

## Demo

[See the Live Project here]( https://primeflix-sage.vercel.app)

## Preview
#### Images
![PrimeFlix Screenshot Home](https://raw.githubusercontent.com/ritwikRkk/images-db/main/primeFlix/home.png)

![PrimeFlix Screenshot Movie Hero](https://raw.githubusercontent.com/ritwikRkk/images-db/main/primeFlix/movie_hero.png)

![PrimeFlix Screenshot Movie List](https://raw.githubusercontent.com/ritwikRkk/images-db/main/primeFlix/movie_list.png)

![PrimeFlix Screenshot Categories](https://raw.githubusercontent.com/ritwikRkk/images-db/main/primeFlix/categories.png)

![PrimeFlix Screenshot Favorites](https://raw.githubusercontent.com/ritwikRkk/images-db/main/primeFlix/favorites.png)

![PrimeFlix Screenshot Search](https://raw.githubusercontent.com/ritwikRkk/images-db/main/primeFlix/search.png)

![PrimeFlix Screenshot Login](https://raw.githubusercontent.com/ritwikRkk/images-db/main/primeFlix/login.png)

![PrimeFlix Screenshot signup](https://raw.githubusercontent.com/ritwikRkk/images-db/main/primeFlix/signup.png)

#### Video

https://github.com/ritwikRkk/mern-PrimeFlix/assets/121736908/cc9089d5-b436-4374-a32d-b4b8800f32fc


## Environment Variables

To run this project, create a .env file in the root directory of the project, and copy/paste the code below:

#### Backend/server

`MONGODB_URI=mongodb://127.0.0.1:27017/mern-movie-2023`

`JWT_TOKEN_SECRET=ANY STRING`

`PORT=5000`

`TMDB_BASE_URL=https://api.themoviedb.org/3/`

`TMDB_KEY= YOUR TMDB API KEY`

#### Frontend/client

`REACT_APP_API_URI=YOUR BACKEND DOMAIN + /api/v1`

## Installation
To Run this project locally on your computer
Follow the steps below:

STEP 1: First Install Monogodb by following the links below:

[Monogodb download](https://www.mongodb.com/try/download/community)

[Mongodb Shell](https://www.mongodb.com/try/download/shell)

[Installation video Link]( https://www.youtube.com/watch?v=oC6sKlhz0OE&list=WL)

STEP 2: Create a Free "The Movie Database (TMDB)" account

[create account here](https://www.themoviedb.org/)

[Get Your TMDB API Key Here](https://www.themoviedb.org/settings/api)

STEP 3: Clone the entire project

```bash
  git clone https://github.com/ritwikRkk/mern-PrimeFlix.git
```

#### Backend/server

Go to the project directory

```bash
  cd mern-PrimeFlix/server/
```
```bash
  rm src/middlewares/validateApi.js
```

Install dependencies

```bash
  npm install
```
- Add all the environment variables

- Comment-out/Delete Line no. 11 and 24

- Replace line no. 17 (code below) with REACT     Default Port 3000, or you can directly replace it with frontend origin URL:

 (you can also delete line no. 17)

```bash
origin: "http://localhost:3000"
```
  
Start the server

```bash
  nodemon .\index.js
```

#### Frontend/Client

Go to the project directory

```bash
  cd mern-PrimeFlix/client/
```

Install dependencies

```bash
  npm install
```
Add all the environment variables

Start the server

```bash
  npm run start
```


## Resources
The Resources used to create this app is listed below:
#### Backend/Server
[express](https://www.npmjs.com/package/express)

[mongoose](https://www.npmjs.com/package/mongoose)

[bcryptjs](https://www.npmjs.com/package/bcryptjs)

[cors](https://www.npmjs.com/package/cors)

[dotenv](https://www.npmjs.com/package/dotenv)

[express-validator](https://www.npmjs.com/package/express-validator)

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

[nodemon](https://www.npmjs.com/package/nodemon)

#### Frontend/Client
[Create React App](https://create-react-app.dev/docs/getting-started)

[@emotion/styled](https://www.npmjs.com/package/@emotion/styled)

[@fvilers/disable-react-devtools](https://www.npmjs.com/package/@fvilers/disable-react-devtools)

[@mui/material](https://www.npmjs.com/package/@mui/material)

[@reduxjs/toolkit](https://www.npmjs.com/package/@reduxjs/toolkit)

[react-redux](https://www.npmjs.com/package/react-redux)

[react-router-dom](https://www.npmjs.com/package/react-router-dom)
## Roadmap

- Add User's comments section, where a user can see all of his/her comments on different movies/tv-series.
## Deployment

To deploy this project

STEP 1: Go to the project directory

STEP 2: Create a git repository, commit the changes, and push the entire backend folder and client folder to the same remote git repository.

STEP 3: Deploy using Vercel

[Deployment video tutorial](https://www.youtube.com/watch?v=YYmzj5DK_5s)



## Report Issues
[Report Issues](https://github.com/ritwikRkk/mern-PrimeFlix/issues/new)
## 🔗 Connect with me
[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://portfolio-ritwik.vercel.app/)



## License

[MIT](https://choosealicense.com/licenses/mit/)

