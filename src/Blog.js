
import LatestBlogPosts from './LatestBlogPosts.js';

export default function Blog(props) {
  let data = props.data;
  return (
    <>
      <LatestBlogPosts data={data} />
    </>);
}