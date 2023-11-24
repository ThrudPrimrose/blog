import { useState, useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function Feed() {
  const [jsonData, setJsonData] = useState(null);

  useEffect(() => {
    // Fetch JSON data from the URL
    fetch('https://feeds.behold.so/wpjRz1NveAo9372ztl7L')
      .then((response) => response.json())
      .then((data) => { 
        if (!(data.status && data.status === "error")){
          setJsonData(data);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <>
      <div className="container mx-auto">
        {jsonData ? (
          <>
          <Carousel
            responsive={responsive}
            className="flex pl-8 pr-8 ml-8 mr-8 flex-shrink-0 dark:bg-gray-800">
            {(() => {
              const arr = [];
              for (let index = 0; index < jsonData.length; index++) {
                if (jsonData[index].dimensions.width > jsonData[index].dimensions.height) {
                  arr.push(
                    <div key={"feed_item_1_" + index} className="group/item p-8 w-64 h-64 flex justify-center flex-shrink-0">
                      <a href="https://www.instagram.com/thrudprimrose" className="flex justify-center">
                        <img src={jsonData[index].mediaUrl} alt={"feed_item_image_1_" + index} className="mx-auto rounded hover:animate-blur hover:blur-[3px] object-cover"></img>
                        <div key={"circle_1_" + index} className="group/edit invisible hover:bg-slate-200 group-hover/item:visible">
                          <img className="flex justify-center absolute inset-0 w-16 h-16 object-cover z-10 mx-auto mt-24 ml-24 invert pointer-events-none"
                            key={"social_media_image_" + index}
                            src="/assets/instagram_white.svg" alt=""></img>
                        </div>
                      </a>
                    </div>
                  );
                } else {
                  arr.push(
                    <div key={"feed_item_2_" + index} className="group/item p-8 h-64 w-64 flex justify-center flex-shrink-0">
                      <a href="https://www.instagram.com/thrudprimrose" className="flex justify-content">
                        <img src={jsonData[index].mediaUrl} alt={"feed_item_image_2_" + index} className="mx-auto rounded hover:animate-blur hover:blur-[3px] object-cover"></img>
                        <div key={"circle_2_" + index} className="group/edit invisible hover:bg-slate-200 group-hover/item:visible">
                          <img className="flex justify-center absolute inset-0 w-16 h-16 object-cover z-10 mx-auto mt-24 ml-24 invert pointer-events-none"
                            key={"social_media_image_" + index}
                            src="/assets/instagram_white.svg" alt=""></img>
                        </div>
                      </a>
                    </div>
                  );
                }
              }
              return arr;
            })()}
          </Carousel>
          <div className="mx-auto rounded-sm pt-1 mb-[-25px] relative">
            <a href="https://www.instagram.com/thrudprimrose" className="text-gray-600 absolute top-0 right-0 mr-[25px]"> @thrudprimrose </a>
          </div>
          </>
        ) : (<></>)}

      </div>
    </>
  );
}
