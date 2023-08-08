import Card from '../Card/Card'
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';

function Cards({ dogs }) {

    useEffect(() => {
        console.log(dogs);
    }, [dogs])

    return (
        <div>
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

export function mapStateToProps(state) {
    return {
        dogs: state.dogs,
    }
}

export default connect(mapStateToProps)(Cards)