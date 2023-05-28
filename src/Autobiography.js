import { ContentfulService } from "./Contentful.js"
import { useState, useEffect } from 'react';

var retrieved = false;
var collect = []

const social_media= [
  ["instagram", "https://www.instagram.com/thrudprimrose", "/assets/instagram.png", 1.0], 
  ["github","https://github.com/ThrudPrimrose/", "/assets/github.svg", 1.0],
  ["linkedin","https://www.linkedin.com/in/yakup-koray-budanaz-51136b1b5/", "/assets/linkedin.png", 1.18], 
  ["resaerchgate","https://www.researchgate.net/profile/Yakup-Budanaz", "/assets/researchgate.svg", 1.0]
]

export default function Autobiography() {
  const [people, setPeople] = useState(
      [],
  );

  useEffect(() => {
      if (!retrieved){
          ContentfulService.getInstance().getAutobiography().then(data => {
              //console.log(data);
              console.assert(data.length === 1);
              var el = data[0];
              var me = {
                  name: el.fields.name,
                  autobiography: el.fields.autobiography,
                  imageUrl: el.fields.photo.fields.file.url
              };
              collect = [...people, me];
              setPeople(collect);
              
              retrieved = true;
          });
      }
  });

  return (
    <div className="container mx-auto bg-white-200 shadow border p-8 m-10 min-h-64 w-fit">
      <div className="text-500 text-lg h-500 min-h-200">
          {collect.map((person, index) => (
              <div className="flex gap-x-4 m-4" key={person.name + "_container"}>
                <img className="h-64 w-64 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
                <div className="w-fit mr-4">
                  <p className="mt-8 text-sm font-semibold leading-6 text-gray-900 text-xl">{person.name}</p>
                  <p className="mt-4 truncate leading-5 text-gray-500">{person.autobiography}</p>
                  <div className="m-8 flex flex-row justify-center">
                    {social_media.map((media_and_link, iter) => (
                      <div className="h-16 w-16 ml-1 mr-1" key={media_and_link[1]+ "_logo"}>
                        <a className="h-full w-full" href={media_and_link[1]}>
                          <img width={32*media_and_link[3]} height={32*media_and_link[3]} src={media_and_link[2]}  alt={media_and_link[0]}></img>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
          ))}
      </div>
    </div>
  )
}