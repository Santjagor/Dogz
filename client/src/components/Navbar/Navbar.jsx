import styles from './Navbar.module.css'
import SearchOptions from '../SearchOptions/SearchOptions'
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
        <div className={styles.container}>
            <img className={styles.top_image} src="https://drive.google.com/uc?export=view&id=1wv8enqcZIdGW9Oz10NDR4vtK1qrvwXOO" alt="" />
            <Link to={`/home`}>
                {/* <button className={styles.home}>HOME</button> */}
            </Link>
            <SearchOptions></SearchOptions>
        </div>
    )
}