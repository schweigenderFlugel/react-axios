import React from "react";
import { AuthContext } from "../../Context";
import Layout from "../Layout";
import axios from "../../../api/axios";

const LOGIN_URL = '/v1/api/login'

const Login = () => {
    const { setLogin } = React.useContext(AuthContext)
    const userRef = React.useRef();
    const errRef = React.useRef();
    const [ email, setEmail ] = React.useState('');
    const [ password, setPassword ] = React.useState('');
    const [ error, setError] = React.useState('');
    const [ success, setSuccess ] = React.useState(false);

    React.useEffect(() => {
        userRef.current.focus();
    }, [])

    React.useEffect(() => {
        setError('');
    }, [email, password])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post(LOGIN_URL, JSON.stringify({email, password}), {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            withCredentials: false
        });
        console.log(JSON.stringify(response?.data.role))
        const accessToken = response?.data?.accessToken;
        const role = response?.data?.role;
        setLogin({ email, password, role, accessToken })
        setEmail('');
        setPassword('');
        setSuccess(true);
        } catch (error) {
            if(!error?.response) {
                setError('No Server Response')
            } else if (error.response?.status === 400) {
                setError('Missing username or password')
            } else if ( error.response?.status === 401) {
                setError('Unauthorized')
            } else {
                setError('Login failed')
            }
            errRef.current.focus();
        }
        
    }

    return (
        <Layout>
        {success ? (
        <section>
            <p ref={errRef} className={errRef ? 'error' : 'offscreen'}>{error}</p>
        </section>
        ) : (
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Correo: </label>
            <input type="text" id="email" ref={userRef} autoComplete="off" onChange={(e) => setEmail(e.target.value)} value={email}/>
            <label htmlFor="password">Contraseña: </label>
            <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button>Ingresar</button>
        </form>
        )}
        </Layout>
    )
}

export default Login;