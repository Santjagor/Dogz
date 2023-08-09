import styles from './Pagination.module.css'

export default function Pagination({ page, changePage, totalPages }) {
    return (
        <div>
            <button onClick={() => { changePage(1) }}>{"<<"}</button>
            <button onClick={() => { changePage(page - 1) }}>{"<"}</button>
            <span>{`${page} of ${totalPages[totalPages.length - 1]}`}</span>
            <button onClick={() => { changePage(page + 1) }}>{">"}</button>
            <button onClick={() => { changePage(totalPages.length) }}>{">>"}</button>
        </div>
    )
}