import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Navbaar from "./components/Navbaar";
import Home from './components/Home.js';
import Register from './components/Register';
import Edit from './components/Edit';
import Error from './components/Error';
import Details from './components/Details';
import {Route, Routes} from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Navbaar />
      <Routes>
      <Route  path="/" element={<Home/>} />
      <Route  path="/register" element={<Register/>} />
      <Route  path="/edit/:id" element={<Edit/>} />
      <Route  path="/getuser/:id" element={<Details/>} />
      <Route path="*" element={<Error />} />
    </Routes>
    </div>
  );
}

export default App;
