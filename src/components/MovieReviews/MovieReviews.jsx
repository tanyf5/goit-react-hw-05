import { useEffect, useState } from 'react';
import { getMovies } from '../../apiService/movies';
import { useParams } from 'react-router-dom';
import styles from './MovieReviews.module.css';
import Loader from '../Loader/Loader';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState('');
  const [empty, setEmpty] = useState(false);
  const url = `movie/${movieId}/reviews`;

  useEffect(() => {
    setError('');
    setLoader(true);
    async function fetchData() {
      try {
        const { results } = await getMovies(url, '');
        results.length ? setReviews(results) : setEmpty(true);
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
      <div className={styles.review}>
        {!empty ? (
          <ul className={styles.list}>
            {reviews.map(review => {
              return (
                <li key={review.id}>
                  <h3 className={styles.title}>Author: {review.author}</h3>
                  <p>{review.content}</p>
                </li>
              );
            })}
          </ul>
        ) : (
          <p>No Rewiews</p>
        )}
      </div>
    </>
  );
}