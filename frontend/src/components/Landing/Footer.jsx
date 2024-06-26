import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div>
      <footer className="bg-white rounded-lg shadow">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                <img src="images/ofppt-logo.png" className="h-8" alt="Flowbite Logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">ofppt</span>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link to={'/login'} className="hover:underline me-4 md:me-6">Se connecter</Link>
                </li>
                <li>
                    <Link to={'/register'} className="hover:underline me-4 md:me-6">S&apos;incrire</Link>
                </li>
                <li>
                    <a href="mailto:isgi@gmail.ma" className="hover:underline">Contact</a> 
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="https://isgi.ma/" className="hover:underline">OFPPT™</a>.  Développé par L&apos;ISGI.</span>
    </div>
</footer>




    </div>
  )
}
