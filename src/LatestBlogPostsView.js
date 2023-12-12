import { Link } from "react-router-dom";
import { useState } from "react";

export default function LatestBlogPostsView(props) {
  let data = props.data;
  let n = props.n;
  if (n < 0) {
    n = Number.MAX_SAFE_INTEGER;
  }
  console.log(data);

  const [query, setQuery] = useState('');

  const handleInputChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);

    // Trigger search whenever the user types (you may add debouncing for performance)
    console.log('Search query:', newQuery.toLowerCase());
  };

  return (
    <>
      {
        data && n === Number.MAX_SAFE_INTEGER &&
          (
            <div className='mt-4 pr-4 pl-4'>
              <div className='mx-auto overflow-hidden w-[80vw] m-8 mb-6 mt-6 pl-4 pr-4'>
                <div className='flex justify-end xs:flex-col sm:flex-col md:flex-row w-min-[48] h-min-[48]'>
                  <div>
                    <input
                      className="border-[2px] border-gray-300 p-1 rounded-md text-sm"
                      type="text"
                      placeholder="Search tags"
                      value={query}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
            </div>
          )
      }
      {
        data &&
        (<div className='mt-4 pr-4 pl-4'> {
          data.items.slice(0, n).map((post, iter) => (
            <>
            { post.fields.tag.toLowerCase().includes(query.toLowerCase()) && 
              <div className='mx-auto bg-white rounded-sm shadow-md overflow-hidden w-[80vw] m-8 mb-6 mt-6 hover:transform hover:scale-105 hover:shadow-lg transition ease-out h-min-[48]' key={'blog_post_outer_div' + iter}>
                <Link
                  className='h-full w-full'
                  href={'/blog/' + post.fields.postTitle.replace(/\s/g, "")}
                  to={'/blog/' + post.fields.postTitle.replace(/\s/g, "")}
                  key={'blog_post_view_link_' + iter}>
                  <div className='flex xs:flex-col sm:flex-col md:flex-row w-min-[48] h-min-[48]' key={'blog_post_inner_div' + iter}>
                    <div className='xs:w-full md:w-48 xs:justify-center md:justify-start flex sm:m-4'>
                      <div className='w-48 h-48 m-2 xs:justify-center md:justify-start 4 md:m-auto' key={'blog_post_image_div' + iter}>
                        <img src={post.fields.postThumbnail.fields.file.url} alt='Thumbnail' className='w-full h-full object-cover' key={
                          'blog_post_image' + iter} />
                      </div>
                    </div>
                    <div className='relative' key={'blog_post_nimage_outer_div' + iter}>
                      <div className='p-8 w-full' key={'blog_post_nimage_inner_div' + iter}>
                        <div className='uppercase tracking-wide text-sm text-gray-900 font-semibold' key={'blog_post_summary_div' + iter}>{post.fields.postTitle}</div>
                        <div className="rounded-xl border-[2px] inline-block whitespace-nowrap h-6 pl-1 pr-1 mt-2 mb-1">
                          <p className="text-gray-700 text-xs">{post.fields.tag}</p>
                        </div>
                        <div className="hidden sm:flex">
                          <p key={'blog_post_text' + iter} className='mt-2 text-gray-600 text-justify'>{('postSummary' in post.fields) ? post.fields.postSummary.slice(0, Math.min(800, post.fields.postSummary.length)) : ''}
                            {post.fields.postSummary.length > 800 ? (
                              <p>...</p>
                            ) : (<></>)
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            }
            </>
          ))}
        </div>
        )}
    </>
  );
}