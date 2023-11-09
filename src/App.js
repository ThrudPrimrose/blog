import './App.css';
import Autobiography from './Autobiography.js';
import Greet from './Greet.js';
import Navbar from './Navbar.js';
import Blog from './Blog.js';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState } from 'react';

function App() {
  let [fieldValue, setFieldValue] = useState('Home');

  let changeField = (newValue) => {
    setFieldValue(newValue);
  };

  return (
    <Router>
      <div>
        <Navbar fieldValue={fieldValue} changeField={changeField} />
        <Routes>
          <Route path="/" element={<><Greet changeField={changeField} /></>} />
          <Route path="/bio" element={<Autobiography />} />
          <Route path="/blog" element={<Blog current={-1} />} />
          <Route path="/blog/newestBlogPost0" element={<Blog current={0} />} />
          <Route path="/blog/newestBlogPost1" element={<Blog current={1} />} />
          <Route path="/blog/newestBlogPost2" element={<Blog current={2} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
