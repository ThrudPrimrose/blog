import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useEffect, useState } from 'react';

import { ContentfulService } from './Contentful.js'
import { compareByDate, formatDateToMonthYear, isUnixEpoch } from './Util.js'


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
  const [autobiography, setAutobiography] = useState( // eslint-disable-line no-unused-vars 
    [], // This due to a bug in rendering that I could not solve
  );
  const [experience, setExperience] = useState( // eslint-disable-line no-unused-vars
    [],  // That I use the "items" vars in the beginning
  );
  const [education, setEducation] = useState( // eslint-disable-line no-unused-vars
    [],
  );

  useEffect(() => {
    ContentfulService.getInstance().getAutobiography().then(data => {

      console.assert(data.length === 1);
      var el = data[0];
      var me = {
        name: el.fields.name + ' ' + el.fields.surname,
        autobiography: el.fields.autobiography,
        imageUrl: el.fields.photo.fields.file.url
      };
      setAutobiography([me]);
    });
  }, []);

  useEffect(() => {
    ContentfulService.getInstance().getExperience().then(data => {
      let experienceItems = data[0].fields.experienceItems;
      experienceItems.sort(compareByDate('fields', 'end'))
      setExperience(experienceItems);
    });
  }, []);

  useEffect(() => {
    ContentfulService.getInstance().getEducation().then(data => {
      let educationItems = data[0].fields.educationItem;
      educationItems.sort(compareByDate('fields', 'end'))
      setEducation(educationItems);
    });
  }, []);

  return (
    <div className="dark:bg-gray-800">
      {(autobiography && education && experience) ? (
        <>
          {autobiography.map((person, piter) => (
            <li key={'p_' + piter}>
              <div className='container mx-auto bg-white-200 p-8 m-10 mb-2 min-h-48 min-w-160 w-auto max-w-screen-lg dark:bg-slate-800' key='person_container'>
                <div className='flex flex-row gap-x-4 w-full dark:bg-slate-800' key={person.name + '_container'}>
                  <div className='flex-initial h-48 w-48 min-w-[128px] min-h-[128px] flex-shrink-0 aspect-square dark:bg-slate-800' key='person_image_container'>
                    <img className='rounded-full h-48 w-48' src={person.imageUrl} alt='' key='person_image' />
                  </div>
                  <div className='flex-1 flex-auto' key='icon_container'>
                    <p className='mt-1 text-sm font-semibold leading-6 text-gray-900 text-xl' key='name_inner'>{person.name}</p>
                    <p className='mt-2 text-gray-600 overflow-visible w-full' key='bio_inner'>{person.autobiography}</p>
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
            {education ? (
              <ol className='relative border-l border-gray-200 dark:border-gray-700 m-10 mt-4' key='edu_list'>
                {education.map((item, index) => (
                  <li className='m-4' key={'edu_list_item_' + index}>
                    <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'
                      key={'edu_item_' + index}></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-400" key={"edu_date_" + index}>
                      {isUnixEpoch(item.fields.end) ?
                        formatDateToMonthYear(item.fields.begin) + " - Present" :
                        formatDateToMonthYear(item.fields.begin) + " - " + formatDateToMonthYear(item.fields.end)}</time>
                    <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-700' key={'edu_item_summary_' + index}>
                      {item.fields.institution}
                    </h3>
                    <div className="mb-1 pl-6 text-base font-normal text-gray-600 dark:text-gray-700" key={"edu_item_text_" + index}>
                      <div className="max-w-screen-lg mx-auto" key={"edu_item_text_inner_div_" + index}>
                        {item.fields.degree}
                      </div>
                    </div>
                    {index < (education.length - 1) && (
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
              {experience.map((experienceItem, index) => (
                <li className='m-4' key={'CV_list_item_' + index}>
                  <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'
                    key={'experience_item_' + index}></div>
                  <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-400" key={"experience_date_" + index}>
                    {formatDateToMonthYear(experienceItem.fields.begin) + " - " + formatDateToMonthYear(experienceItem.fields.end)}</time>
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-700' key={'experience_item_summary_' + index}>{experienceItem.fields.summary}</h3>
                  <div className="mb-4 pl-6 text-base font-normal text-gray-600 dark:text-gray-400 pr-4" key={"experience_item_text_" + index}>
                    <div className="max-w-screen-lg mx-auto text-justify" key={"experience_item_text_inner_div_" + index}>
                      {documentToReactComponents(experienceItem.fields.details)}
                    </div>
                  </div>
                  {index < (experience.length - 1) && (
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