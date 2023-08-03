import styles from './Landing.module.css'

export default function Landing({ access }) {
    return (
        <div>
            <p>Landing</p>
            <button onClick={access}>Enter</button>
        </div>
    )
}