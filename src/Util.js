import { BLOCKS, INLINES } from "@contentful/rich-text-types";

export function formatDateToMonthYear(date) {
  const options = { year: 'numeric', month: 'long' };
  return new Date(date).toLocaleDateString("en-GB", options);
}

export function compareByDate(key1, key2) {
  return function (a, b) {
    const date1 = new Date(a[key1][key2]);
    const date2 = new Date(b[key1][key2]);

    if (date1 > date2) {
      return -1;
    } else if (date1 < date2) {
      return 1;
    } else {
      return 0;
    }
  }
}

export function isUnixEpoch(dateSerialized) {
  const date = new Date(dateSerialized);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const unixEpoch = new Date('1970-01-01');
  const epochYear = unixEpoch.getFullYear();
  const epochMonth = unixEpoch.getMonth();
  const epochDay = unixEpoch.getDate();

  return year === epochYear && month === epochMonth && day === epochDay;
}

export const renderOptions = {
  renderText: text => {
    return text.split('\n').reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, []);
  },
  renderNode: {
    [INLINES.HYPERLINK]: ({ data }, children) => (
      <a className="mb-4 text-gray-800 underline dark:text-gray-100"
        href={data.uri}
        target={`${data.uri}`}
        rel={`${data.uri}`}
      >{children}</a>
    ),
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
            <div className="text-center">
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
        <div className="flex justify-center items-center xs:p-2 sm:p-4 md:p-8 min-h-200">
          <div className="min-h-200">
            <img className="w-full h-auto dark:hue-rotate-[180deg] dark:invert-[1.0] dark:saturate-[1.8]"
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
