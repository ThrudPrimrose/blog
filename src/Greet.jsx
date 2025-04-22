import Feed from './Feed.jsx';
import LatestBlogPostsView from './LatestBlogPostsView.jsx';

export default function Greet(props) {
  let data = props.data;
  return (
    <>
      <div className=
        'container mx-auto rounded-md shadow p-8 m-10 max-w-[80vw] dark:bg-gray-900 mt-10'>
        <p className='text-3xl text-gray-700 dark:text-gray-200 font-bold mb-5'>Welcome!
        </p>
        <p className="text-lg text-gray-600 dark:text-gray-100 mb-5 text-justify">
          This essentially a mix of a personal-blog, a virtual business card, a place to self-publish my short stories and essays, an online CV, a place to post some photos that are not too fit for other social media outlets,
          a web portal to talk about my research, and a project to train some web development and design!
        </p>
      </div>
      <div className="mt-5">
        <div className='bg-gray-200 dark:bg-gray-400 h-0.5 w-[70%] mx-auto rounded-full' key={'b_m_' + 0}></div>
      </div>
      <LatestBlogPostsView data={data} />
      <div className="mt-10">
        <div className='bg-gray-200 dark:bg-gray-400 h-0.5 w-[70%] mx-auto rounded-full' key={'b_m_' + 1}></div>
        <div className='mx-auto w-[70%]'>
          <div className="mt-0 w-[100%] xs:pl-[12%] xs:pr-[8%] sm:pl-1 sm:pr-1">
            <Feed />
          </div>
        </div>
      </div>
    </>);
}