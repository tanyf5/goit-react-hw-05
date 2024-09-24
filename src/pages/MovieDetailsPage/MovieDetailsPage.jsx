import { Suspense, useEffect, useRef, useState } from 'react';
import { Link, useParams, Outlet, useLocation } from 'react-router-dom';
import { getMovies } from '../../apiService/movies';
import { transformDetailsInfo } from '../../helpers/transformMoviesInfo';

import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';

import styles from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const url = `movie/${movieId}`;
  const defaultImg =
    '<https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster>';
  const [movie, setMovie] = useState(null);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/');

  useEffect(() => {
    setError('');
    setLoader(true);
    async function fetchData() {
      try {
        const results = await getMovies(url, '');
        const info = transformDetailsInfo(results);
        setMovie(info);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoader(false);
      }
    }

    fetchData();
  }, [movieId]);

  return (
    <>
      {loader && <Loader />}
      {error && <ErrorMessage message={error} />}
      <Link to={backLinkHref.current} className={styles.link}>
        Go back
      </Link>
      {movie && (
        <div className={styles.details}>
          <div className={styles.info}>
            <div>
              <img
                src={
                  movie?.poster_path
                    ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    : defaultImg
                }
                alt="poster"
                className={styles.img}
              />
            </div>
            <div className={styles.description}>
              <h2>
                {movie?.title} ({movie?.release_date})
              </h2>
              <p>User Score{movie?.vote_average}</p>
              <h3>Overviev</h3>
              <p>{movie?.overview}</p>
              <h3>Genres</h3>
              <ul className={styles.list}>
                {movie?.genres?.map(genre => {
                  return (
                    <li key={genre.id}>
                      <p>{genre.name}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
          <div className={styles.moreInfo}>
            <p>Additional information</p>
            <ul className={styles.moreInfoList}>
              <li>
                <Link to="cast">Cast</Link>
              </li>
              <li>
                <Link to="reviews">Reviews</Link>
              </li>
            </ul>
          </div>
          <Suspense fallback={<div>Loading page code...</div>}>
            <Outlet />
          </Suspense>
        </div>
      )}
    </>
  );
}