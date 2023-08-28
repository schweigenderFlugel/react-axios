import { useParams } from "react-router-dom";
import React from "react";
import Layout from "../../Components/Layout";
import axios from "../../../api/axios";

const ArticlesDetails = () => {
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(false);
    const [products, setProducts] = React.useState([]);
    const [ data, setData ] = React.useState("");

    const params = useParams();
    const PRODUCTS_URL = `/api/v1/product/${params.id}`;

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
    return (
        <Layout>
            <div>Detalles de productos</div>
            <div>{products.name}</div>
        </Layout>
        
    )
}

export default ArticlesDetails;