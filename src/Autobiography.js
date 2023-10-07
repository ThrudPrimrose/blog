import { ContentfulService } from "./Contentful.js"
import { useState, useEffect } from 'react';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { formatDateToMonthYear, compareByDate } from "./Util.js"

var retrievedAutobiography = false;
var retrievedExperienceItems = false;
var retrievedEducationItems = false;
var autobiography = [];
var experienceItems = [];
var educationItems = [];

const social_media = [
  ["instagram", "https://www.instagram.com/thrudprimrose", "/assets/instagram.svg", 1.0],
  ["github", "https://github.com/ThrudPrimrose/", "/assets/github.svg", 1.0],
  ["linkedin", "https://www.linkedin.com/in/yakup-koray-budanaz-51136b1b5/", "/assets/linkedin.png", 1.18],
  ["resaerchgate", "https://www.researchgate.net/profile/Yakup-Budanaz", "/assets/researchgate.svg", 1.0]
];


export default function Autobiography() {
  const [people, setPeople] = useState(
    [],
  );
  const [experience, setExperience] = useState(
    [],
  );
  const [education, setEducation] = useState(
    [],
  );

  useEffect(() => {
    if (!retrievedAutobiography) {
      ContentfulService.getInstance().getAutobiography().then(data => {
        //console.log(data);
        console.assert(data.length === 1);
        var el = data[0];
        var me = {
          name: el.fields.name + " " + el.fields.surname,
          autobiography: el.fields.autobiography,
          imageUrl: el.fields.photo.fields.file.url
        };
        autobiography = [me];
        setPeople(autobiography);
      });
      retrievedAutobiography = true;
    }
  });

  useEffect(() => {
    if (!retrievedExperienceItems) {
      ContentfulService.getInstance().getExperience().then(data => {
        console.log("experience", data);
        experienceItems = data[0].fields.experienceItems;
        experienceItems.sort(compareByDate("fields", "end"))
        setExperience(experienceItems);
      });
      retrievedExperienceItems = true;
    }
  });

  useEffect(() => {
    if (!retrievedEducationItems) {
      ContentfulService.getInstance().getEducation().then(data => {
        console.log("education", data);
        educationItems = data[0].fields.educationItem;
        setEducation(educationItems);
      });
      retrievedEducationItems = true;
    }
  });

  return (
    <>
      {autobiography.map((person) => (
        <div className="container mx-auto bg-white-200 p-8 m-10 mb-2 min-h-48 min-w-128 w-auto max-w-screen-md" key="person_container">
          <div className="flex flex-row gap-x-4 w-full" key={person.name + "_container"}>
            <div className="flex-initial h-48 w-48 min-w-[128px] min-h-[128px] flex-shrink-0" key="personImageContainer">
              <img className="rounded-full h-48 w-48" src={person.imageUrl} alt="" key="person_image" />
            </div>
            <div className="flex-1 flex-auto" key="icon_container">
              <p className="mt-1 text-sm font-semibold leading-6 text-gray-900 text-xl">{person.name}</p>
              <p className="mt-2 text-gray-500 overflow-visible w-full">{person.autobiography}</p>
              <div className="mt-8 ml-0 flex justify-center">
                {social_media.map((media_and_link, index) => (
                  <>
                    <div className="flex-auto" key={media_and_link[1] + "_logo"}>
                      <a className="h-full w-full" href={media_and_link[1]} key={media_and_link[1] + "_link"}>
                        <img width={32 * media_and_link[3]} height={32 * media_and_link[3]}
                          key={media_and_link[1] + "_image"}
                          src={media_and_link[2]} alt={media_and_link[0]}></img>
                      </a>
                    </div>
                    {index < (social_media.length - 1) && (
                      <div className="flex-auto border-l-2 border-gray-300 h-8 w-2" key={"clause_guard_social_media_" + index}></div>
                    )}
                  </>
                ))}
              </div>
            </div>
          </div>
        <div className="mt-8 bg-gray-200 h-0.5 w-80% rounded-full" key={"b1"}></div>
        </div>
      ))}

      <div className="container mx-auto bg-white-200 p-8 pb-0 pt-0 min-h-48 min-w-128 max-w-screen-md relative" key="education_items_container">
        <>
        <h1 className="text-3xl font-semibold text-gray-700 dark:text-white" key="eduTitle">Education:</h1>
          {educationItems ? (
            <ol className="relative border-l border-gray-200 dark:border-gray-700 m-10 mt-4" key="edu_list">
              {educationItems.map((item, index) => (
                <li className="m-4" key={"edu_list_item_" + index}>
                  <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
                    key={"eduItem" + index}></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500" key={"edu_date_" + index}>
                    {formatDateToMonthYear(item.fields.begin) + " - " + formatDateToMonthYear(item.fields.end)}</time>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white" key={"edu_item_summary_" + index}>
                    {item.fields.institution}
                  </h3>
                  <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400" key={"edu_item_text_" + index}>
                    <div className="max-w-screen-md mx-auto" key={"edu_item_text_inner_div_" + index}>
                      {item.fields.degree}
                    </div>
                  </div>
                  {index < (educationItems.length - 1) && (
                    <div className="bg-gray-200 h-0.5 w-90% rounded-full" key={"clause_guard_" + index}></div>
                  )}
                </li>
              ))}
            </ol>
          ) : ''}
        </>
      </div>

      <div className="container mx-auto bg-white-200 min-h-48 min-w-128 max-w-screen-md p-8 pt-2" key="CV_list_container">
      <h1 className="text-3xl font-semibold text-gray-700 dark:text-white" key="eduTitle">Work Experience:</h1>
        <ol className="relative border-l border-gray-200 dark:border-gray-700 m-10 mt-2" key="CV_list">
          {experienceItems.map((experienceItem, index) => (
            <li className="m-4" key={"CV_list_item_" + index}>
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"
                key={"ExperienceItem" + index}></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500" key={"experience_date_" + index}>
                {formatDateToMonthYear(experienceItem.fields.begin) + " - " + formatDateToMonthYear(experienceItem.fields.end)}</time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white" key={"experience_item_summary_" + index}>{experienceItem.fields.summary}</h3>
              <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400" key={"experience_item_text_" + index}>
                <div className="max-w-screen-md mx-auto" key={"experience_item_text_inner_div_" + index}>
                  {documentToReactComponents(experienceItem.fields.details)}
                </div>
              </div>
              {index < (experienceItems.length - 1) && (
                    <div className="bg-gray-200 h-0.5 w-90% rounded-full" key={"clause_guard_exp_" + index}></div>
                  )}
            </li>
          ))}
        </ol>
      </div>
    </>
  )
}