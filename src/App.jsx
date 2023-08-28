import { useRoutes, BrowserRouter } from "react-router-dom";

import Navbar from './Components/Navbar';
import ArticleCard from './Components/ArticleCard';
import './App.css';
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import MyOrders from "./Pages/MyOrders";
import ArticlesDetails from "./Pages/ArticleDetails";
import SignUp from "./Pages/SignUp";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/articles', element: <ArticleCard/> },
    { path: 'articles/:id', element: <ArticlesDetails /> },
    { path: '/login', element: <Login/> },
    { path: '/sign-up', element: <SignUp/> },
    { path: '/my-orders', element: <MyOrders/> }
  ])
  return routes
}

const App = () => {
  return (
    <BrowserRouter>
        <Navbar/>
        <AppRoutes/>
        <Footer/>
    </BrowserRouter>
  )
}

export default App;