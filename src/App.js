import './App.css';
import Bar from './Bar.js';
import { ContentfulService } from './Contentful.js';

function App() {
  //const a = new ContentfulService();

  return (
    <>
    <div className="container mx-auto bg-gray-200 rounded-xl shadow border p-8 m-10">
      <p className="text-3xl text-gray-700 font-bold mb-5">
        Welcome!
      </p>
    </div>
    <div className="container mx-auto bg-white-200 rounded-xl shadow border p-8 m-10">
      <p className="text-500 text-lg">
        <Bar></Bar>
      </p>
    </div>
    </>
  );
}

export default App;
