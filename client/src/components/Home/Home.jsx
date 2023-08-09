import styles from './Home.module.css'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Cards from '../Cards/Cards';
import Card from '../Card/Card';
import Pagination from '../Pagination/Pagination';


export default function Home() {
    const dogs = useSelector((state) => state.dogs)
    const [page, setPage] = useState(1)
    const [currentDogs, setCurrentDogs] = useState()
    const dogsPerPage = 8
    const last = page * dogsPerPage
    const first = last - dogsPerPage

    function changePage(p) {
        setPage(p)
    }

    useEffect(() => {
        const current = dogs.slice(first, last)
        setCurrentDogs(current)
    }, [dogs, page])

    return (
        <div>
            <Cards dogs={currentDogs}></Cards>
            <Pagination
                dogs={dogs}
                dogsPerPage={dogsPerPage}
                changePage={changePage}
            />
        </div>
    )
}