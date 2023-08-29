import React from "react";
import Layout from "../../Components/Layout";
import axios from "../../../api/axios";

const SIGN_UP = "/api/v1/user";

const SignUp = () => {
  const [username, setUsername] = React.useState();
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  const errRef = React.useRef();

  React.useEffect(() => {
    setError(null)
  }, [ email, username, password ])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        SIGN_UP,
        { username, email, password },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          withCredentials: false,
        }
      );
      setUsername("");
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setError("No pudo conectarse al servidor");
      } else if (error?.response.status === 400) {
        setError("No ha ingresado ningún dato");
      } else if (error?.response.status === 409) {
        setError("Ya existe un usuario con este nombre y/o email");
      }
      errRef.current.focus();
    }
  };

  return (
    <Layout>
      {success ? (
        <div>Registro exitoso</div>
      ): (
      <div className="grid justify-items-center mt-6 lg:mt-16 mb-32 bg-gray-300 border-double border-4 border-gray-500 px-12 py-12">
        <form onSubmit={handleSubmit}>
          <label>Correo: </label>
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
          <label>Nombre de usuario: </label>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          ></input>
          <label>Contraseña: </label>
          <input
            type="text"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            Registrarse
          </button>
        </form>
        <section ref={errRef}>{error}</section>
      </div>
      )}
      
    </Layout>
  );
};

export default SignUp;
