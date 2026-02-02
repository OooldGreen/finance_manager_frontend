import { Outlet } from "react-router-dom"
import Navigator from "./Navigator"

const Layout = () => {
  return (
    <div>
      <Navigator/>
      <main>
        <Outlet/>
      </main>
    </div>
  )
}

export default Layout