import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import ArticleCard from "./Components/ArticleCard";
import "./App.css";
import Footer from "./Components/Footer";
import Login from "./Pages/Login";
import MyOrders from "./Pages/MyOrders";
import ArticlesDetails from "./Pages/ArticleDetails";
import SignUp from "./Pages/SignUp";
import RequireLogin from "./Components/LoginRequired";
import Modal from "./Components/ArticleSearchModal";

const App = () => {
  return (
    <>
     <Navbar />
      <Routes>
        <Route path="/articles" element={<ArticleCard />}></Route>
        <Route path="/articles/:id" element={<ArticlesDetails />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/sign-up" element={<SignUp />}></Route>

        <Route element={<RequireLogin  allowedRoles={['admin']}/>}>
          <Route path="/my-orders" element={<MyOrders />}></Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
