import React from 'react';
import axios from "../../../api/axios";


const ArticleSearch = () => {
    const [ loading, setLoading ] = React.useState(false);
    const [ search, setSearch ] = React.useState("");
    const [ product, setProducts ] = React.useState([])
    const [ error, setError ] = React.useState();

    const PRODUCTS_URL = "/api/v1/product";

    const handleSearch = async (e) => {
      e.preventDefault();
      try {
        const response = await axios.get(PRODUCTS_URL);
        response.data.filter((item) => item.name === search)
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        if (!error?.response) {
          setError("No se pudo conectar al servidor")
        }
      }
    }

    return (
      <form onSubmit={handleSearch}>
      <label>Enter the article name:
        <input className='w-80 h-6 px-2'
          type="text" 
          placeholder='Enter the title of the article'
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        </label>
        <button>Buscar </button>
    </form>
    )
}

export default ArticleSearch;