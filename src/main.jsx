import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Welcome, Login, Layout, Test , Departments , DeptAddEdit,Projects, ProAddEdit , Position , PosAddEdit , Employee , EmpAddEdit} from './pages';
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
      <Route path='Project' element={<Projects/>}></Route>
      <Route path='Project/AddEdit/:id' element={<ProAddEdit/>}></Route>
      <Route path='Position' element={<Position/>}></Route>
      <Route path='Position/AddEdit/:id' element={<PosAddEdit/>}></Route>
      <Route path='Employee' element={<Employee/>}></Route>
      <Route path='Employee/AddEdit/:id' element={<EmpAddEdit/>}></Route>
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
