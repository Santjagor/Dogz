import styles from './Home.module.css'
import Card from '../Card/Card'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function Home({ dogs }) {
    return (
        <div>
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

export function mapStateToProps(state) {
    return {
        dogs: state.dogs,
        temperaments: state.temperaments
    }
}

export default connect(mapStateToProps)(Home)