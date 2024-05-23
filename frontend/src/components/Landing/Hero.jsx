import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import Typewriter from 'typewriter-effect';

export default function Hero() {

  useEffect(() => {
    AOS.init({
      duration: 1200,
      once: true,
    });
  }, []);

  return (
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#529BE1] to-[#008B45] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
      <div className="mx-auto max-w-2xl py-32 sm:py-28 lg:py-30" data-aos="fade-up">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center" data-aos="fade-in">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-gray-600 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
            Trouvez la formation continue parfaite pour vos entreprises.{' '}
            <a href="#" className="font-semibold text-indigo-600">
              <span className="absolute inset-0" aria-hidden="true" />
              En savoir plus <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
        <div className="text-center" data-aos="zoom-in">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Formation continue pour enrichir vos 
            <Typewriter
              options={{
                strings: [
                  'employés',
                  'équipes',
                  'collaborateurs',
                  'partenaires',
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600" data-aos="fade-left">
            Cherchez-vous à améliorer vos compétences dans un domaine spécifique ou à explorer un nouveau domaine ? L&apos;office de formation professionnel et de la promotion de travail propose une variété de programmes de formation continue.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6" data-aos="fade-right">
            <Link
              to={'/login'}
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Commencer
            </Link>
            <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
              En savoir plus <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#529BE1] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
        />
      </div>
    </div>
  );
}
