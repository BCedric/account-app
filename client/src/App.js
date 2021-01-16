import './App.css'
import { HashRouter as Router } from 'react-router-dom'

import Boot from './components/Boot'
import ServerMessageToast from './common/ServerMessageToast'

import 'moment/locale/fr'

function App() {
  return (
    <div className="App">
      <Router>
        <Boot></Boot>
        <ServerMessageToast />
      </Router>
    </div>
  )
}

export default App
