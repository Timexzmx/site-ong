import { useState } from 'react';
import {Eye, EyeOff} from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import Message from './componentes/Message.jsx';

import './Login.css';

//PRECISA FAZER UM useEffect PRA VERIFICAR SE O USUÁRIO ESTÁ LOGADO
//PRECISA FAZER AS VALIDAÇÕES
//PRECISA AJEITAR O Message.jsx PRA RENDERIZAR GLOBALMENTE SEM A NECESSIDADE DE INSERIR MANUALMENTE EM CADA PÁGINA

function Login() {
    
    const [passwordVisibility, setPasswordVisibility] = useState(false);
    const [loginError, setLoginError] = useState(null);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()


    async function submitLogin(){
        try{
        const response = await fetch('https://coracao-quentinho-ong-production.up.railway.app/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username: email, password: password})
        });
        if(response.ok){
            navigate('/admin');
        }else{
            const result = await response.json();
            console.log(result);
            <Message isMessageError={true} message={result.error}/>
        }
    }catch(err){
        console.log(err.message);
        return <Message isMessageError={true} message={err.message}/>
    }
    }

    return (
        <div id='mainDiv-login'>
            <div id='loginContainer'>
                <h1 id="titleLogin">Login</h1>
                <div className="inputContainer">
                    <input type="text" className="input" placeholder='Digite seu email' value={email} onChange={(e) => {
                        setEmail(e.target.value);
                    }}/>
                    <div className="passwordContainer">
                        <input type={passwordVisibility ? "text" : "password"} className="input passwordInput" placeholder='Digite sua senha' value={password} onChange={(e) => {
                            setPassword(e.target.value);
                        }}/>
                        <button type='button' className="passwordVisibilityButton" onClick={()=> {
                            setPasswordVisibility(!passwordVisibility);
                        }}>{passwordVisibility ? <Eye className='eyeIcon'/> : <EyeOff className='eyeIcon'/>}</button>
                    </div>
                </div>
                <div className="buttonSubmitContainer">
                    <p id="loginError">{loginError}</p>
                    <button className="loginSubmitButton" onClick={submitLogin}>Entrar</button>
                    <a href="#" id="esqueciASenha">Esqueci a Senha</a>
                    </div>
            </div>
        </div>
    )
}

export default Login;