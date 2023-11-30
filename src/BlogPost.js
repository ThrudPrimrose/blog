import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Link } from 'react-router-dom';
import { renderOptions } from './Util';

export default function BlogPost(props) {
  const el = props.data;

  return (
    <>
      <div className="flex items-center justify-center">
      {el && (
          <div className='m-8 pl-8 pr-8 block sm:max-w-[90%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[70%]'>
            <h2 className='mt-12 mb-12'>{el.fields.postTitle}</h2>
            <span className="text-justify">
              <>
                {documentToReactComponents(el.fields.postBody, renderOptions)}
              </>
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-end pr-8 m-8">
        <Link to="/blog">
          <button className="bg-white hover:bg-gray-300 text-gray-600 py-2 px-4 rounded border border-gray-300">
            Return to Blog
          </button>
        </Link>
      </div>
    </>
  );
}