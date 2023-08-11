import { ADD_ALL_DOGS, ADD_TEMPERAMENTS, CREATE_DOG, SEARCH_BY_NAME, FILTER_BY_TEMPERAMENTS, ALPHABETIC_ORDER, WEIGHT_ORDER, FILTER_BY_ORIGIN, CLEAR_FILTERS } from "./action_types";

const initialState = {
    dogs: [],
    dogDetail: [],
    temperaments: [],
    filters: false,
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
                filters: true
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
                dogs: originFiltered,
                filters: true
            }

        case FILTER_BY_TEMPERAMENTS:
            let tempFiltered = []
            tempFiltered = state.dogs.filter(dog =>
                dog.on_db
                    ?
                    dog.temperaments?.find(temp => temp.name === payload)
                    :
                    dog.temperament?.includes(payload))
            return {
                ...state,
                dogs: tempFiltered,
                filters: true
            }

        case ALPHABETIC_ORDER:
            let aOrder = []
            if (payload === 1) {
                aOrder = state.dogs.sort(function (a, b) {
                    if (a.name > b.name) { return 1 }
                    if (a.name < b.name) { return -1 }
                })
            }
            if (payload === -1) {
                aOrder = state.dogs.sort(function (a, b) {
                    if (a.name < b.name) { return 1 }
                    if (a.name > b.name) { return -1 }
                })
            }
            return {
                ...state,
                dogs: [...aOrder],
                filters: true
            }

        case WEIGHT_ORDER:
            let wOrder = []
            wOrder = state.dogs.sort(function (a, b) {

                let aux1 = []
                let aux2 = []

                a.on_db ? aux1 = a.weight.split(" - ") : aux1 = a.weight.metric.split(" - ")
                if (aux1[aux1.length - 1] === 'NaN') aux1[aux1.length - 1] = -1
                b.on_db ? aux2 = b.weight.split(" - ") : aux2 = b.weight.metric.split(" - ")
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
                dogs: [...wOrder],
                filters: true
            }

        case CLEAR_FILTERS:
            return {
                ...state,
                filters: false
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