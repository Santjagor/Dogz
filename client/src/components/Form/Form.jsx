import styles from './Form.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from "react"
import validate from './validations';
import { createDog, addAllDogs } from '../../redux/actions';
import Modal from '../Modal/Modal';
import { render } from 'react-dom';

export default function Form() {
    const allTemperaments = useSelector((state) => state.temperaments)
    const dispatch = useDispatch()
    const defaultDogData = {
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        min_life_span: "",
        max_life_span: "",
        image: "",
        temperaments: ""
    }
    const [dogData, setDogData] = useState(defaultDogData)
    const [errors, setErrors] = useState({})
    const [modal, setModal] = useState({ active: false })

    useEffect(() => {
        setErrors(validate({ ...dogData }))
    }, [])

    function handleChange(event) {
        let property = event.target.name
        let value = event.target.value
        if (property === 'temperaments') {
            value = [...dogData.temperaments]
            if (event.target.checked) {
                value.push(Number(event.target.id))
            } else {
                value = value.filter(temp => temp !== Number(event.target.id))
            }
        }
        setDogData({
            ...dogData,
            [property]: value
        })
        setErrors(validate({ ...dogData, [property]: value }))
    }

    async function handleSubmit(event) {
        event.preventDefault()
        const newDog = {
            name: dogData.name,
            height: `${dogData.min_height} - ${dogData.max_height}`,
            weight: `${dogData.min_weight} - ${dogData.max_weight}`,
            life_span: `${dogData.min_life_span} - ${dogData.max_life_span}`,
            image: dogData.image,
            temperaments: dogData.temperaments,
        }
        const response = await dispatch(createDog(newDog))
        window.scrollTo({ top: 0, behavior: 'smooth' })
        if (response === true) {
            dispatch(addAllDogs())
            setDogData(defaultDogData)
            event.target.reset()
            setModal({ active: true, data: 'Dog Created!' })
        } else {
            setModal({ active: true, data: response })
        }
    }

    return (
        <div className={styles.container}>

            {modal.active && <Modal data={modal.data}></Modal>}

            <p className={styles.title}>CREATE YOUR OWN DOG</p>
            <form onSubmit={handleSubmit}>

                <div className={styles.section}>
                    <div className={styles.tag}>Dog Name</div>
                    <input className={styles.input_long} type="text" name="name" value={dogData.name} onChange={handleChange} />
                    {errors.name && <div className={styles.error}>{errors.name}</div>}
                </div>


                <div className={styles.section}>
                    <div className={styles.tag}>Height</div>
                    <input className={styles.input_short} type="text" name="min_height" placeholder='Min' value={dogData.min_height} onChange={handleChange} />
                    <input className={styles.input_short} type="text" name="max_height" placeholder='Max' value={dogData.max_height} onChange={handleChange} />
                    {errors.height && <div className={styles.error}>{errors.height}</div>}
                </div>


                <div className={styles.section}>
                    <div className={styles.tag}>Weight</div>
                    <input className={styles.input_short} type="text" name="min_weight" placeholder='Min' value={dogData.min_weight} onChange={handleChange} />
                    <input className={styles.input_short} type="text" name="max_weight" placeholder='Max' value={dogData.max_weight} onChange={handleChange} />
                    {errors.weight && <div className={styles.error}>{errors.weight}</div>}
                </div>


                <div className={styles.section}>
                    <div className={styles.tag}>Life Span</div>
                    <input className={styles.input_short} type="text" name="min_life_span" placeholder='Min' value={dogData.min_life_span} onChange={handleChange} />
                    <input className={styles.input_short} type="text" name="max_life_span" placeholder='Max' value={dogData.max_life_span} onChange={handleChange} />
                    {errors.life_span && <div className={styles.error}>{errors.life_span}</div>}
                </div>


                <div className={styles.section}>
                    <div className={styles.tag}>Image</div>
                    <input className={styles.input_long} type="text" name="image" value={dogData.image} onChange={handleChange} />
                    {errors.image && <div className={styles.error}>{errors.image}</div>}
                </div>


                <div className={styles.section}>
                    <div className={styles.tag}>Temperaments</div>
                    <div className={styles.tempsContainer}>
                        {allTemperaments?.map(temperament => {
                            return (
                                <div className={styles.temp} key={temperament.id}>
                                    <input id={temperament.id} type="checkbox" name="temperaments" onChange={handleChange} />
                                    {temperament.name}
                                </div>
                            )
                        })}
                    </div>
                    {errors.temperaments && <div className={styles.error}>{errors.temperaments}</div>}
                </div>

                <br />
                {Object.keys(errors).every((key) => !errors[key]) ? <button className={styles.button} type="submit">CREATE</button> : <button className={styles.button} type="submit" disabled >CREATE</button>}
            </form>
        </div>
    )
}