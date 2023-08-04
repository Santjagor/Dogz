import styles from './Card.module.css'
import { Link } from 'react-router-dom';

export default function Card({ id, image, name, height, weight, temperaments, life_span }) {
    return (
        <div>
            <Link to={`/Detail/${id}`}>
                <p>{name}</p>
                <p>{image}</p>
                {/* <p>{temperaments}</p> */}
                <p>{weight}</p>
            </Link>
        </div>
    )
}