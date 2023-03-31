import './App.css';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import NavBar from './components/navbar/NavBar';
import LeftBar from './components/leftbar/LeftBar';
import RightBar from './components/rightbar/RightBar';
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'

import './style.scss'
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authContext';

import {
  QueryClient,
  QueryClientProvider,
  } from '@tanstack/react-query'
import Search from './components/search/Search';

function App() {

  const {currentUser} = useContext(AuthContext);

  const {darkMode} = useContext(DarkModeContext);

  const queryClient = new QueryClient()

  const Layout = () => {
    return(
      <QueryClientProvider client={queryClient}>
      <div className={`theme-${darkMode ? "dark" : 'light'}`}>
        <NavBar />
        <div style={{display:'flex'}}>
          <LeftBar />
          <div style={{flex:6}}>
            <Outlet />
          </div>
          <RightBar />
        </div>
      </div>
      </QueryClientProvider>
    )
  }

  const ProtectedRouter = ({children}) => {
    if(!currentUser){
      return <Navigate to='/Login' />
    }
    return children;
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRouter><Layout /></ProtectedRouter>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/Profile/:id",
          element: <Profile />
        },
        {
          path:"/search/",
          element:<Search />
        }
      ]
    },
    {
      path: "/Login",
      element: <Login />,
    },
    {
      path: "/Register",
      element: <Register />,
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
