import { ADD_ALL_DOGS, ADD_TEMPERAMENTS, CREATE_DOG, SEARCH_BY_NAME, FILTER_BY_TEMPERAMENTS, ALPHABETIC_ORDER, WEIGHT_ORDER, FILTER_BY_ORIGIN } from "./action_types";

const initialState = {
    dogs: [],
    temperaments: [],
}

function rootReducer(state = initialState, { type, payload }) {
    switch (type) {

        case ADD_ALL_DOGS:
            return {
                ...state,
                dogs: payload,
            }

        case SEARCH_BY_NAME:
            return {
                ...state,
                dogs: payload,
            }

        case FILTER_BY_ORIGIN:
            let originFiltered = []
            if (payload === "db") {
                originFiltered = state.dogs.filter(dog => dog.on_db)
                console.log(originFiltered);
            } else if (payload === "api") {
                originFiltered = state.dogs.filter(dog => !dog.on_db)
            }
            return {
                ...state,
                dogs: originFiltered
            }

        case FILTER_BY_TEMPERAMENTS:
            let tempFiltered = []
            if (payload === 'all') {
                tempFiltered = state.dogs
            } else {
                tempFiltered = state.dogs.filter(dog =>
                    dog.on_db
                        ?
                        dog.temperaments?.find(temp => temp.name === payload)
                        :
                        dog.temperament?.includes(payload))
            }
            return {
                ...state,
                dogs: tempFiltered
            }

        case ALPHABETIC_ORDER:
            let alphOrder = []
            if (payload === 1) {
                alphOrder = state.dogs.sort(function (a, b) {
                    if (a.name > b.name) { return 1 }
                    if (a.name < b.name) { return -1 }
                })
            }
            if (payload === -1) {
                alphOrder = state.dogs.sort(function (a, b) {
                    if (a.name < b.name) { return 1 }
                    if (a.name > b.name) { return -1 }
                })
            }
            return {
                ...state,
                dogs: alphOrder
            }

        case WEIGHT_ORDER:
            let weigOrder = []
            weigOrder = state.dogs.sort(function (a, b) {
                let aux1 = a.weight.metric.split(" - ")
                if (aux1[aux1.length - 1] === 'NaN') aux1[aux1.length - 1] = -1
                let aux2 = b.weight.metric.split(" - ")
                if (aux2[aux2.length - 1] === 'NaN') aux2[aux2.length - 1] = -1
                if (payload === 1) {
                    if (Number(aux1[aux1.length - 1]) > Number(aux2[aux2.length - 1])) { return 1 }
                    if (Number(aux1[aux1.length - 1]) < Number(aux2[aux2.length - 1])) { return -1 }
                }
                if (payload === -1) {
                    if (Number(aux1[aux1.length - 1]) < Number(aux2[aux2.length - 1])) { return 1 }
                    if (Number(aux1[aux1.length - 1]) > Number(aux2[aux2.length - 1])) { return -1 }
                }
            })
            return {
                ...state,
                dogs: weigOrder
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