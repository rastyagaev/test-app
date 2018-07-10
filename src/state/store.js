import {applyMiddleware, createStore} from 'redux'
import thunk from 'redux-thunk'

import reducers from './reducers'

export default state => {
  const store = createStore(
    reducers,
    state,
    applyMiddleware(thunk)
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}