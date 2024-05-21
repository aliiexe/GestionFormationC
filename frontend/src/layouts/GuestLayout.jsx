import  {Outlet} from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Button, Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { axiosclient } from '../api/axiosClient'
import {Link} from 'react-router-dom'
import './GUEST.css'
const navigation = [
  { name: 'Espace entreprise', href: '#' },
  { name: 'Espace office', href: '#' }
]

export default function GuestLayout(){
  const [user,setuser]=useState()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
useEffect(()=>{
  axiosclient.get('/api/user').then((a)=>{
setuser(a.data)
  })
},[])
const logout=()=>{
  axiosclient.post('/logout').then((a)=>{
    window.localStorage.removeItem('token')
    setuser()
  })
}
    return(
        <>
        <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Votre entreprise</span>
              <img
                className="h-8 w-auto"
                src="images/ofppt.png"
                alt=""
              />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Ouvrir le menu principal</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className={"text-sm font-semibold leading-6 text-gray-900"}>
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
   
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
      <a  className="text-sm font-semibold leading-6 text-gray-900">
        <span>
        {user ? (
            <button onClick={logout} style={{"backgroundColor":"blue","border":"2px solid blue","borderRadius":"4px"
              ,"padding":"2px 9px 2px 9px","margin":"1x 18px 1px"
            }}><span style={{"color":"white"}}>Se deconnecter</span></button>
          ) : (
           ""
          )}
          
          {!user ? (
            <Link to="/Login">Se connecter</Link> 
          ) : (
           <span style={{"marginLeft":"15px"}}>{user.name}</span>
          )}
              <span aria-hidden="true">&rarr;</span>
        
        </span>
    
      </a>
    </div>
      
    
    </div>
        </nav>
        <Dialog className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
          <div className="fixed inset-0 z-50" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Votre entreprise</span>
                <img
                  className="h-8 w-auto"
                  src="images/ofppt.png"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Fermer le menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Se connecter
                  </a>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
        <Outlet></Outlet>
        </>
    )
}