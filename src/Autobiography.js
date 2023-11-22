import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useEffect, useState } from 'react';

import { ContentfulService } from './Contentful.js'
import { compareByDate, formatDateToMonthYear, isUnixEpoch } from './Util.js'

var retrievedAutobiography = false;
var retrievedExperienceItems = false;
var retrievedEducationItems = false;
var autobiography = [];
var experienceItems = [];
var educationItems = [];

const social_media = [
  [
    'instagram', 'https://www.instagram.com/thrudprimrose',
    '/assets/instagram.svg', 1.0
  ],
  ['github', 'https://github.com/ThrudPrimrose/', '/assets/github.svg', 1.0],
  [
    'linkedin', 'https://www.linkedin.com/in/yakup-koray-budanaz-51136b1b5/',
    '/assets/linkedin.png', 1.18
  ],
  [
    'resaerchgate', 'https://www.researchgate.net/profile/Yakup-Budanaz',
    '/assets/researchgate.svg', 1.0
  ]
];


export default function Autobiography() {
  const [people, setPeople] = useState( // eslint-disable-line no-unused-vars 
    [], // This due to a bug in rendering that I could not solve
  );
  const [experience, setExperience] = useState( // eslint-disable-line no-unused-vars
    [],  // That I use the "items" vars in the beginning
  );
  const [education, setEducation] = useState( // eslint-disable-line no-unused-vars
    [],
  );

  useEffect(() => {
    if (!retrievedAutobiography) {
      ContentfulService.getInstance().getAutobiography().then(data => {

        console.assert(data.length === 1);
        var el = data[0];
        var me = {
          name: el.fields.name + ' ' + el.fields.surname,
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

        experienceItems = data[0].fields.experienceItems;
        experienceItems.sort(compareByDate('fields', 'end'))
        setExperience(experienceItems);
      });
      retrievedExperienceItems = true;
    }
  });

  useEffect(() => {
    if (!retrievedEducationItems) {
      ContentfulService.getInstance().getEducation().then(data => {

        educationItems = data[0].fields.educationItem;
        setEducation(educationItems);
      });
      retrievedEducationItems = true;
    }
  });

  return (
    <div className="dark:bg-gray-800">
      {(retrievedAutobiography && retrievedEducationItems && retrievedExperienceItems) ? (
        <>
          {autobiography.map((person, piter) => (
            <li key={'p_' + piter}>
              <div className='container mx-auto bg-white-200 p-8 m-10 mb-2 min-h-48 min-w-160 w-auto max-w-screen-lg dark:bg-slate-800' key='person_container'>
                <div className='flex flex-row gap-x-4 w-full dark:bg-slate-800' key={person.name + '_container'}>
                  <div className='flex-initial h-48 w-48 min-w-[128px] min-h-[128px] flex-shrink-0 aspect-square dark:bg-slate-800' key='person_image_container'>
                    {!retrievedAutobiography ? (
                      <div className='rounded-full h-48 w-48'>
                        <svg aria-hidden='true' className='w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600' viewBox='0 0 100 101' fill='none' xmlns='http://www.w3.org/2000/svg'>
                          <path d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z' fill='currentColor' />
                          <path d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z' fill='currentFill' />
                        </svg>
                      </div>
                    ) : (
                      <img className='rounded-full h-48 w-48' src={person.imageUrl} alt='' key='person_image' />
                    )}
                  </div>
                  <div className='flex-1 flex-auto' key='icon_container'>
                    <p className='mt-1 text-sm font-semibold leading-6 text-gray-900 text-xl' key='name_inner'>{person.name}</p>
                    <p className='mt-2 text-gray-500 overflow-visible w-full' key='bio_inner'>{person.autobiography}</p>
                    <div className='mt-8 ml-0 sm:ml-8 mr-0 sm:ml-8 flex justify-center' key='media_container'>
                      {social_media.map((media_and_link, index) => (
                        <div className='flex flex-auto' key={media_and_link[1] + '_grouper_' + index}>
                          <div className='flex-auto' key={media_and_link[1] + '_logo_' + index}>
                            <div className="aspect-square">
                              <a className='h-full w-full' href={media_and_link[1]} key={media_and_link[1] + '_link_' + index}>
                                <img width={32 * media_and_link[3]} height={32 * media_and_link[3]}
                                  key={media_and_link[1] + '_image_' + index}
                                  src={media_and_link[2]} alt={media_and_link[0]}></img>
                              </a>
                            </div>
                          </div>
                          {index < (social_media.length - 1) && (
                            <div className="flex-auto border-l-2 border-gray-300 h-8 w-2" key={"clause_guard_social_media_" + piter + "_" + index}></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className='mt-8 bg-gray-200 h-0.5 w-80% rounded-full' key={'b_' + piter}></div>
              </div>
            </li>
          ))}
          <div className="container mx-auto bg-white-200 p-8 pb-0 pt-0 min-h-48 min-w-128 max-w-screen-lg relative" key="education_items_container">
            <h1 className="text-3xl font-semibold text-gray-700 dark:text-gray-700" key="edu_title">Education:</h1>
            {educationItems ? (
              <ol className='relative border-l border-gray-200 dark:border-gray-700 m-10 mt-4' key='edu_list'>
                {educationItems.map((item, index) => (
                  <li className='m-4' key={'edu_list_item_' + index}>
                    <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'
                      key={'edu_item_' + index}></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500" key={"edu_date_" + index}>
                      {isUnixEpoch(item.fields.end) ?
                        formatDateToMonthYear(item.fields.begin) + " - Present" :
                        formatDateToMonthYear(item.fields.begin) + " - " + formatDateToMonthYear(item.fields.end)}</time>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-700' key={'edu_item_summary_' + index}>
                      {item.fields.institution}
                    </h3>
                    <div className="mb-1 text-base font-normal text-gray-500 dark:text-gray-700" key={"edu_item_text_" + index}>
                      <div className="max-w-screen-lg mx-auto" key={"edu_item_text_inner_div_" + index}>
                        {item.fields.degree}
                      </div>
                    </div>
                    {index < (educationItems.length - 1) && (
                      <div className="bg-gray-200 h-0.5 w-90% rounded-full" key={"clause_guard_edu_" + index}></div>
                    )}
                  </li>
                ))}
              </ol>
            ) : ''}
          </div>

          <div className="container mx-auto bg-white-200 min-h-48 min-w-128 max-w-screen-lg p-8 pt-2" key="CV_list_container">
            <h1 className="text-3xl font-semibold text-gray-700 " key="exp_title">Work Experience:</h1>
            <ol className='relative border-l border-gray-200 dark:border-gray-700 m-10 mt-2' key='CV_list'>
              {experienceItems.map((experienceItem, index) => (
                <li className='m-4' key={'CV_list_item_' + index}>
                  <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'
                    key={'experience_item_' + index}></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500" key={"experience_date_" + index}>
                    {formatDateToMonthYear(experienceItem.fields.begin) + " - " + formatDateToMonthYear(experienceItem.fields.end)}</time>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-700' key={'experience_item_summary_' + index}>{experienceItem.fields.summary}</h3>
                  <div className="mb-4 text-base font-normal text-gray-500 dark:text-gray-400" key={"experience_item_text_" + index}>
                    <div className="max-w-screen-lg mx-auto" key={"experience_item_text_inner_div_" + index}>
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
      ) : (
        <div>
        </div>
      )}
    </div>
  )
}