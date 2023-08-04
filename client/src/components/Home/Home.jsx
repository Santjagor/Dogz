import styles from './Home.module.css'
import Card from '../Card/Card'
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function Home({ allDogs }) {
    console.log(allDogs);
    return (
        <div>
            {allDogs?.map(dog => {
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
            })}
        </div>
    )
}

export function mapStateToProps(state) {
    return {
        allDogs: state.allDogs,
        temperaments: state.temperaments
    }
}

export default connect(mapStateToProps)(Home)