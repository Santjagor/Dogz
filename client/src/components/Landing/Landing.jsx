import styles from './Landing.module.css'
import Overlay from '../Overlay/Overlay'

export default function Landing({ access }) {
    return (
        <div className={styles.container}>
            <Overlay></Overlay>
            <img className={styles.dogz} src="https://i.postimg.cc/pXqPwdv0/DogZ.png" alt="" />
            <img className={styles.welcome} src="https://i.postimg.cc/TPNTsTz8/Welcome.png" alt="" />
            <button className={styles.enter} onClick={access}>Enter</button>
        </div>
    )
}