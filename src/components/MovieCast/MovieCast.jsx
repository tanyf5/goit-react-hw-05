import { useEffect, useState } from 'react';
import { getMovies } from '../../apiService/movies';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieCast() {
  const { movieId } = useParams();
  const [casts, setCast] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [empty, setEmpty] = useState(false);
  const url = `movie/${movieId}/credits`;
  const defaultImg =
    '<https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster>';

  useEffect(() => {
    setError('');
    setLoader(true);
    async function fetchData() {
      try {
        const { cast } = await getMovies(url, '');
        cast ? setCast(cast) : setEmpty(true);
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
      <div className={styles.cast}>
        {!empty ? (
          <ul className={styles.list}>
            {casts.map(cast => {
              return (
                <li key={cast.id} className={styles.item}>
                  <img
                    src={
                      cast.profile_path
                        ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}`
                        : defaultImg
                    }
                    alt="poster"
                    className={styles.img}
                  />
                  <p>{cast.name}</p>
                  <p>{cast.character}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No info</p>
        )}
      </div>
    </>
  );
}