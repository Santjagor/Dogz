import styles from './Form.module.css'
import { connect } from 'react-redux';
import { useState, useEffect } from "react"
import axios from 'axios';
import validate from './validations';
const endpoint = 'http://localhost:3001/dogs'

function Form(props) {
    const allTemperaments = props.temperaments
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
            const createdDog = {
                name: dogData.name,
                height: `${dogData.min_height} - ${dogData.max_height}`,
                weight: `${dogData.min_weight} - ${dogData.max_weight}`,
                life_span: `${dogData.min_life_span} - ${dogData.max_life_span}`,
                image: dogData.image,
                temperaments: dogData.temperaments,
            }
            try {
                const response = await axios.post(endpoint, createdDog)
                console.log(response.data);
                if (response.data.name) {
                    alert(`"${response.data.name}" breed created!`)
                    window.location.reload()
                } else {
                    alert(response.data)
                }
            } catch (error) {
                alert(error.message)
            }
        } else {
            alert("Incorrect Data")
        }
    }

    return (
        <div>
            <p>CREATE YOUR OWN BREED</p>
            <form onSubmit={handleSubmit}>
                <div>Breed Name:</div>
                <input type="text" name="name" onChange={handleChange} />

                <div>Height:</div>
                <input type="text" name="min_height" placeholder='Min' onChange={handleChange} />
                <span> - </span>
                <input type="text" name="max_height" placeholder='Max' onChange={handleChange} />

                <div>Weight:</div>
                <input type="text" name="min_weight" placeholder='Min' onChange={handleChange} />
                <span> - </span>
                <input type="text" name="max_weight" placeholder='Max' onChange={handleChange} />

                <div>Life Span:</div>
                <input type="text" name="min_life_span" placeholder='Min' onChange={handleChange} />
                <span> - </span>
                <input type="text" name="max_life_span" placeholder='Max' onChange={handleChange} />

                <div>Image:</div>
                <input type="text" name="image" onChange={handleChange} />

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