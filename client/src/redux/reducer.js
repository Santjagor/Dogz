import { ADD_ALL_DOGS, ADD_TEMPERAMENTS } from "./action_types";

const initialState = {
    dogs: [],
    temperaments: [],
}

function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_ALL_DOGS:
            return {
                ...state,
                dogs: payload
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