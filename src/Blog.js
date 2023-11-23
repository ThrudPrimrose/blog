
import LatestBlogPosts from './LatestBlogPosts.js';

export default function Blog(props) {
  let current = props.current;
  return (
    <>
      <LatestBlogPosts current={current} n={-1} />
    </>);
}