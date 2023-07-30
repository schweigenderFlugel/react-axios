import { useRoutes, BrowserRouter } from "react-router-dom";

import Navbar from './Components/Navbar';
import ArticleCard from './Components/ArticleCard';
import './App.css';
import { AuthProvider } from "./Context";
import Footer from "./Components/Footer";
import Login from "./Components/Login";

const AppRoutes = () => {
  let routes = useRoutes([
    { path: '/articles', element: <ArticleCard/> },
    { path: '/login', element: <Login/> }
  ])
  return routes
}

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar/>
        <AppRoutes/>
        <Footer/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App;