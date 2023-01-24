import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.js'
import { BrowserRouter as Router } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Router>
        <GoogleOAuthProvider>
            <App />
        </GoogleOAuthProvider>
    </Router>
)
