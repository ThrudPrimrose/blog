import './App.css';
import Autobiography from './Autobiography.js';
import Greet from './Greet.js';
import Navbar from './Navbar.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <Navbar/>
        <Routes>
          <Route path="/" element={<><Greet /></>} />
          <Route path="bio" element={<Autobiography />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
