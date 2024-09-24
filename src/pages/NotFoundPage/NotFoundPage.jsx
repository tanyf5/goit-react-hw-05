import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <Link to="/" className={styles.link}>
      <img
        src="../../../public/problem.jpg"
        alt="Problem"
        className={styles.img}
        to="/"
      ></img>
    </Link>
  );
}