import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route , RouterProvider, createBrowserRouter , createRoutesFromElements} from 'react-router-dom'
import {Welcome , Login , Layout , Test}  from './pages';




const router = createBrowserRouter (
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<Welcome/>}></Route>
      <Route path='Login' element={<Login/>}></Route>
      <Route path = 'Dashboard' element={<Welcome/>}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
