import styles from './Navbar.module.css'
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';

export default function Navbar({ access }) {
    return (
        <div className={styles.container}>
            <Link to={`/home`}>
                <button>HOME</button>
            </Link>
            <Link to={`/form`}>
                <button>CREATE</button>
            </Link>
            <SearchBar></SearchBar>
        </div>
    )
}