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
import Materials from './pages/Materials';
import ClassMaterial from './pages/ClassMaterial';
import Assignment from './pages/Assignment';
import ClassAssignment from './pages/ClassAssignment';
import Calender from './components/Calender';
import AddQuestion from './pages/AddQuestion';
import Quizpage from './pages/Quizpage';
import Actualquizpage from './pages/Actualquizpage';
import Groupspage from './pages/Groupspage';
import Allclassesgroups from './pages/Allclassesgroups';
import Askadoubt from './pages/Askadoubt';
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
          <Route path="/materials" element={<Materials/>}/>
          <Route path="/materials/:id" element={<ClassMaterial/>} />
          <Route path="/assignments" element={<Assignment/>}/>
          <Route path="/assignments/:id" element={<ClassAssignment/>} />
          <Route path="/calender" element={<Calender/>} />
          <Route path="/addquestion/:id" element={<AddQuestion/>} />
          <Route path="/quiz" element={<Quizpage/>} />
          <Route path="/quiz/:id" element={<Actualquizpage/>} />
          <Route path="/classgroups" element={<Allclassesgroups/>} />
          <Route path="/classgroups/:id" element={<Groupspage/>} />
          <Route path="/askadoubt" element={<Askadoubt/>} />
    </Routes>
    </div>
  );
}

export default App;
