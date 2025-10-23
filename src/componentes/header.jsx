import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { LogOut } from 'lucide-react';
import './header.css'


function Header({setDisplayMessage, setMessage, setIsMessageError, setDisplayLoading}) {
    const navigate = useNavigate();
    const [windowScreenSize, setWindowScreenSize] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowScreenSize(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileSize = 720;

    async function logoutFunction(){
        try{
        setDisplayLoading(true);
        const response = await fetch('https://coracao-quentinho-ong-production.up.railway.app/auth/logout', {
            method: "post",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        })
        setDisplayLoading(false);
        console.log(response);
        if(response.ok){
            navigate('/login');
        }else{
            setMessage('Ocorreu um erro ao deslogar, tente novamente');
            setIsMessageError(true);
            setDisplayMessage(true);
            return
        }
        navigate('/login');
        }catch(err){
            console.log(err);
        }
    }

    return (
        <>
            <header className="cabecalho headerAdmin">
                <div id="logoContainer">
                    <a href="/"><img src="/logo.png" id="logo" /></a>
                    {/* <p id="txtHeader">{windowScreenSize >= mobileSize ? "Coração Quentinho - Administração" : 'Administração'}</p> */}
                </div>

                <button id="logout" onClick={logoutFunction}><LogOut /> Sair</button>
            </header>
        </>
    )
}

export default Header;