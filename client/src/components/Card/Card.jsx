import styles from './Card.module.css'
import { Link } from 'react-router-dom';

export default function Card({ id }) {
    return (
        <div>
            <Link to={`/Detail/${id}`}>
                <p>{id}</p>
            </Link>
        </div>
    )
}