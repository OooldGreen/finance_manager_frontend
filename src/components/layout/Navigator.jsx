import { useState } from 'react'
import { userAuth } from '../../services/utils/userAuth'
import { DashboardIcon, RecordsIcon, AssetsIcon, SearchIcon, SettingIcon, ProfileIcon, ExitIcon, UserCircleIcon, GiftIcon } from '../ui/Icon'
import NavItem from './NavItem'

const Navigator = () => {
    const { user } = userAuth()
    const [isShow, setIsShow] = useState(false)
    const [isNavOpen, setIsNavOpen] = useState(false)

  if (!user) return <div>Loading...</div>

  return (
    <div>
      <header className="top-0 inset-x-0 flex flex-wrap md:justify-start w-full bg-white border-b border-gray-200 text-sm py-2.5 dark:bg-neutral-800 dark:border-neutral-700 z-50">
        <nav className="max-w-[100rem] w-full px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between w-full mx-auto">
          <div className="flex-none w-38">
            <a className="text-xl inline-block font-semibold focus:outline-hidden" href="/dashboard">
              FINANCE MANAGER
            </a>    
          </div>

          <div className='flex items-center gap-x-2 order-2 md:order-3'>
            <div className="md:hidden">
              <button type="button" onClick={() => {setIsNavOpen(!isNavOpen)}} className="size-9.5 relative inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" x2="21" y1="6" y2="6"/><line x1="3" x2="21" y1="12" y2="12"/><line x1="3" x2="21" y1="18" y2="18"/></svg>
                <svg className="shrink-0 hidden size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
                <span className="sr-only">Toggle navigation</span>
              </button>
            </div>

            <div className="flex flex-row items-center justify-end gap-1 md:ml-6">
              {/* dropdown */}
              <div className="[--placement:bottom-right] relative inline-flex">
                <button type="button" onClick={() => setIsShow(!isShow)} className="size-9.5 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-800 focus:outline-hidden disabled:opacity-50 disabled:pointer-events-none dark:text-white" aria-haspopup="menu" aria-expanded="false" aria-label="Dropdown">
                    <UserCircleIcon />
                </button>

                <div className={`absolute right-0 top-full z-1000  min-w-60 bg-white shadow-md rounded-lg mt-2 dark:bg-neutral-800 dark:border dark:border-neutral-700 dark:divide-neutral-700 after:h-4 after:absolute after:-bottom-4 after:start-0 after:w-full before:h-4 before:absolute before:-top-4 before:start-0 before:w-full ${isShow ? 'block opacity-100' : 'hidden opacity-0'}`} role="menu" aria-orientation="vertical">
                  <div className="py-3 px-5 bg-gray-100 rounded-t-lg dark:bg-neutral-700">
                    <p className="text-sm text-gray-500 dark:text-neutral-500">Signed in as</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-neutral-200">{user?.username}</p>
                  </div>
                  <div className="p-1.5 space-y-0.5">
                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="/profile">
                      <ProfileIcon />
                      Profile
                    </a>
                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="/settings">
                      <SettingIcon />
                      Settings
                    </a>
                    <a className="flex items-center gap-x-3.5 py-2 px-3 rounded-lg text-sm text-gray-800 hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-300 dark:focus:bg-neutral-700 dark:focus:text-neutral-300" href="/signout">
                      <ExitIcon />
                      Sign Out
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* collapse */}
          <div className={`${isNavOpen ? 'block' : 'hidden'} overflow-hidden transition-all duration-300 basis-full grow md:block md:basis-auto order-3 md:order-2`}>
            <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-y-0.5 md:gap-y-0 md:gap-x-6">
              <NavItem to="/dashboard" icon={DashboardIcon}>Dashboard</NavItem>
              <NavItem to="/records" icon={RecordsIcon}>Records</NavItem>
              <NavItem to="/assets" icon={AssetsIcon}>Assets</NavItem>
              <NavItem to="/wishlist" icon={GiftIcon}>Wishlist</NavItem>
              <NavItem to="/search" icon={SearchIcon}>Search</NavItem>
            </div>
          </div>

        </nav>
      </header>

      {/* <main id="content">
        <div className="md:py-4 bg-white md:border-b border-gray-200 dark:bg-neutral-800 dark:border-neutral-700">
          <nav className="relative max-w-[85rem] w-full mx-auto md:flex md:items-center md:gap-3 px-4 sm:px-6 lg:px-8">
            <div className="overflow-hidden transition-all duration-300 basis-full grow md:block" aria-labelledby="hs-secondaru-navbar-collapse">
              <div className="overflow-hidden overflow-y-auto max-h-[75vh] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                <div className="py-2 md:py-0 flex flex-col md:flex-row md:items-center gap-y-0.5 md:gap-y-0 md:gap-x-6">
                  <NavItem to="/dashboard" icon={DashboardIcon}>Dashboard</NavItem>
                  <NavItem to="/records" icon={RecordsIcon}>Records</NavItem>
                  <NavItem to="/assets" icon={AssetsIcon}>Assets</NavItem>
                  <NavItem to="/wishlist" icon={GiftIcon}>Wishlist</NavItem>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </main>  */}
    </div>
  )
}

export default Navigator