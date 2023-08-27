/* eslint-disable react/jsx-key */
import Layout from "../../Components/Layout";
import React from "react";
import axios from "../../../api/axios";
import { NavLink } from "react-router-dom";

const ArticleCards = () => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [products, setProducts] = React.useState([]);
  const [ data, setData ] = React.useState("");

  const PRODUCTS_URL = "/api/v1/product";

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(PRODUCTS_URL);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (!error?.response) {
          setError("No pudo conectarse al servidor");
        }
      }
    };
    fetchProduct();
  });

  const handleClick = (data) => {
    console.log(data);
    setData(data);
  }

  return (
    <Layout>
      {loading ? (
        <div>{error ? [error] : "Cargando..."}</div>
      ) : (
        <ul>
          {products.map((item) => (
            <li key={item._id} style={{cursor:"pointer"}} onClick={() => handleClick(item._id)} >
              <NavLink to={`${item._id}`}>
              <div className="flex justify-between items-center mb-4 border border-black rounded-lg p-4 w-96 lg:w-80">
                <div className="flex justify-between w-full">
                  <p className="flex flex-col">
                    <span>01.02.03</span>
                    <span className="font-light">{item.name}</span>
                    <span className="font-light">{item.price}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="font-medium text-2xl"></span>
                  </p>
                </div>
              </div>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
};

export default ArticleCards;
