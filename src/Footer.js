import { Link } from 'react-router-dom';

export default function Footer(props) {
  return (
    <>
      <footer className="bg-white dark:bg-gray-900 border-2 border-t-gray-200 border-b-white dark:border-gray-900">
        <div className="mx-left w-full max-w-screen-md">
          <div className="px-6 py-2 bg-white dark:bg-gray-900 md:flex md:items-left md:justify-between">
            <span className="text-left text-sm text-gray-600 dark:text-gray-300 sm:text-left">© 2023 Yakup Koray Budanaz. All Rights Reserved.
              <Link
                href="/disclaimer" to="/disclaimer"
                className="underline ml-2">
                Disclaimer & Imprint
              </Link>
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
