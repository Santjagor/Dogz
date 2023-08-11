import styles from './Navbar.module.css'
import SearchOptions from '../SearchOptions/SearchOptions'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className={styles.container}>
            <Link to={`/home`}>
                {/* <button className={styles.home}>HOME</button> */}
            </Link>
            <SearchOptions></SearchOptions>
        </div>
    )
}