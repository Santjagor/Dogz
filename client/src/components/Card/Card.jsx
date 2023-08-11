import styles from './Card.module.css'
import { Link } from 'react-router-dom';

export default function Card({ id, image, name, weight, temperaments }) {
    return (
        <div className={styles.container}>
                <p className={styles.name}>{name}</p>
                <div className={styles.image_container}>
                    <Link to={`/detail/${id}`}>
                        <img className={styles.image} src={image}></img>
                    </Link>
                </div>
                <p>{temperaments ? temperaments : "No data"}</p>
                <p>{weight} Kg</p>
        </div>
    )
}