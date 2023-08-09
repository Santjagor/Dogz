import styles from './Pagination.module.css'

export default function Pagination({ dogs, dogsPerPage, changePage }) {
    const pages = []
    for (let i = 0; i < Math.ceil(dogs.length / dogsPerPage); i++) {
        pages.push(i + 1)
    }

    return (
        <div>
            {pages.map(p => {
                return (
                    <button key={p} onClick={() => { changePage(p) }}>{p}</button>
                )
            })}
        </div>
    )
}