import styles from './Card.module.css'
import { Link } from 'react-router-dom';

export default function Card({ id, image, name, weight, temperaments }) {
    if (typeof temperaments === "object") {
        const temp = []
        temperaments.forEach(element => {
            temp.push(element.name)
        });
        temperaments = temp.join(", ")
    }

    function noImage(event) {
        event.target.src = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
    }

    return (
        <div className={styles.container}>
            <p className={styles.name}>{name}</p>
            <div className={styles.image_container}>
                <Link to={`/detail/${id}`}>
                    <img className={styles.image} src={image} onError={noImage}></img>
                </Link>
            </div>
            <p className={styles.temperaments}>{temperaments ? temperaments : "No data"}</p>
            <p className={styles.weight}>{weight} Kg</p>
        </div>
    )
}