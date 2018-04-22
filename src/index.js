import React from 'react'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import './css/reset.css'
import './css/elements.css'
import './css/grid.css'
import configureStore from './store'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
document.getElementById('root'))
registerServiceWorker()
