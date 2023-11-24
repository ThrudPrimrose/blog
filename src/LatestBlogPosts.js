
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ContentfulService } from './Contentful.js'
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

var retrivedLatestBlogPosts = false;

export default function LatestBlogPosts(props) {
  const [latestBlogPosts, setLatestsBlogPosts] = useState(null);
  const [renderVar, setRenderVar] = useState(-1);

  let n = props.n;
  let current = props.current;
  window.addEventListener('beforeunload', function () {
    sessionStorage.setItem('refreshFlag2', 'true');
  });

  window.addEventListener('load', function () {
    const refreshFlag = sessionStorage.getItem('refreshFlag2');

    if (refreshFlag) {
      // Clear the flag
      changeCurrent(-1);
    }
  });

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
      ContentfulService.getInstance()
        .getBlogPosts()
        .then((data) => {
          const asDict = { 'items': data };
          setLatestsBlogPosts(asDict);
          retrivedLatestBlogPosts = true;
        })
        .catch((error) => console.error('Error fetching data:', error));
    }
  }, [n]);
  console.log(current);

  const changeCurrent = (newCurrent) => {
    current = newCurrent;
    setRenderVar(newCurrent);
    console.log(latestBlogPosts.items[newCurrent]);
  };

  const returnToBlog = () => {
    current = -1;
    setRenderVar(-1);
  }

  useEffect(() => {
    //console.log('renderVar changed:', renderVar);
    setRenderVar(current);
  }, [current]);

  const renderOptions = {
    renderNode: {
      [INLINES.EMBEDDED_ENTRY]: (node, children) => {
        // target the contentType of the EMBEDDED_ENTRY to display as you need
        if (node.data.target.sys.contentType.sys.id === "blogPost") {
          return (
            <a href={`/blog/${node.data.target.fields.slug}`}>            {node.data.target.fields.title}
            </a>
          );
        }
      },
      [BLOCKS.EMBEDDED_ENTRY]: (node, children) => {
        // target the contentType of the EMBEDDED_ENTRY to display as you need
        if (node.data.target.sys.contentType.sys.id === "codeBlock") {
          return (
            <div className="flex items-center justify-center h-screen">
              <div class="text-center">
                <pre>
                  <code>{node.data.target.fields.code}</code>
                </pre>
              </div>
            </div>
          );
        }

        if (node.data.target.sys.contentType.sys.id === "videoEmbed") {
          return (
            <div className="flex justify-center items-center">
              <iframe
                src={node.data.target.fields.embedUrl}
                height="100%"
                width="100%"
                title={node.data.target.fields.title}
                allowFullScreen={true}
              />
            </div>
          );
        }
      },

      [BLOCKS.EMBEDDED_ASSET]: (node, children) => {
        // render the EMBEDDED_ASSET as you need
        return (
          <div className="flex justify-center items-center min-h-200">
            <div className="min-h-200">
              <img className="w-full h-auto"
                src={`https://${node.data.target.fields.file.url}`}
                height={node.data.target.fields.file.details.image.height}
                width={node.data.target.fields.file.details.image.width}
                alt={node.data.target.fields.description}
              />
            </div>
          </div>
        );
      },
    },
  };

  return (
    <>
      {
        retrivedLatestBlogPosts && latestBlogPosts != null ?
          (renderVar === -1 ? (
            <div className='pt-8 pr-4 pl-4'> {latestBlogPosts.items.map((post, iter) => (
              <div className='mx-auto bg-white rounded-sm shadow-md overflow-hidden w-[80vw] m-8 mb-6 mt-6
            hover:transform hover:scale-105 hover:shadow-lg transition ease-out h-min-[48]' key={'blog_post_outer_div' + iter}>
                <Link
                  className='h-full w-full'
                  href={'/blog/newestBlogPost' + String(iter)}
                  key={'blog_post_link_' + iter}
                  onClick={() => {
                    current = iter;
                    changeCurrent(current);
                  }}
                >
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
          ) : (<>
            <div className='m-8 pl-8 pr-8 block pt-6'>
              <span className="text-justify">
                <>
                {documentToReactComponents( latestBlogPosts.items[renderVar].fields.postBody, renderOptions)}
                </>
              </span>
            </div>
            <div className="flex justify-end pr-8 m-8">
              <button className="bg-white hover:bg-gray-300 text-gray-600 py-2 px-4 rounded border border-gray-300"
                onClick={returnToBlog}>
                Return to Blog
              </button>
            </div>
          </>)
          ) : (<div></div>)}
    </>
  );
}

/*
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';
import he from 'he'
import DOMPurify from 'dompurify'
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      DOMPurify.sanitize(
                        he.decode(
                          documentToHtmlString(
                            latestBlogPosts.items[renderVar].fields.postBody), renderOptions
                        )
                      )
                  }} />
*/