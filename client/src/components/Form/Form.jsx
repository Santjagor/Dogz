import styles from './Form.module.css'
import { connect } from 'react-redux';
import { useState } from "react"
import axios from 'axios';
const endpoint = 'http://localhost:3001/dogs'

function Form(props) {
    const allTemperaments = props.temperaments
    const [dogData, setDogData] = useState({
        name: "",
        height: {},
        weight: {},
        image: {},
        life_span: "",
        temperaments: []
    })

    const [errors, setErrors] = useState({
        name: "",
        height: {},
        weight: {},
        image: {},
        life_span: "",
        temperaments: []
    })

    function handleChange(event) {
        const property = event.target.name
        let value = {}
        if (property === 'height' || property === 'weight') {
            value = { metric: event.target.value }
        }
        if (property === 'image') {
            value = { url: event.target.value }
        }
        if (property === 'temperaments') {
            value = [...dogData.temperaments]
            if (event.target.checked) {
                value.push(Number(event.target.id))
            } else {
                value = value.filter(temp => temp !== Number(event.target.id))
            }
        }
        if (property === 'name' || property === 'life_span') {
            value = event.target.value
        }
        setDogData({
            ...dogData,
            [property]: value
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(dogData);
        // try {
        //     const response = await axios.post(endpoint, dogData)
        //     alert(`${response.data.name} ${response.data.temperaments}`);
        // } catch (error) {
        //     alert(error.message)
        // }
    }
    return (
        <div>
            <p>Form</p>
            <form onSubmit={handleSubmit}>
                <div>Breed Name:</div>
                <input type="text" name="name" onChange={handleChange} />

                <div>Height:</div>
                <input type="text" name="height" onChange={handleChange} />

                <div>Weight:</div>
                <input type="text" name="weight" onChange={handleChange} />

                <div>Image:</div>
                <input type="text" name="image" onChange={handleChange} />

                <div>Life Span:</div>
                <input type="text" name="life_span" onChange={handleChange} />

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