import Feed from './Feed.js';
import LatestBlogPostsView from './LatestBlogPostsView.js';

export default function Greet(props) {
  let data = props.data;
  return (
    <>
      <div className=
        'container mx-auto rounded-md shadow p-8 m-10max-w-[80vw] dark:bg-slate-800 mt-10'>
        <p className='text-3xl text-gray-700 font-bold mb-5 dark:bg-slate-800'>Welcome!
        </p>
        <p className="text-lg text-gray-600 mb-5 dark:bg-slate-800 text-justify">
          This essentially a mix of a personal-blog, a virtual business card, a place to self-publish my short stories and essays, an online CV, a place to post some photos that are not too fit for other social media outlets,
          a web portal to talk about my research, and a project to train some web development and design!
        </p>
      </div>
      <div className="mt-5">
        <div className='bg-gray-200 h-0.5 w-[70%] mx-auto rounded-full' key={'b_m_' + 0}></div>
      </div>
      <LatestBlogPostsView data={data} />
      <div className="mt-10">
        <div className='bg-gray-200 h-0.5 w-[70%] mx-auto rounded-full' key={'b_m_' + 1}></div>
        <div className="mt-10 mx-auto sm:max-w-[80%] xs:max-w-[80%]">
          <Feed />
        </div>
      </div>
    </>);
}