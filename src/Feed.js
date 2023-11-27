import { useEffect } from 'react';
import 'react-multi-carousel/lib/styles.css';

export default function Feed() {
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

  return (
    <>
      <div className="container overflow-hidden">
        <div class="h-full bg-light-blue-200">
        <div className="container mx-auto max-w-[100%]">
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
        <p class="m-2"></p>
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
