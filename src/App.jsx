import './App.css';
import { BrowserRouter } from "react-router-dom";
import Core from './Core.jsx'
import { useState } from 'react';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    console.log(darkMode);
  };

  return (
    <div className={` ${darkMode ? 'dark' : ''}`}>
      <div className="dark:bg-slate-800">
        <BrowserRouter>
          <Core toggleDarkMode={toggleDarkMode}/>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
