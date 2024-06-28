import { Outlet } from 'react-router-dom'
import { Header } from '../components'

function Layout() {
  return (
    <>
    <Header/>
    <div className='mt-16'>
    <Outlet />
    </div>
    </>
  )
}

export default Layout