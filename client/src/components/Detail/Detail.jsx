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

    function noImage(event) {
        event.target.src = "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
    }

    if (dog?.temperaments && typeof dog?.temperaments === "object") {
        const temp = []
        dog.temperaments.forEach(element => {
            temp.push(element.name)
        });
        dog.temperaments = temp.join(", ")
    }

    return (
        <div className={styles.container}>
            {dog?.id ? <h1 className={styles.name}>{dog?.name}</h1> : <></>}
            <div className={styles.hw_container}>
                {dog?.id ? <h6 className={styles.height_weight}>{`Height: ${dog.on_db ? dog?.height : dog?.height.metric} Cm`}</h6> : <></>}
                {dog?.id ? <h6 className={styles.height_weight}>{`Weight: ${dog.on_db ? dog?.weight : dog?.weight.metric} Kg`}</h6> : <></>}
            </div>
            <h4 className={styles.temperaments}>{dog?.on_db ? dog?.temperaments : dog?.temperament}</h4>
            {dog?.id ? <img className={styles.image} src={dog?.on_db ? dog?.image : dog?.image.url} onError={noImage} /> : <></>}
        </div>
    )
}