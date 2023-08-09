
import "./App.css";
import { Route , Routes} from "react-router-dom";

import Home from "./Pages/Home";


import Login from './components/Login';
import Register from './components/Register';
import Landing from './components/Landing';
import ManufacturerLanding from './components/ManufacturerLanding';
import TransporterLanding from './components/TransporterLanding';
import Chats from "./Pages/Chats";

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/chats" element={<Chats/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/manufacturer" element={<ManufacturerLanding/>} />
      <Route path="/transporter"  element={<TransporterLanding/>} />
      
      </Routes>
    </div>
  );
}

export default App;
