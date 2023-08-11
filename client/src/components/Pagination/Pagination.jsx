import styles from './Pagination.module.css'

export default function Pagination({ page, changePage, totalPages }) {
    return (
        totalPages.length
            ?
            <div className={styles.container}>
                <button className={styles.button} onClick={() => { changePage(1) }}>{"<<"}</button>
                <button className={styles.button} onClick={() => { changePage(page - 1) }}>{"<"}</button>
                {totalPages.length ? <span className={styles.pages}>{`${page} of ${totalPages[totalPages.length - 1]}`}</span> : <></>}
                <button className={styles.button} onClick={() => { changePage(page + 1) }}>{">"}</button>
                <button className={styles.button} onClick={() => { changePage(totalPages.length) }}>{">>"}</button>
            </div>
            :
            <></>
    )
}