import styles from './Form.module.css'
import { connect, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useState } from "react"
import validate from './validations';
import { createDog } from '../../redux/actions';

function Form(props) {
    const allTemperaments = props.temperaments
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [dogData, setDogData] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        min_life_span: "",
        max_life_span: "",
        image: "",
        temperaments: ""
    })

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
        } else {
            alert("Missing or incorrect Data")
        }
    }

    return (
        <div>
            <p>CREATE YOUR OWN BREED</p>
            <form onSubmit={handleSubmit}>
                <div>Breed Name:</div>
                <input type="text" name="name" value={dogData.name} onChange={handleChange} />

                <div>Height:</div>
                <input type="text" name="min_height" placeholder='Min' value={dogData.min_height} onChange={handleChange} />
                <span> - </span>
                <input type="text" name="max_height" placeholder='Max' value={dogData.max_height} onChange={handleChange} />

                <div>Weight:</div>
                <input type="text" name="min_weight" placeholder='Min' value={dogData.min_weight} onChange={handleChange} />
                <span> - </span>
                <input type="text" name="max_weight" placeholder='Max' value={dogData.max_weight} onChange={handleChange} />

                <div>Life Span:</div>
                <input type="text" name="min_life_span" placeholder='Min' value={dogData.min_life_span} onChange={handleChange} />
                <span> - </span>
                <input type="text" name="max_life_span" placeholder='Max' value={dogData.max_life_span} onChange={handleChange} />

                <div>Image:</div>
                <input type="text" name="image" value={dogData.image} onChange={handleChange} />

                <div>Temperaments:</div>
                <br />
                <div>
                    {allTemperaments.map(temperament => {
                        return (
                            <div key={temperament.id}>
                                <input id={temperament.id} type="checkbox" name="temperaments" onChange={handleChange} />
                                {temperament.name} {temperament.id}
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

export function mapStateToProps(state) {
    return {
        temperaments: state.temperaments
    }
}

export default connect(mapStateToProps)(Form);