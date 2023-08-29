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
        <div className="grid justify-items-center mt-6 lg:mt-16 mb-32 bg-gray-300 border-double border-4 border-gray-500 px-12 py-12">
          <h1 className="font-bold text-2xl mb-6">Ingrese sus datos</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="mr-10">
                Correo:{" "}
              </label>
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
              <label htmlFor="password" className="mr-3">
                Contraseña:
              </label>
              <input
                type="password"
                id="password"
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
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Ingresar
            </button>
          </form>
        </div>
      </>
    </Layout>
  );
};

export default Login;
