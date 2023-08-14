import styles from './Modal.module.css'
import { useNavigate } from 'react-router-dom'

export default function Modal({ active, data }) {
    const navigate = useNavigate()
    function handleSubmit() {
        navigate('/home')
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.data}>{data}</h1>
            <button className={styles.button} onClick={handleSubmit}>OK</button>
        </div>
    )
}