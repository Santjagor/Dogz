import styles from './Cards.module.css'
import Card from '../Card/Card'
import { useEffect, useState } from 'react';

export default function Cards({ dogs }) {
    return (
        <div className={styles.container}>
            {dogs?.length <= 0 ? <p>Dogs not found</p> : <></>}
            {dogs?.map(dog => {
                if (dog.on_db) {
                    return (
                        <Card
                            key={dog.id}
                            id={dog.id}
                            image={dog.image}
                            name={dog.name}
                            height={dog.height}
                            weight={dog.weight}
                            temperaments={dog.temperaments}
                            life_span={dog.life_span}
                        />
                    )
                } else {
                    return (
                        <Card
                            key={dog.id}
                            id={dog.id}
                            image={dog.image.url}
                            name={dog.name}
                            height={dog.height.metric}
                            weight={dog.weight.metric}
                            temperaments={dog.temperaments}
                            life_span={dog.life_span}
                        />
                    )
                }
            })}
        </div>
    )
}