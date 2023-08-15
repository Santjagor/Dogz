import styles from './Cards.module.css'
import Card from '../Card/Card'

export default function Cards({ dogs }) {
    return (
        <div className={styles.container}>
            {dogs?.length <= 0 ? <p className={styles.not_found}>{`Dogs not found ☹`}</p> : <></>}
            {dogs?.map(dog => {
                return (
                    <Card
                        key={dog.id}
                        id={dog.id}
                        image={dog.on_db ? dog.image : dog.image.url}
                        name={dog.name}
                        height={dog.on_db ? dog.height : dog.height.metric}
                        weight={dog.on_db ? dog.weight : dog.weight.metric}
                        temperaments={dog.on_db ? dog.temperaments : dog.temperament}
                        life_span={dog.life_span}
                    />
                )
            })}
        </div>
    )
}