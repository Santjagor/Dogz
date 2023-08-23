import { ADD_ALL_DOGS, ADD_TEMPERAMENTS, CREATE_DOG, FILTER_BY_ORIGIN, FILTER_BY_TEMPERAMENTS, ALPHABETIC_ORDER, WEIGHT_ORDER, SEARCH_BY_NAME, CLEAR_FILTERS } from "./action_types";
import axios from "axios";

export function addAllDogs() {
    const endpoint = 'http://localhost:3001/dogs'
    return async (dispatch) => {
        try {
            const response = await axios(endpoint)
            return dispatch({
                type: ADD_ALL_DOGS,
                payload: response.data
            })
        } catch (error) {
            alert(error.message)
        }
    }
}

export function searchByName(name) {
    const endpoint = 'http://localhost:3001/dogs/search?name='
    return async (dispatch) => {
        try {
            axios(`${endpoint}${name}`).then(res => {
                return dispatch({
                    type: SEARCH_BY_NAME,
                    payload: res.data
                })
            }).catch(error=>console.log(error.message))
        } catch (error) {
            
        }
    }
}

export function filterByOrigin(origin) {
    return (dispatch) => {
        try {
            return dispatch({
                type: FILTER_BY_ORIGIN,
                payload: origin
            })
        } catch (error) {
            alert(error.message)
        }
    }
}

export function filterByTemperaments(temperament) {
    return (dispatch) => {
        try {
            return dispatch({
                type: FILTER_BY_TEMPERAMENTS,
                payload: temperament
            })
        } catch (error) {
            alert(error.message)
        }
    }
}

export function alphabeticOrder(order) {
    return (dispatch) => {
        try {
            return dispatch({
                type: ALPHABETIC_ORDER,
                payload: order
            })
        } catch (error) {
            alert(error.message)
        }
    }
}

export function weightOrder(order) {
    return (dispatch) => {
        try {
            return dispatch({
                type: WEIGHT_ORDER,
                payload: order
            })
        } catch (error) {
            alert(error.message)
        }
    }
}

export function clearFilters() {
    return (dispatch) => {
        try {
            return dispatch({
                type: CLEAR_FILTERS,
            })
        } catch (error) {
            alert(error.message)
        }
    }
}

export function createDog(dog) {
    const endpoint = 'http://localhost:3001/dogs'
    return async () => {
        try {
            const response = await axios.post(endpoint, dog)
            if (response.data.name) {
                return true
            } else {
                return response.data
            }
        } catch (error) {
            alert(error.message)
        }
    }
}

export function addTemperaments() {
    const endpoint = 'http://localhost:3001/temperaments'
    return async (dispatch) => {
        try {
            const response = await axios(endpoint)
            return dispatch({
                type: ADD_TEMPERAMENTS,
                payload: response.data
            })
        } catch (error) {
            alert(error.message)
        }
    }
}