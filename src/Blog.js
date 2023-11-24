
import LatestBlogPosts from './LatestBlogPosts.js';

export default function Blog(props) {
  let data = props.data;
  let onlyUpdateHistory = props.onlyUpdateHistory
  return (
    <>
      <LatestBlogPosts onlyUpdateHistory={onlyUpdateHistory} data={data} />
    </>);
}