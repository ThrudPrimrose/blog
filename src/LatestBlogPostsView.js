
import { useEffect, useState } from 'react';

import { Link } from "react-router-dom";

import { ContentfulService } from './Contentful.js'

var retrivedLatestBlogPosts = false;

export default function LatestBlogPostsView(props) {
  const [latestBlogPosts, setLatestsBlogPosts] = useState(null);
  let n = props.n;
  let changeField = props.changeField;
  useEffect(() => {
    if (n > 0) {
      ContentfulService.getInstance()
        .getLatestNBlogPosts(n)
        .then((data) => {
          setLatestsBlogPosts(data);
          retrivedLatestBlogPosts = true;
        })
        .catch((error) => console.error('Error fetching data:', error));
    } else {
      console.error("BlogPostView should only be called with n > 0");
    }
  });

  return (
    <>
      {
        retrivedLatestBlogPosts && latestBlogPosts != null ?
          (<div className='pt-8 pr-4 pl-4'> {latestBlogPosts.items.map((post, iter) => (
            <div className='mx-auto bg-white rounded-sm shadow-md overflow-hidden w-[80vw] m-8 mb-6 mt-6
          hover:transform hover:scale-105 hover:shadow-lg transition ease-out h-min-[48]' key={'blog_post_outer_div' + iter}>
              <Link
                className='h-full w-full'
                href={'/blog/newestBlogPost' + String(iter)}
                key={'blog_post_link_' + iter}
                to={'/blog/newestBlogPost' + String(iter)}
                onClick={() => {
                  changeField('Blog');
                }}>
                <div className='flex h-min-[48]' key={'blog_post_inner_div' + iter}>
                  <div className='w-32 h-32 flex-shrink-0 m-4' key={'blog_post_image_div' + iter}>
                    <img src={post.fields.postThumbnail.fields.file.url} alt='Thumbnail' className='w-full h-full object-cover' key={
                      'blog_post_image' + iter} />
                  </div>
                  <div className='relative' key={'blog_post_nimage_outer_div' + iter}>
                    <div className='p-8 w-full' key={'blog_post_nimage_inner_div' + iter}>
                      <div className='uppercase tracking-wide text-sm text-gray-900 font-semibold' key={'blog_post_summary_div' + iter}>{post.fields.postTitle}</div>
                      <p key={'blog_post_text' + iter} className='mt-2 text-gray-600 text-justify'>{('postSummary' in post.fields) ? post.fields.postSummary.slice(0, Math.min(200, post.fields.postSummary.length)) : ''}...</p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          </div>
          ) : (<div></div>)}
    </>
  );
}