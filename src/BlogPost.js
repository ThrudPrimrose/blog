import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { Link } from 'react-router-dom';
import { renderOptions } from './Util';

export default function BlogPost(props) {
  const el = props.data;

  return (
    <>
      <div className="flex items-center justify-center">
      {el && (
          <div className='xs:m-4 sm:m-8 xs:pl-2 xs:pr-2 sm:pl-4 pr-4 block xs:max-w-[98%] sm:max-w-[95%] md:max-w-[90%] lg:max-w-[85%] xl:max-w-[80%]'>
            <h2 className='mt-8 mb-8'>{el.fields.postTitle}</h2>
            <span className="text-justify">
              <>
                {documentToReactComponents(el.fields.postBody, renderOptions)}
              </>
            </span>
          </div>
        )}
      </div>
      <div className="flex justify-end xs:pe-2 sm:pr-4 md:pr-8 m-8">
        <Link to="/blog">
          <button className="bg-white hover:bg-gray-300 text-gray-600 py-2 px-4 rounded border border-gray-300">
            Return to Blog
          </button>
        </Link>
      </div>
    </>
  );
}
