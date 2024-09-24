import axios from 'axios';

const API_TOKEN = '' ;

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.headers.common['Authorization'] = `Bearer ${API_TOKEN}`;
axios.defaults.headers.common['accept'] = 'application/json';

export const getMovies = async (url, query) => {
  const { data } = await axios.get(url + query);
  return data;
};