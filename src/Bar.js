const people = [
    {
      name: 'Thrud Primrose',
      email: 'yakup.paradox@gmail.com',
      role: 'Guy',
      imageUrl:
        '',
    },
  ]
  
  export default function Bar() {
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {people.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.imageUrl} alt="" />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">{person.name}</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.email}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    )
  }
  