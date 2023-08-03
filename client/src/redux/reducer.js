import { ADD_ALL_DOGS } from "./action_types";

const initialState = {
    allDogs: [],
}

function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case ADD_ALL_DOGS:
            return {
                ...state,
                allDogs: payload
            }
        default:
            return { ...state }
    }
}

export default rootReducer;