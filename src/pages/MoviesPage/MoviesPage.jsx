import { useEffect, useState } from 'react';
import { getMovies } from '../../apiService/movies';
import MovieList from '../../components/MovieList/MovieList';
import styles from './MoviesPage.module.css';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { useSearchParams } from 'react-router-dom';

export default function MoviesPage() {
  const url = 'search/movie';
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const query = `?query=${searchParams.get('query') ?? ''}`;

    async function fetchData() {
      setError('');
      setLoader(true);
      try {
        const { results } = await getMovies(url, query);
        setMovies(results);
        if (!results.length && searchParams.get('query')) setEmpty(true);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    }

    fetchData();
  }, [searchParams]);

  const handleSubmit = evt => {
    evt.preventDefault();

    const form = evt.target;

    searchParams.set('query', form.query.value);
    setSearchParams(searchParams);

    form.reset();
  };

  return (
    <div className={styles.moviePage}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" name="query" className={styles.input} />
        <button type="submit" className={styles.btn}>
          Search
        </button>
      </form>
      {loader && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!empty ? (
        <MovieList movies={movies} />
      ) : (
        <p style={{ marginTop: '20px' }}>Sorry, we can't find any films</p>
      )}
    </div>
  );
}