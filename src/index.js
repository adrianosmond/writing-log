import React from 'react'
import ReactDOM from 'react-dom'
import './css/reset.css'
import './css/elements.css'
import './css/grid.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
