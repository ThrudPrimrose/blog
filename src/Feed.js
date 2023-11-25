//import { useState } from 'react';
import { useEffect } from 'react';
//import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
//import { InstagramEmbed } from 'react-social-media-embed';
//import { ContentfulService } from './Contentful';

export default function Feed() {
  /*
  const [favPosts, setFavPosts] = useState(null);

  useEffect(() => {
    ContentfulService.getInstance().getFavoritePosts().then((data) => {
      let links = data[0].fields.links;
      console.log("A", data, "L", links);
      setFavPosts(links);
    });
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 2001 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 2000, min: 1101 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1100, min: 701 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1
    }
  };
  */

  useEffect(() => {
    // Function to create and append the script element
    const loadEmbedSocialScript = () => {
      const script = document.createElement('script');
      script.id = 'EmbedSocialHashtagScript';
      script.src = 'https://embedsocial.com/cdn/ht.js';
      document.getElementsByTagName('head')[0].appendChild(script);
    };

    // Check if the script has already been added to the DOM
    if (!document.getElementById('EmbedSocialHashtagScript')) {
      loadEmbedSocialScript();
    }

    // Cleanup function to remove the script when the component is unmounted
    return () => {
      const scriptElement = document.getElementById('EmbedSocialHashtagScript');
      if (scriptElement) {
        scriptElement.remove();
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once after the initial render


 //className={`m-2 h-[${favPosts[index].height}-px]` style={{ height: favPosts[index].height}}
  return (
    <>
      <div className="container mx-auto lg:max-w-[60%] md:max-w-[70%] sm:max-w-[85%]">
        <div className="embedsocial-hashtag" data-ref="84edfe98a6d82d183a31c28bd535695fdf28680d">
          <a
            className="feed-powered-by-es"
            href="https://embedsocial.com/social-media-aggregator/"
            target="_blank"
            title="Widget by EmbedSocial"
          >
          </a>
        </div>
      </div>
    </>
  );
}

/*
<Carousel
  responsive={responsive}
  className="flex flex-shrink-0 dark:bg-gray-800 justify-content-center">
  {(() => {
    const arr = [];
    for (let index = 0; index < favPosts.length; index++) {
      arr.push(
        <div className={`sm:m-1 md:m-2 lg:m-2 xl:m-4`}>
          <InstagramEmbed className={``} url={favPosts[index].url} linkText="a"
          />
        </div>
      )
    }
    return arr;
  })()}
</Carousel>
*/
