import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './ErrorPage.tsx'
import CreateKnob from './CreateKnob.tsx'
import Register from './Register.tsx'
import Profile from './Profile.tsx'
import Knob, { knobLoader } from './Knob.tsx'
import Login from './Login.tsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    errorElement: <ErrorPage/>
  },
  {
    path: "/profile",
    element: <Profile/>
  },
  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/new",
    element: <CreateKnob/>
  },
  {
    path: "/knob/:knobId",
    element: <Knob/>,
    loader: knobLoader,
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router}/>
  // strict mode does some things like use effect twice to ensure it properly works
  // I don't care
  // <StrictMode>
    // <App />
  // </StrictMode>,
)
