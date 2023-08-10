import styles from './Card.module.css'
import { Link } from 'react-router-dom';

export default function Card({ id, image, name, height, weight, temperaments, life_span }) {
    return (
        <div className={styles.container}>
            <Link to={`/detail/${id}`}>
                {/* <p>{name}</p> */}
                <img className={styles.image} src={image}></img>
                {/* <p>{temperaments}</p> */}
                {/* <p>{weight}</p> */}
            </Link>
        </div>
    )
}