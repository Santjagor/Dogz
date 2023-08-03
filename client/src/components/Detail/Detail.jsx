import styles from './Detail.module.css'
import { useParams } from "react-router-dom"

export default function Detail() {
    const { id } = useParams()
    return (
        <div>
            <p>{id}</p>
        </div>
    )
}