import Feed from './Feed.js';

export default function Greet() {
  return (
    <>
    <div className="container mx-auto rounded-md shadow p-8 m-10">
      <p className="text-3xl text-gray-700 font-bold mb-5">
        Welcome!
      </p>
      <p className="text-lg text-gray-500 mb-5">
        This essentially a mix of a personal-blog, a virtual business card, a place to self-publish my short stories and essays, an online CV, a place to post some photos that are not too fit for other social media outlets,
        a web portal to talk about my research, and a project to train some web development and design!
      </p>
    </div>
    <Feed/>
    </>
  );
}