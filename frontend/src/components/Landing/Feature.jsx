import { BookOpenIcon, BriefcaseIcon, ArrowUpIcon } from '@heroicons/react/24/outline'

const features = [
  {
    name: 'Programmes variés',
    description:
      'L\'OFPPT offre une variété de programmes de formation continue pour répondre aux besoins de chaque entreprise.',
    icon: BookOpenIcon,
  },
  {
    name: 'Formation professionnelle',
    description:
      'Nos formations professionnelles aident les entreprises à développer leurs compétences et à rester compétitives dans leur secteur.',
    icon: BriefcaseIcon,
  },
  {
    name: 'Promotion du travail',
    description:
      'Nous proposons des programmes qui favorisent la promotion du travail et l\'évolution de carrière.',
    icon: ArrowUpIcon,
  },
]

export default function Example() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto mt-16 max-w-4xl sm:mt-20 lg:mt-24 lg:max-w-6xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-3 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}