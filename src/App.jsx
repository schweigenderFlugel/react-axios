import { useRoutes, BrowserRouter } from "react-router-dom";

import Navbar from './Components/Navbar';
import ArticleCard from './Components/ArticleCard';
import './App.css';
import Footer from "./Components/Footer";
import Login from "./Components/Login";
import MyOrders from "./Pages/MyOrders";
import ArticlesDetails from "./Components/ArticleDetails";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/articles', element: <ArticleCard/> },
    { path: 'articles/:id', element: <ArticlesDetails /> },
    { path: '/login', element: <Login/> },
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