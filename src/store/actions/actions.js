export const SET_CITY_NAME = 'SET_CITY_NAME';
export const SET_TEMP = 'SET_TEMP';
export const FAV_CITY = 'FAV_CITY';

 export const setCity = (cityName) => {
    return {
        type: SET_CITY_NAME,
        payload: cityName
    }
}

export const setTempDeg = (temp) => {
    return {
        type: SET_TEMP,
        payload: temp
    }
}

export const favoriteCity = (city) => {
     return{
         type: FAV_CITY,
         payload: city
     }
}