import { useEffect, useState } from 'react';
import { getMovies } from '../../apiService/movies';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

export default function HomePage() {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const url = 'trending/movie/day';
  const query = '?language=en-US';

  useEffect(() => {
    setError('');
    setLoader(true);
    async function fetchData() {
      try {
        const { results } = await getMovies(url, query);
        setTrendingMovies(results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className={styles.homePage}>
      {trendingMovies.length > 0 && <h1>Trending today</h1>}
      {loader && <Loader />}
      {error && <ErrorMessage message={error} />}
      {trendingMovies.length > 0 && <MovieList movies={trendingMovies} />}
    </div>
  );
}