
import LatestBlogPosts from './LatestBlogPosts.js';

export default function Blog(props) {
  let current = props.current;
  return (
    <>
      {
        (current < 0) ? (<LatestBlogPosts current={current} n={-1} />) :
          (<div> <h1>{current}</h1>
          </div>
          )}

    </>);
}