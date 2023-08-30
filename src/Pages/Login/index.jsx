import React from "react";
import Layout from "../../Components/Layout";
import axios from "../../../api/axios";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import WarningMessage from "../../Components/WarningMessages";
import useLogin from "../../Hooks/useLogin";

const Login = () => {
  const { setLogin } = useLogin();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");

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
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setError(
          <WarningMessage>No pudo conectarse al servidor</WarningMessage>
        );
      } else if (error.response?.status === 400) {
        setError(
          <WarningMessage>Debe ingresar su email y contraseña</WarningMessage>
        );
      } else if (error.response?.status === 401) {
        setError(<WarningMessage>Datos inválidos</WarningMessage>);
      } else {
        setError(<WarningMessage>Error desconocido!</WarningMessage>);
      }
      errRef.current.focus();
    }
  };

  return (
    <Layout>
      <>
        <section ref={errRef}>{error}</section>
        <div className="grid justify-items-center mt-3 lg:mt-16 mb-32 lg:bg-gray-300 lg:border-double lg:border-4 lg:border-gray-500 px-6 py-6 lg:px-12 lg:py-12">
          <h1 className="font-bold text-2xl mb-6">Ingrese sus datos</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="hidden lg:inline lg:mr-10">
                Correo:{" "}
              </label>
              <input
                className="lg:w-48 w-72 h-12 lg:h-6 rounded-xl lg:rounded-md bg-gray-200 lg:bg-white placeholder-gray-500 lg:placeholder-white"
                type="text"
                id="email"
                placeholder="Correo"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="hidden lg:inline lg:mr-3">
                Contraseña:
              </label>
              <input
                className="w-72 lg:w-48 h-12 lg:h-6 rounded-xl lg:rounded-md bg-gray-200 lg:bg-white placeholder-gray-500 lg:placeholder-white"
                type="password"
                id="password"
                placeholder="Contraseña"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>
            <section className="mb-6">
              <p>
                ¿Todavía no estás registrado?{" "}
                <NavLink
                  to={"/sign-up"}
                  className="text-blue-800 hover:underline"
                >
                  Regístrese
                </NavLink>
              </p>
            </section>
            <div className="text-center"> 
              <button className="bg-green-500 hover:bg-green-700 shadow-lg shadow-green-500/50 text-white font-bold py-2 px-4 rounded">
                Ingresar
              </button>
            </div>
          </form>
        </div>
      </>
    </Layout>
  );
};

export default Login;
