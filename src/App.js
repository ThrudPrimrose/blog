import './App.css';
import Autobiography from './Autobiography.js';
import Greet from './Greet.js';
import Navbar from './Navbar.js';
import Blog from './Blog.js';
import Disclaimer from './Disclaimer.js'
import Footer from './Footer.js'
import { useState, useEffect } from 'react';
import BlogPost from './BlogPost.js';
import { ContentfulService } from './Contentful.js'
import {
  BrowserRouter,
  Routes, // instead of "Routes"
  Route,
} from "react-router-dom";

var fieldValueHistory = ['Home']

function App() {
 
  // Simulating session storage here)
  let [fieldValue, setFieldValue] = useState('Home');

  let changeField = (newValue) => {
    fieldValueHistory.push(newValue);
    setFieldValue(newValue);
  };

  const [latestBlogPosts, setLatestsBlogPosts] = useState(null);
  const [dynamicRoutes, setDynamicRoutes] = useState([]);

  useEffect(() => {
    ContentfulService.getInstance()
      .getBlogPosts()
      .then((data) => {
        const asDict = { 'items': data };
        setLatestsBlogPosts(asDict);
        setDynamicRoutes(data.map((el, index) => {
          console.log(`Route ${index + 1}:`);
          const strippedTitle = el.fields.postTitle.replace(/\s/g, "");
          const path = `/blog/${strippedTitle}`;
          console.log(`  Path: ${path}`);
          console.log(`  Component: DynamicRoute`);
          console.log();
          
          return (
            <Route key={strippedTitle}
              path={path} 
              element={<BlogPost data={el} />} />
          );
        }));
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // When the user goes back, we will update the history of the navbar
  useEffect(() => {
    const handlePopstate = () => {
      if (fieldValueHistory.length > 1) {
        fieldValueHistory.pop(); // Current
        setFieldValue(fieldValueHistory[fieldValueHistory.length - 1]);
      } else if (fieldValueHistory.length === 1) {
        setFieldValue('');
      } // else just ignore it, this means the user pressed back so much that
      // they got the same site again, dont care enough about it to use cookies or anything
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
    };
  });

  return (
    <BrowserRouter>
      <div className="dark:bg-gray-800 mb-auto min-h-[95vh]">
        <Navbar fieldValue={fieldValue} changeField={changeField} />
        <Routes>
          <Route path="/" element={<><Greet changeField={changeField} data={latestBlogPosts} /></>} />
          <Route path="/bio" element={<Autobiography />} />
          <Route path="/blog" element={<Blog data={latestBlogPosts} />} />
          <Route path="/blog/newestBlogPost0" element={<Blog data={latestBlogPosts} />} />
          <Route path="/blog/newestBlogPost1" element={<Blog data={latestBlogPosts} />} />
          <Route path="/blog/newestBlogPost2" element={<Blog data={latestBlogPosts} />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          {dynamicRoutes}
          <Route path="/blog/:postTitle" element={<BlogPost />} />
        </Routes>
      </div>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
