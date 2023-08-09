import styles from './SearchOptions.module.css'
import { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { addAllDogs, searchByName, filterByOrigin, filterByTemperaments, alphabeticOrder, weightOrder } from '../../redux/actions';

function SearchOptions({ temperaments }) {
    const dispatch = useDispatch()
    const defaultFilters = {
        name: "",
        origin: "all",
        temperament: "all",
        alphabetic: 0,
        weight: 0,
    }
    const [filters, setFilters] = useState(defaultFilters)

    function handleChange(event) {
        const property = event.target.name
        const value = event.target.value
        setFilters({
            ...filters,
            [property]: value
        })
    }

    function handleSort(event) {
        const property = event.target.name
        let value1 = 0
        let value2 = 0
        if (property === 'alphabetic') {
            filters.alphabetic === 0 ? value1 = 1 : value1 = filters.alphabetic * (-1)
            value2 = 0
        }
        if (property === 'weight') {
            filters.weight === 0 ? value2 = 1 : value2 = filters.weight * (-1)
            value1 = 0
        }
        setFilters({
            ...filters,
            alphabetic: value1,
            weight: value2
        })
    }

    function clearFilters() {
        setFilters(defaultFilters)
    }

    async function handleSubmit() {
        if (filters.name && filters.name !== "") {
            await dispatch(searchByName(filters.name))
        } else {
            await dispatch(addAllDogs())
        }
        if (filters.alphabetic && filters.alphabetic !== 0) {
            dispatch(alphabeticOrder(filters.alphabetic))
        }
        if (filters.weight && filters.weight !== 0) {
            dispatch(weightOrder(filters.weight))
        }
        if (filters.origin && filters.origin !== "all") {
            dispatch(filterByOrigin(filters.origin))
        }
        if (filters.temperament && filters.temperament !== "all") {
            dispatch(filterByTemperaments(filters.temperament))
        }
    }

    return (
        <div>

            <input type="text" name="name" onChange={handleChange} />

            <label htmlFor="origin">
                <select name="origin" id="origin" onChange={handleChange}>
                    <option value="all">All</option>
                    <option value="db">My own dogs</option>
                    <option value="api">API dogs</option>
                </select>
            </label>

            <label htmlFor="temperament">
                <select name="temperament" id="temperament" onChange={handleChange}>
                    <option value="all">All</option>
                    {temperaments?.map(temperament => {
                        return (
                            <option key={temperament.id} value={temperament.name}>{temperament.name}</option>
                        )
                    })}
                </select>
            </label>

            <button name="alphabetic" onClick={handleSort}>A-Z</button>
            <button name="weight" onClick={handleSort}>W</button>

            <button onClick={clearFilters}>CLEAR</button>
            <button onClick={handleSubmit}>SEARCH</button>

        </div>
    )
}

export function mapStateToProps(state) {
    return {
        temperaments: state.temperaments
    }
}

export default connect(mapStateToProps)(SearchOptions);