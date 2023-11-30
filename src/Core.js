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
  Routes,
  Route,
} from "react-router-dom";
import { useLocation } from 'react-router-dom';

export default function Core() {
  const location = useLocation();

  useEffect(() => {
    // This will run whenever the location changes
    if (location.pathname === "/") {
      setFieldValue("Home");
    } else {
      const path_tokens = location.pathname.split("/");
      if (path_tokens.length > 1) {
        let capitalized = path_tokens[1].charAt(0).toUpperCase() + path_tokens[1].slice(1);
        if (capitalized === "Bio") {
          capitalized = "Autobiography";
        }
        setFieldValue(capitalized);
      } else {
        setFieldValue("");
      }
    }
  }, [location.pathname]);

  // Simulating session storage here)
  let [fieldValue, setFieldValue] = useState('Home');

  const [latestBlogPosts, setLatestsBlogPosts] = useState(null);
  const [dynamicRoutes, setDynamicRoutes] = useState([]);

  useEffect(() => {
    const retrievedPosts = sessionStorage.getItem('blogPosts') !== null;
    if (retrievedPosts) {
      const data = JSON.parse(sessionStorage.getItem('blogPosts'));
      const asDict = { 'items': data };
      setLatestsBlogPosts(asDict);
      setDynamicRoutes(data.map((el) => {
        const strippedTitle = el.fields.postTitle.replace(/\s/g, "");
        const path = `/blog/${strippedTitle}`;

        return (
          <Route key={strippedTitle}
            path={path}
            element={<BlogPost data={el} />} />
        );
      }));
    } else {
      ContentfulService.getInstance()
        .getBlogPosts()
        .then((data) => {
          const asDict = { 'items': data };
          setLatestsBlogPosts(asDict);
          sessionStorage.setItem('blogPosts', JSON.stringify(data));
          /*
          Session storage for URLs, do it later
          for ( post in data ){
            const url = post.fields.postThumbnail.fields.file.url;
            
            fetch(imageUrl)
            .then(response => response.blob())
            .then(blob => {
              // Convert the blob to a data URL
              const reader = new FileReader();
              reader.onload = () => {
                const dataUrl = reader.result;
      
                // Store the data URL in sessionStorage
                sessionStorage.setItem(post.fields.postTitle., dataUrl);
              };
      
              reader.readAsDataURL(blob);
            })
            sessionStorage.setItem('thumbnail', dataUrl);
          }
          */

          setDynamicRoutes(data.map((el) => {
            const strippedTitle = el.fields.postTitle.replace(/\s/g, "");
            const path = `/blog/${strippedTitle}`;

            return (
              <Route key={strippedTitle}
                path={path}
                element={<BlogPost data={el} />} />
            );
          }));
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, []);

  return (
    <>
      <div className="dark:bg-gray-800 mb-auto min-h-[95vh]">
        <Navbar fieldValue={fieldValue} />
        <Routes>
          <Route path="/" element={<><Greet data={latestBlogPosts} /></>} />
          <Route path="/bio" element={<Autobiography />} />
          <Route path="/blog" element={<Blog data={latestBlogPosts} />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          {dynamicRoutes}
          <Route path="/blog/:postTitle" element={<BlogPost />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}