import styles from './SearchBar.module.css'
import { useState } from 'react';
import { useDispatch } from "react-redux";

export default function SearchBar() {
    const dispatch = useDispatch()

    const [data, setData] = useState({
        name: ""
    })

    function handleChange(event) {
        const property = event.target.name
        const value = event.target.value
        setData({
            [property]: value
        })

    }

    return (
        <div>
            <input type="text" name="search" onChange={handleChange} />
            <button>SEARCH</button>
        </div>
    )
}