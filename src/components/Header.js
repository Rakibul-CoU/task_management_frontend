// components/Header.js
import Link from 'next/link';

export default function Header() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow dark:bg-gray-900 fixed w-full z-20 top-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex items-center justify-between mx-auto px-4 py-2">
          <Link href="/" className="text-2xl font-semibold text-gray-800 dark:text-white">
            Task Manager
          </Link>
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/" className="text-gray-800 dark:text-white hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <a href="#" className="text-gray-800 dark:text-white hover:text-blue-600">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 dark:text-white hover:text-blue-600">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-800 dark:text-white hover:text-blue-600">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}
