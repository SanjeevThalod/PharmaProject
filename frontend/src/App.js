import './App.css';
import {
  Routes,
  Route
} from "react-router-dom";
import Home from './Pages/Home';
import Medicine from './Pages/Medicine';
import Main from './Pages/Main';
import CareTaker from './Pages/CareTaker';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path='/main' element={<Main/>} />
        <Route exact path='/medicines' element={<Medicine/>}/>
        <Route exact path='/caretakers' element={<CareTaker/>}/>
      </Routes>
    </div>
  );
}

export default App;