import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Routes/Layout.jsx'
import { LoginCard, Test } from './components/index.js'

const router= createBrowserRouter([
  {
    path:'/todo_app',
    element: <Layout/>,
    children:[
      {
        path: "",
        element: <App/>
      },
      // {
      //   path: "login",
      //   element: <LoginCard name="LogIn"/>
      // },
      // {
      //   path: "signup",
      //   element: <LoginCard name="SignUp"/>
      // },
      {
        path: "test",
        element: <Test/>
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App/> */}
  </React.StrictMode>,
)
