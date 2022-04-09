import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import Base from './pages/Base';
import SignUp from './pages/SignUp';
import { AuthProvider } from "./component/Auth";
import Terms from './pages/Terms';

function App() {
  return (
    <AuthProvider>
      <Router className="App">
        <Routes>
          <Route exact path='/' element={<Base />} />
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/terms' element={<Terms />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;