import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { ContentfulService } from './Contentful.jsx';

export default function Feed() {
  // Define responsive configuration inside the component
  const [favPosts, setFavPosts] = useState([]);

  useEffect(() => {
    ContentfulService.getInstance().getFavoritePosts().then(data => {
      // Assuming data is an array of entries with a `url` field inside `fields`
      const posts = data.flatMap(entry =>
        (entry.fields.links || []).map(link => ({
          url: link.url,
          height: link.height || 480,
        }))
      );
      setFavPosts(posts);
    }).catch(err => {
      console.error('Failed to fetch favorite posts:', err);
    });
  }, []);

  const POST_WIDTH = 320;
  const POST_MARGIN = 160;

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: (POST_WIDTH + POST_MARGIN) * 18, min: (POST_WIDTH + POST_MARGIN) * 5 },
      items: 5
    },
    desktop: {
      breakpoint: { max: (POST_WIDTH + POST_MARGIN) * 5, min: (POST_WIDTH + POST_MARGIN) * 4 },
      items: 4
    },
    tablet: {
      breakpoint: { max: (POST_WIDTH + POST_MARGIN) * 3, min: (POST_WIDTH + POST_MARGIN) * 2 },
      items: 2
    },
    mobile: {
      breakpoint: { max: (POST_WIDTH + POST_MARGIN) * 2, min: 0 },
      items: 1
    }
  };

  const extractPostId = (url) => {
    const match = url.match(/instagram\.com\/p\/([^/]+)/);
    return match ? match[1] : '';
  };

  return (
    <Carousel
      responsive={responsive}
      className="flex flex-shrink-0 dark:bg-gray-800"
    >
      {favPosts && favPosts.length > 0 ? (
        favPosts.map((post, index) => {
          if (!post?.url) return null;
          const postId = extractPostId(post.url);
          if (!postId) return null;
          return postId ? (
            <div key={index} className="sm:m-1 md:m-2 lg:m-3 xl:m-4">
              <iframe
                src={`https://www.instagram.com/p/${postId}/embed`}
                width={POST_WIDTH}
                height={POST_WIDTH * 1.2}
                allowTransparency={true}
                allow="encrypted-media"
                className="rounded-xl shadow-md"
              />
            </div>
          ) : null;
        })
      ) : (
        <div>No posts to display</div>
      )}
    </Carousel>
  );
};