
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { Link } from 'react-router-dom';

export default function BlogPost(props) {
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

    const el = props.data;
    console.log("router:", el);
    console.log("router2:", props);

    return (
        <div>
            {el && (
                <div className='m-8 pl-8 pr-8 block pt-6'>
                    <span className="text-justify">
                        <>
                            {documentToReactComponents(el.fields.postBody, renderOptions)}
                        </>
                    </span>
                </div>
            )}
            <div className="flex justify-end pr-8 m-8">
                <Link to="/blog">
                    <button className="bg-white hover:bg-gray-300 text-gray-600 py-2 px-4 rounded border border-gray-300">
                        Return to Blog
                    </button>
                </Link>
            </div>
        </div>
    );
}