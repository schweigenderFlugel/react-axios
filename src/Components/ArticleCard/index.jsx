/* eslint-disable react/jsx-key */
import Layout from "../../Components/Layout";
import axios from "../../../api/axios";
import React from "react";

const PRODUCTS_URL = "/api/v1/product";

const ArticleCards = () => {
  const [loading, setLoading] = React.useState(true);
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(PRODUCTS_URL);
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error.response.data);
      }
    };
    fetchProduct();
  });

  return (
    <Layout>
      {loading ? (
        <div>Cargando</div>
      ) : (
        <ul>
          {products.map((item) => (
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
          ))}
        </ul>
      )}
    </Layout>
  );
};

export default ArticleCards;
