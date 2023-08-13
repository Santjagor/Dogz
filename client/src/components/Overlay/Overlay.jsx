import styles from './Overlay.module.css'
export default function Overlay() {
    return (
        <div>
            <div className={styles.left_bar}></div>
            <div className={styles.right_bar}></div>
            <img className={styles.left_bot_dog} src='https://i.postimg.cc/pX22cFwh/dog0.png' alt="" />
            <img className={styles.right_bot_dog} src='https://i.postimg.cc/Dw07nKy7/dog1.png' alt="" />
        </div>
    )
}