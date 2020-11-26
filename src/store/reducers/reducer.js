import {FAV_CITY, SET_CITY_NAME, SET_TEMP} from "../actions/actions";

const initialState = {
    cityName: "Kiev",
    temp: true,
    favCity: []
}

 export const reducers = (state = initialState, action) => {
    switch (action.type) {
        case SET_CITY_NAME:
            return {...state, cityName: action.payload};
        case SET_TEMP:
            return {...state, temp: action.payload};
        case FAV_CITY:
            return {...state, favCity:[...state.favCity, action.payload]};
        default :
            return state
    }
};



