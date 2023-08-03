import { ADD_ALL_DOGS } from "./action_types";
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