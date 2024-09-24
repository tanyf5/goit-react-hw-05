import axios from 'axios';

const API_TOKEN = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMTRhY2ZiZTdhZTE1YzI1YTZkOGYzOTVlOTk1ZmZhZCIsIm5iZiI6MTcyNzIwMjgyMS4yNTI0MTcsInN1YiI6IjY2ZjJmYjEwNTgzYzU2Y2RiMTI2N2IyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.t9hf_DQSU2eHWLW86qNU0to9_HGhOsyVc6yTvxM9Cd0' ;

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}`;
axios.defaults.headers.common['accept'] = 'application/json';

export const getMovies = async (url, query) => {
  const { data } = await axios.get(url + query);
  return data;
};