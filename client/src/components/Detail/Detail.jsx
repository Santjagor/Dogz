import styles from './Detail.module.css'
import { useParams } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from "axios";

export default function Detail() {
    const { id } = useParams()
    const [dog, setDog] = useState()

    useEffect(() => {
        getDetail()
    }, [])

    async function getDetail() {
        const response = await axios(`http://localhost:3001/dogs/${id}`)
        if (response.data[0].id) {
            setDog(response.data[0])
        }
    }

    return (
        <div className={styles.container}>
            <h1>{dog?.name}</h1>
            <h3>{dog?.on_db ? dog?.temperaments : dog?.temperament}</h3>
            {dog?.id ? <h5>{`Height: ${dog.on_db ? dog?.height : dog?.height.metric}`}</h5> : <></>}
            {dog?.id ? <h5>{`Weight: ${dog.on_db ? dog?.weight : dog?.weight.metric}`}</h5> : <></>}
            {dog?.id ? <img className={styles.image} src={dog?.image.url} /> : <></>}
        </div>
    )
}