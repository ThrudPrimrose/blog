import { ContentfulService } from "./Contentful.js"
import { useState, useEffect } from 'react';

var retrievedAutobiography = false;
var retrievedExperienceItems = false;
var autobiography = []
var experienceItems = []

const social_media= [
  ["instagram", "https://www.instagram.com/thrudprimrose", "/assets/instagram.svg", 1.0], 
  ["github","https://github.com/ThrudPrimrose/", "/assets/github.svg", 1.0],
  ["linkedin","https://www.linkedin.com/in/yakup-koray-budanaz-51136b1b5/", "/assets/linkedin.png", 1.18], 
  ["resaerchgate","https://www.researchgate.net/profile/Yakup-Budanaz", "/assets/researchgate.svg", 1.0]
]

export default function Autobiography() {
  const [people, setPeople] = useState(
      [],
  );
  const [experience, setExperience] = useState(
    [],
  );

  useEffect(() => {
      if (!retrievedAutobiography){
          ContentfulService.getInstance().getAutobiography().then(data => {
              //console.log(data);
              console.assert(data.length === 1);
              var el = data[0];
              var me = {
                  name: el.fields.name,
                  autobiography: el.fields.autobiography,
                  imageUrl: el.fields.photo.fields.file.url
              };
              autobiography = [me];
              setPeople(autobiography);
          });
        retrievedAutobiography = true;
      }
      if (!retrievedExperienceItems){
        ContentfulService.getInstance().getExperience().then(data => {
          console.log(data);
          experienceItems = data[0].fields.experienceItems;
          setExperience(experienceItems);
        });
        retrievedExperienceItems = true;
      }
  });

  return (
    <>
      {autobiography.map((person) => (
        <div className="container mx-auto bg-white-200 shadow border p-8 m-10 min-h-64 w-fit min-w-80">
            <div className="flex flex-row gap-x-4 m-4 w-full" key={person.name + "_container"}>
              <div className="flex-initial h-64 w-64">
                <img className="rounded-full bg-gray-50" src={person.imageUrl} alt="" />
              </div>
              
              <div className="flex-1 flex-auto">
                <p className="mt-8 text-sm font-semibold leading-6 text-gray-900 text-xl">This is me, {person.name}</p>
                <p className="mt-4 leading-5 text-gray-500 overflow-visible">{person.autobiography}</p>
                <div className="m-8 flex justify-center">
                  {social_media.map((media_and_link, iter) => (
                    <div className="h-16 w-16 ml-1 mr-1 flex-auto" key={media_and_link[1]+ "_logo"}>
                      <a className="h-full w-full" href={media_and_link[1]}>
                        <img width={32*media_and_link[3]} height={32*media_and_link[3]} src={media_and_link[2]}  alt={media_and_link[0]}></img>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
      ))}
      <div className="container mx-auto bg-white-200 shadow border m-10 min-h-64 w-fit">
        {experienceItems.map((experienceItem) => (
          <div className="container mx-auto bg-white-200">
            <div className="text-500 text-lg h-500 min-h-200">
              <div className="flex gap-x-4 m-4" key={experienceItem.fields.summary + "_container"}>
                  <p className="text-sm font-semibold leading-6 text-gray-900 text-xl">{experienceItem.fields.summary}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}