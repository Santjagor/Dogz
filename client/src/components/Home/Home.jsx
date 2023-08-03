import styles from './Home.module.css'
import Card from '../Card/Card'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';

function Home({allDogs}) {
    return (
        <div>
            {allDogs?.map(dog => {
                return (
                    <Card
                        key={dog.id}
                        id={dog.id}
                        name={dog.name}
                    />
                )
            })}
        </div>
    )
}

export function mapStateToProps(state) {
    return {
        allDogs: state.allDogs
    }
}

export default connect(mapStateToProps)(Home)