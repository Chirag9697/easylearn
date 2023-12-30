import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import { Route, Routes, useNavigate } from 'react-router-dom';
// import Tabs from './components/SwitchTabs';
import SwitchTabs from './components/SwitchTabs';
import Login from './pages/Login';
import Register from './pages/Register';
import { Home } from './pages/Home';
import Myclasses from './pages/Myclasses';
import Mainclass from './pages/Mainclass';
function App() {
  return (
    <div>
    <Routes>
          <Route path="/" element={<Login/>} />
          <Route path="/login" element={<Login/>} />
       
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/myclasses" element={<Myclasses/>} />
          <Route path="/myclasses/:id" element={<Mainclass/>} />
    </Routes>
    </div>
  );
}

export default App;
