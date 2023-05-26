import { ContentfulService } from "./Contentful.js"
import { useState, useEffect } from 'react';

var retrieved = false;
var collect = []

export default function Autobiography() {
  const [people, setPeople] = useState(
      [],
  );

  useEffect(() => {
      if (!retrieved){
          ContentfulService.getInstance().getAutobiography().then(data => {
              //console.log(data);
              console.assert(data.length == 1);
              var el = data[0];
              {
                var me = {
                    name: el.fields.name,
                    autobiography: el.fields.autobiography,
                    imageUrl: el.fields.photo.fields.file.url
                };
                collect = [...people, me];
                setPeople(collect);
              }
              retrieved = true;
          });
      }
  });

  return (
    <div className="container mx-auto bg-white-200 rounded-xl shadow border p-8 m-10">
      <span className="text-500 text-lg">
        <ul role="list" className="divide-y divide-gray-100">
          {collect.map((person, index) => (
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
      </span>
    </div>
  )
}