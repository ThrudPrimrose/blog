import { ContentfulService } from "./Contentful.js"
import { useState, useEffect } from 'react';
import { flushSync } from 'react-dom';

var retrieved = false;

  export default function Bar() {
    const [people, setPeople] = useState(
        [],
    );

    useEffect(() => {
        if (!retrieved){
            ContentfulService.getInstance().getAutobiography().then(data => {
                console.log(data);
                if (! retrieved){
                    console.assert(data.length == 1);
                    var el = data[0];
                    {
                        console.log(el);
                        var me = {
                            name: el.fields.name,
                            autobiography: el.fields.autobiography,
                            imageUrl: el.fields.photo.fields.file.url
                        };
                        setPeople([...people, me]);
                    }
                }
                retrieved = true;
            });
        }
    });
    


    return (
      <ul role="list" className="divide-y divide-gray-100">
        {people.map((person, index) => (
          <li key={index} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.autobiography}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }