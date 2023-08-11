import styles from './Home.module.css'
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Cards from '../Cards/Cards';
import Pagination from '../Pagination/Pagination';
import { Link } from 'react-router-dom';


export default function Home() {
    const dogs = useSelector((state) => state.dogs)
    const filters = useSelector((state) => state.filters)
    const [page, setPage] = useState(1)
    const [currentDogs, setCurrentDogs] = useState()
    const dogsPerPage = 8
    const last = page * dogsPerPage
    const first = last - dogsPerPage
    const totalPages = []
    for (let i = 0; i < Math.ceil(dogs.length / dogsPerPage); i++) {
        totalPages.push(i + 1)
    }

    function changePage(p) {
        if (p > 0 && p <= totalPages.length) {
            setPage(p)
        }
    }

    useEffect(() => {
        const current = dogs.slice(first, last)
        setCurrentDogs(current)
    }, [dogs, page])

    useEffect(() => {
        filters && setPage(1)
    }, [filters])

    return (
        <div className={styles.container}>
            <Link to={`/form`}>
                <button>CREATE</button>
            </Link>
            <Pagination
                dogs={dogs}
                dogsPerPage={dogsPerPage}
                page={page}
                totalPages={totalPages}
                changePage={changePage}
            />
            <Cards dogs={currentDogs}></Cards>
            <Pagination
                dogs={dogs}
                dogsPerPage={dogsPerPage}
                page={page}
                totalPages={totalPages}
                changePage={changePage}
            />
            <div className={styles.left_bar}></div>
            <div className={styles.right_bar}></div>
            <img className={styles.left_bot_dog} src="https://drive.google.com/uc?export=view&id=18gxNZXlVoxSq5v-dajrlu-nJcmS_Zc3X" alt="" />
            <img className={styles.right_bot_dog} src="https://drive.google.com/uc?export=view&id=1q0QmOMnuVWxuDmDgDqWNpwP_QekdbYBU" alt="" />
        </div>
    )
}