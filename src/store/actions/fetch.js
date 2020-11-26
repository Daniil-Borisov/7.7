export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function weatherFetchDataSuccess(items){
    return {
        type: 'ITEMS_FETCH_DATA_SUCCESS',
        items
    };
}

export function weatherFetchData(cityName){
    return (dispatch) => {
        fetch( "https://community-open-weather-map.p.rapidapi.com/forecast/daily?cnt=7&units=metric&q="+ cityName, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "8948d5b5d8msh7598122ce0ab0cap172c7cjsnd7fbfc8b69fb",
                "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com"
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(itemsIsLoading(false));
                dispatch(itemsHasErrored(false))

                return response;
            })
            .then((response) => response.json())
            .then((items) => dispatch(weatherFetchDataSuccess(items.list)))
            .catch(() => dispatch(itemsHasErrored(true)));
    }
}