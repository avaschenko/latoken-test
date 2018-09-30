import {combineReducers} from 'redux'
import Finance from 'modules/Finance';

export default combineReducers({
  [Finance.types.name]: Finance.reducers,
})
