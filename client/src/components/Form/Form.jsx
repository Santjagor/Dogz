import styles from './Form.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import validate from './validations';
import { createDog, addAllDogs } from '../../redux/actions';

export default function Form() {
    const allTemperaments = useSelector((state) => state.temperaments)
    const navigate = useNavigate()
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

    function checkErrors() {
        if (Object.keys(errors).length) {
            for (const err in errors) {
                if (errors[err] !== "") {
                    return false
                }
            }
        } else {
            return false
        }
        return true
    }

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
        console.log(event.target.checked);
    }

    async function handleSubmit(event) {
        event.preventDefault()
        if (checkErrors()) {
            const newDog = {
                name: dogData.name,
                height: `${dogData.min_height} - ${dogData.max_height}`,
                weight: `${dogData.min_weight} - ${dogData.max_weight}`,
                life_span: `${dogData.min_life_span} - ${dogData.max_life_span}`,
                image: dogData.image,
                temperaments: dogData.temperaments,
            }
            dispatch(createDog(newDog))
            dispatch(addAllDogs())
            setDogData(defaultDogData)
            event.target.reset()
        } else {
            alert("Missing or incorrect Data")
        }
    }

    return (
        <div className={styles.container}>
            <p>CREATE YOUR OWN BREED</p>
            <form onSubmit={handleSubmit}>
                <div>Breed Name:</div>
                <input className={styles.input_long} type="text" name="name" value={dogData.name} onChange={handleChange} />

                <div>Height:</div>
                <input className={styles.input_short} type="text" name="min_height" placeholder='Min' value={dogData.min_height} onChange={handleChange} />
                <span> - </span>
                <input className={styles.input_short} type="text" name="max_height" placeholder='Max' value={dogData.max_height} onChange={handleChange} />

                <div>Weight:</div>
                <input className={styles.input_short} type="text" name="min_weight" placeholder='Min' value={dogData.min_weight} onChange={handleChange} />
                <span> - </span>
                <input className={styles.input_short} type="text" name="max_weight" placeholder='Max' value={dogData.max_weight} onChange={handleChange} />

                <div>Life Span:</div>
                <input className={styles.input_short} type="text" name="min_life_span" placeholder='Min' value={dogData.min_life_span} onChange={handleChange} />
                <span> - </span>
                <input className={styles.input_short} type="text" name="max_life_span" placeholder='Max' value={dogData.max_life_span} onChange={handleChange} />

                <div>Image:</div>
                <input className={styles.input_long} type="text" name="image" value={dogData.image} onChange={handleChange} />

                <div>Temperaments:</div>
                <br />
                <div className={styles.tempsContainer}>
                    {allTemperaments?.map(temperament => {
                        return (
                            <div key={temperament.id}>
                                <input id={temperament.id} type="checkbox" name="temperaments" onChange={handleChange} />
                                {temperament.name}
                            </div>
                        )
                    })}
                </div>
                <br /><br />
                <button type="submit" >CREATE</button>
            </form>
        </div>
    )
}