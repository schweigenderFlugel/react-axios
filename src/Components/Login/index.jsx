import React from "react";
import { AuthContext } from "../../Context";
import Layout from "../Layout";
import axios from "../../../api/axios";

const LOGIN_URL = "/api/v1/login";

const Login = () => {
  const { setLogin } = React.useContext(AuthContext);
  const userRef = React.useRef();
  const errRef = React.useRef();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    userRef.current.focus();
  }, []);

  React.useEffect(() => {
    setError("");
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
      console.log(JSON.stringify(response?.data.role));
      console.log(JSON.stringify(response?.data.accessToken));
      const accessToken = response?.data?.accessToken;
      const role = response?.data?.role;
      setLogin({ email, password, role, accessToken });
      setEmail("");
      setPassword("");
      setSuccess(true);
    } catch (error) {
      if (!error?.response) {
        setError("No Server Response");
      } else if (error.response?.status === 400) {
        setError("Missing username or password");
      } else if (error.response?.status === 401) {
        setError("Unauthorized");
      } else {
        setError("Login failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <Layout>
      {success ? (
        <section>
          <p ref={errRef} className={errRef ? "error" : "offscreen"}>
            {error}
          </p>
        </section>
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
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Ingresar</button>
        </form>
      </div>
        
      )}
    </Layout>
  );
};

export default Login;
