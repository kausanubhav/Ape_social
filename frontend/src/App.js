import { Routes, Route, useNavigate } from 'react-router-dom'
import Login from './components/Login'
import Home from './container/Home'
export default function App() {
    return (
        <Routes>
            <Route path="Login" element={<Login />} />
            <Route path="/*" element={<Home />} />
        </Routes>
    )
}
