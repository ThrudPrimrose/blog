import './App.css';
import Autobiography from './Autobiography.js';
import Greet from './Greet.js';
import Navbar from './Navbar.js';
import Blog from './Blog.js';
import Disclaimer from './Disclaimer.js'
import Footer from './Footer.js'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { useState, useEffect } from 'react';

var fieldValueHistory = ['Home']

function App() {
  // Simulating session storage here)
  let [fieldValue, setFieldValue] = useState('Home');

  let changeField = (newValue) => {
    fieldValueHistory.push(newValue);
    setFieldValue(newValue);
  };

  // When the user goes back, we will update the history of the navbar
  useEffect(() => {
    const handlePopstate = () => { 
      if (fieldValueHistory.length > 1){
        fieldValueHistory.pop(); // Current
        setFieldValue(fieldValueHistory[fieldValueHistory.length - 1]);
        console.log('User clicked the back button' + String(fieldValueHistory.length));
      } else if (fieldValueHistory.length === 1) {
        setFieldValue('Home');
        console.log('User clicked the back button' + String(fieldValueHistory.length));
      } // else just ignore it, this means the user pressed back so much that
      // they got the same site again, dont care enough about it to use cookies or anything
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  });

  return (
    <Router>
      <div className="dark:bg-gray-800">
        <Navbar fieldValue={fieldValue} changeField={changeField} />
        <Routes>
          <Route path="/" element={<><Greet changeField={changeField} /></>} />
          <Route path="/bio" element={<Autobiography />} />
          <Route path="/blog" element={<Blog current={-1} />} />
          <Route path="/blog/newestBlogPost0" element={<Blog current={0} />} />
          <Route path="/blog/newestBlogPost1" element={<Blog current={1} />} />
          <Route path="/blog/newestBlogPost2" element={<Blog current={2} />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
