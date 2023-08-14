import styles from './Detail.module.css'
import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from 'react'
import axios from "axios";
import { useDispatch } from 'react-redux';
import { addAllDogs } from '../../redux/actions';

export default function Detail() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
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

    async function onDelete() {
        const response = await axios.delete(`http://localhost:3001/dogs/${id}`)
        if (response.data === 1) {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            alert("Dog deleted!")
        }

        dispatch(addAllDogs())
        navigate('/home')
    }

    if (dog?.temperaments && typeof dog?.temperaments === "object") {
        const temp = []
        dog.temperaments.forEach(element => {
            temp.push(element.name)
        });
        dog.temperaments = temp.join(", ")
    }
    if (dog?.id) {
        return (
            <div className={styles.container}>
                {dog?.on_db ? <button className={styles.close_button} onClick={onDelete}>DELETE</button> : <></>}
                <h1 className={styles.name}>{dog?.name}</h1>
                <div className={styles.hw_container}>
                    <h6 className={styles.height_weight}>{`Height: ${dog.on_db ? dog?.height : dog?.height.metric} Cm`}</h6>
                    <h6 className={styles.height_weight}>{`Weight: ${dog.on_db ? dog?.weight : dog?.weight.metric} Kg`}</h6>
                </div>
                <h4 className={styles.temperaments}>{dog?.on_db ? dog?.temperaments : dog?.temperament}</h4>
                <img className={styles.image} src={dog?.on_db ? dog?.image : dog?.image.url} />
            </div>
        )
    }
}