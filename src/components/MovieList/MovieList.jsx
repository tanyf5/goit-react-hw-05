import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';

export default function MovieList({ movies }) {
  const location = useLocation();
  return (
    <ul className={styles.list}>
      {movies.map(movie => {
        return (
          <li key={movie.id} className={styles.item}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <p className={styles.title}>{movie.title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}