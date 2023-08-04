import { ADD_ALL_DOGS, ADD_TEMPERAMENTS } from "./action_types";
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