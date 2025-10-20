import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from './componentes/header.jsx';
import EditarVoluntario from './componentes/editarVoluntario.jsx';
import DeletarVoluntario from './componentes/deletarVoluntario.jsx';
import Message from './componentes/Message.jsx';
import { SquarePen, Trash, MessageCircle, Phone, Mail } from 'lucide-react';

import './Admin.css';

function Admin() {

    // const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const [displayMessage, setDisplayMessage] = useState(false)
    const [isMessageError, setIsMessageError] = useState(false);
    const [message, setMessage] = useState('')

    const [pesquisarVoluntario, setPesquisarVoluntario] = useState('');

    const [voluntarioNome, setVoluntarioNome] = useState('');
    const [voluntarioID, setVoluntarioID] = useState('');
    const [displayEditarVoluntario, setDisplayEditarVoluntario] = useState(false);
    const [displayDeletarVoluntario, setDisplayDeletarVoluntario] = useState(false);
    const [isForbidden, setIsForbidden] = useState(false);
    const [voluntarios, setVoluntarios] = useState([])

    const [windowScreenSize, setWindowScreenSize] = useState(window.innerWidth)

    useEffect(() => {
        const handleResize = () => {
            setWindowScreenSize(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const mobileSize = 820;

    function renderizarVoluntario(voluntario) {

        return (
            <div key={voluntario.id} className='voluntarioContainer'>
                <div className="textContentContainer">
                    <h2 className="titleVoluntario">{voluntario.nome}</h2>
                    <p className="textContent"><Phone className='voluntarioIcons' />{voluntario.telefone}</p>
                    <p className="textContent"><Mail className='voluntarioIcons' />{voluntario.email}</p>
                    <p className="textContent"><span className='tagTextContent'>Observações: </span>{voluntario.observacoes}</p>
                </div>
                <div className="buttonsContainer">
                    <button className="actionButton" id='editarButton' onClick={() => {
                        setVoluntarioID(voluntario.id)
                        setDisplayEditarVoluntario(true)
                    }}><SquarePen /> Editar</button>
                    <button className="actionButton" id='deletarButton' onClick={() => {
                        setVoluntarioID(voluntario.id);
                        setVoluntarioNome(voluntario.nome);
                        setDisplayDeletarVoluntario(true);

                    }}><Trash /> Deletar</button>
                </div>
            </div>
        )
    }

    useEffect(() => {
        async function pegarDados() {
            try {
                const response = await fetch('https://coracao-quentinho-ong-production.up.railway.app/voluntarios/buscar', {
                    method: "GET",
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json'
                        // 'Authorization': token
                    }
                });
                console.log(response);
                if (response.ok) {
                    const result = await response.json();
                    console.log(result);
                    setVoluntarios(result);
                } else {
                    navigate('/login');
                }
            } catch (err) {
                console.log(err);
                setMessage('Ocorreu um erro inesperado!');
                setIsMessageError(true);
                setDisplayMessage(true);

            }
        }
        pegarDados();
    }, [])

    return (
        <div id='adminPage'>
            <Header />

            <input type="text" id='searchInput' placeholder='Ex: Luciano Almeida' value={pesquisarVoluntario} onChange={(e) => setPesquisarVoluntario(e.target.value)}/>

            <main id="mainAdmin">
                <div id="voluntariosContainer">
                    {!isForbidden &&
                        (pesquisarVoluntario.trim()
                            ? voluntarios
                                .filter((voluntario) =>
                                    voluntario.nome.toLowerCase().includes(pesquisarVoluntario.toLowerCase())
                                )
                                .map((voluntario) => renderizarVoluntario(voluntario))
                            : voluntarios.map((voluntario) => renderizarVoluntario(voluntario))
                        )
                    }

                </div>
            </main>

            {displayEditarVoluntario ? <EditarVoluntario setDisplayMessage={setDisplayMessage} setDisplayEditarVoluntario={setDisplayEditarVoluntario} voluntarioID={voluntarioID} setIsMessageError={setIsMessageError} setMessage={setMessage} voluntarios={voluntarios} setVoluntarios={setVoluntarios} /> : null}

            {displayDeletarVoluntario ? <DeletarVoluntario setDisplayDeletarVoluntario={setDisplayDeletarVoluntario} voluntarioID={voluntarioID} voluntarioNome={voluntarioNome} setDisplayMessage={setDisplayMessage} setIsMessageError={setIsMessageError} setMessage={setMessage} voluntarios={voluntarios} setVoluntarios={setVoluntarios} /> : null}

            {displayMessage ? <Message setDisplayMessage={setDisplayMessage} message={message} isMessageError={isMessageError} /> : null}
        </div>
    )
}

export default Admin;