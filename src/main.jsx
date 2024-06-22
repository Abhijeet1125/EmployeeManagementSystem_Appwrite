import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Welcome, Login, Layout, Test , Departments , DeptAddEdit} from './pages';
import { Provider } from 'react-redux';
import store from './store/store';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='/' element={<Welcome />}></Route>
      <Route path='Login' element={<Login />}></Route>
      <Route path='Dashboard' element={<Test />}></Route>
      <Route path='Department' element={<Departments/>} ></Route>
      <Route path='Department/AddEdit/:id' element={<DeptAddEdit/>}></Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>,
)
