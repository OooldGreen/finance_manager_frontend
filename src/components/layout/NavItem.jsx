import { NavLink } from "react-router-dom"

const NavItem = ({to, children, icon: Icon}) => {
  const style = "py-2 md:py-0 flex items-center font-medium text-sm focus:outline-hidden"
  const activeStyle = "text-blue-600 dark:text-blue-500 dark:focus:text-blue-500"
  const inactiveStyle = "text-gray-800 hover:text-gray-500 focus:text-gray-500 dark:text-neutral-200 dark:hover:text-neutral-500 dark:focus:text-neutral-500"
  return (
    <NavLink to={to} end className={({ isActive }) => `${style} ${isActive ? activeStyle : inactiveStyle}`}>
        <Icon />
        {children}
    </NavLink>
  )
}

export default NavItem