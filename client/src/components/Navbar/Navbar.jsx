import styles from './Navbar.module.css'
// import SearchBar from '../SearchBar/SearchBar'
// import FilterByTemperaments from '../FilterByTemperaments/FilterByTemperaments';
import SearchOptions from '../SearchOptions/SearchOptions'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className={styles.container}>
            <Link to={`/home`}>
                <button>HOME</button>
            </Link>
            <Link to={`/form`}>
                <button>CREATE</button>
            </Link>
            <SearchOptions></SearchOptions>
        </div>
    )
}