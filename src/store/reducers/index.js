import { combineReducers } from 'redux'
import { reducers } from './reducer'
import { itemsReducer, itemsHasErrored, itemsIsLoading } from "./itemsReducer";



const rootReducer = combineReducers({
  city: reducers,
  items: itemsReducer,
  itemsHasErrored,
  itemsIsLoading
})

export default rootReducer