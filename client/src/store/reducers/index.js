import {combineReducers} from "redux"

/*Reducers*/
import courseReducer from './courseReducer'
import classReducer from './classReducer'
import studentReducer from './studentReducer'
import errorReducer from './errorReducer'

export default combineReducers({
    course: courseReducer,
    student: studentReducer,
    classReducer: classReducer,
    errorReducer: errorReducer,
})