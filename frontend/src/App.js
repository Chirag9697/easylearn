import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import Tabs from './components/SwitchTabs';
import SwitchTabs from './components/SwitchTabs';
import Login from './pages/Login';
import Register from './pages/Register';
function App() {
  return (
    <div>
    <Nav/>
    <Routes>
       
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
         
    </Routes>
    </div>
  );
}

export default App;
