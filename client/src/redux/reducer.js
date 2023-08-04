import { ADD_ALL_DOGS, ADD_TEMPERAMENTS } from "./action_types";

const initialState = {
    allDogs: [],
    temperaments: [],
}

function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_ALL_DOGS:
            return {
                ...state,
                allDogs: payload
            }
        case ADD_TEMPERAMENTS:
            return {
                ...state,
                temperaments: payload
            }
        default:
            return { ...state }
    }
}

export default rootReducer;