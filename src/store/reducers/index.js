import { combineReducers } from 'redux'
import movie from './movie'
import user from './user'
import global from './global'
import order from './order'

export default combineReducers({
  movie,
  user,
  global,
  order
})
