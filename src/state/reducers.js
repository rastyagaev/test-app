import {combineReducers} from 'redux'
import {reducer as posts} from './posts'
import {reducer as session} from './session'

export default combineReducers({posts, session})
