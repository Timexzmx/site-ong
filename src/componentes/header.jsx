import { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { LogOut } from 'lucide-react';
import './header.css'


function Header() {
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

    return (
        <>
            <header className="cabecalho headerAdmin">
                <div id="logoContainer">
                    <a href="/"><img src="/logo.png" id="logo" /></a>
                    {/* <p id="txtHeader">{windowScreenSize >= mobileSize ? "Coração Quentinho - Administração" : 'Administração'}</p> */}
                </div>

                <button id="logout" onClick={() => {
                    const token = localStorage.getItem('token');
                    if(token){
                    localStorage.removeItem('token');
                    }
                    navigate('/login');
                }}><LogOut /> Sair</button>
            </header>
        </>
    )
}

export default Header;