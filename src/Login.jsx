import { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Message from './componentes/Message.jsx';

import './Login.css';

//PRECISA FAZER UM useEffect PRA VERIFICAR SE O USUÁRIO ESTÁ LOGADO


function Login() {
    
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    const [displayMessage, setDisplayMessage] = useState(false);
    const [isMessageError, setIsMessageError] = useState(false);
    const [message, setMessage] = useState('');
    
//     useEffect(() => {
//     const token = localStorage.getItem("token");

//     if (token && token.startsWith("Bearer ")) {
//       navigate("/admin");
//     }
//   }, [navigate]);

    async function submitLogin() {
        try {
            if (!email.trim() || !password.trim()) {
                setLoginError('Todos os campos devem ser preenchidos');
                return
            }


            const response = await fetch('https://coracao-quentinho-ong-production.up.railway.app/auth/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username: email, password: password })
            });
            if (response.ok) {
                navigate('/admin');
            } else {
                const result = await response.json();
                console.log(result);
                setIsMessageError(true);
                setMessage(result.error);
                setDisplayMessage(true);
                setLoginError('')
                return
            }
        } catch (err) {
            console.log(err.message);
            setIsMessageError(true);
            setMessage(err.message);
            setDisplayMessage(true);
        }
    }

    return (
        <div id='mainDiv-login'>
            <div id='loginContainer'>
                <h1 id="titleLogin">Login</h1>
                <div className="inputContainer">
                    <input type="email" className="input" placeholder='Digite seu email' value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }} required onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            submitLogin();
                        }
                    }} />
                    <div className="passwordContainer">
                        <input type={passwordVisibility ? "text" : "password"} className="input passwordInput" placeholder='Digite sua senha' value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }} required onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                submitLogin();
                            }
                        }} />
                        <button type='button' className="passwordVisibilityButton" onClick={() => {
                            setPasswordVisibility(!passwordVisibility);
                        }}>{passwordVisibility ? <Eye className='eyeIcon' /> : <EyeOff className='eyeIcon' />}</button>
                    </div>
                </div>
                <div className="buttonSubmitContainer">
                    <p id="loginError">{loginError}</p>
                    <button className="loginSubmitButton" onClick={submitLogin} >Entrar</button>
                </div>
            </div>
            {displayMessage ? <Message setDisplayMessage={setDisplayMessage} message={message} isMessageError={isMessageError} /> : null}
        </div>
    )
}

export default Login;