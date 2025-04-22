
import LatestBlogPostsView from './LatestBlogPostsView.jsx';

export default function Blog(props) {
  let data = props.data;
  return (
    <>
      <LatestBlogPostsView data={data} n={-1}/>
    </>);
}