import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import styles from './Navigation.module.css';

const navLinkCss = ({ isActive }) => {
  return clsx(styles.link, isActive && styles.active);
};

export default function Navigation() {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={navLinkCss}>
          Home
        </NavLink>
        <NavLink to="/movies" className={navLinkCss}>
          About
        </NavLink>
      </nav>
    </header>
  );
}