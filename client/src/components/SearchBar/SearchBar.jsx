import styles from './SearchBar.module.css'
import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { searchByName } from '../../redux/actions';

export default function SearchBar() {
    const dispatch = useDispatch()

    const [data, setData] = useState({
        search: ""
    })

    useEffect(() => {
        dispatch(searchByName(data.search))
    }, [data])

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
        </div>
    )
}