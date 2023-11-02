import { useState } from 'react'
import { subscribeToAuthChanges } from './services/firebase/auth'
import LoginForm from './components/LoginForm'
import './App.css'

function App() {

  const [user, setUser] = useState(null)

  subscribeToAuthChanges(setUser)

  return (
    <>
      <div className="App">
        <div className="title-row">
          <h1 className='title'>Firebase Recipes</h1>
          <LoginForm user={user} />
        </div>
      </div>
    </>
  )
}

export default App
