import styles from './Navbar.module.css'
import SearchOptions from '../SearchOptions/SearchOptions'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className={styles.container}>
            <Link to={`/home`}>
                <img className={styles.top_image} src="https://i.postimg.cc/pXqPwdv0/DogZ.png" alt="" />
            </Link>
            <SearchOptions></SearchOptions>
        </div>
    )
}