import React, {useState} from 'react';
import './index.css';
import Search from "./components/Search.jsx";
import MiApi from "./components/MiApi.jsx";



function App() {
  const [busqueda, setBusqueda] = useState("");

    
  return (
    <div className="App">
      <Search setBusqueda={setBusqueda} />
      <MiApi busqueda={busqueda}/>
    </div>
  );
}

export default App;
