import React from "react";
import Layout from "../Layout";
import axios from "../../../api/axios";

const Login = () => {
  const [login, setLogin] = React.useState(null);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const userRef = React.useRef();
  const errRef = React.useRef();

  const LOGIN_URL = "/api/v1/login";

  React.useEffect(() => {
    userRef.current.focus();
  }, []);

  React.useEffect(() => {
    setError(null);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      setLogin({ email, password, role, accessToken });
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setError(
          <div
            ref={errRef}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative font-bold mb-6"
            role="alert"
          >
            No pudo conectarse al servidor
          </div>
        );
      } else if (error.response?.status === 400) {
        setError(
          <div
            ref={errRef}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative font-bold mb-6"
            role="alert"
          >
            Falta correo y contraseña
          </div>
        );
      } else if (error.response?.status === 401) {
        setError(
          <div
            ref={errRef}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative font-bold mb-6"
            role="alert"
          >
            Datos inválidos
          </div>
        );
      } else {
        setError(
          <div
            ref={errRef}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
            role="alert"
          >
            Falla al ingresar
          </div>
        );
      }
      errRef.current.focus();
    }
  };

  return (
    <Layout>
      {success ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative font-bold mb-6" role="alert">
        Ingresó correctamente
      </div>
      ) : (
      <div className=" grid justify-items-center mt-6 lg:mt-16 mb-32 bg-gray-300 border-double border-4 border-gray-500 px-12 py-12">
        <h1 className="font-bold text-2xl mb-6">Ingrese sus datos</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
          <label htmlFor="email" className="mr-10">Correo: </label>
          <input
            type="text"
            id="email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          </div>
          <div className="mb-6">
          <label htmlFor="password" className="mr-3">Contraseña:</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          </div>
          <section>
            {error}
          </section>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Ingresar</button>
        </form>
      </div>
        
      )}
    </Layout>
  );
};

export default Login;
