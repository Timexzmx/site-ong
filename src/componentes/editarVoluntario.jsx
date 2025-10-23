import { useState, useEffect } from 'react';

import { X, SquarePen } from 'lucide-react';
import './editarVoluntario.css';

function EditarVoluntario({ voluntarioID, setDisplayEditarVoluntario, setMessage, setDisplayMessage, setIsMessageError, voluntarios, setVoluntarios, setDisplayLoading }) {


    let oldVoluntario = voluntarios.find((v) => { return v.id == voluntarioID });
    if (!oldVoluntario.detalhes) {
        oldVoluntario.detalhes = '';
    }
    // console.log(oldVoluntario)

    const [nomeCompletoError, setNomeCompletoError] = useState(false);
    const [emailError, setEmailError] = useState(false)
    const [telefoneError, setTelefoneError] = useState(false)

    const [enviado, setEnviado] = useState(false);

    //dos input
    const [newNomeCompleto, setNewNomeCompleto] = useState(oldVoluntario.nome);
    const [newEmail, setNewEmail] = useState(oldVoluntario.email);
    const [newTelefone, setNewTelefone] = useState(oldVoluntario.telefone);
    const [newDetalhes, setNewDetalhes] = useState(oldVoluntario.detalhes);

    const [errorMessage, setErrorMessage] = useState('');

    // const token = localStorage.getItem('token');

    useEffect(() => {
        const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        setNomeCompletoError(!nomeRegex.test(newNomeCompleto));
    }, [newNomeCompleto]);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!emailRegex.test(newEmail));
    }, [newEmail]);

    useEffect(() => {
        const telefoneRegex = /^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?(?:\d{4,5}-?\d{4})$/;
        setTelefoneError(!telefoneRegex.test(newTelefone));
    }, [newTelefone]);
    async function enviarEditarVoluntario() {
        try {

            if (oldVoluntario.nome === newNomeCompleto &&
                oldVoluntario.email === newEmail &&
                oldVoluntario.telefone === newTelefone &&
                oldVoluntario.detalhes === newDetalhes) {

                setErrorMessage('Nenhuma alteração detectada!');
                return;
            }

            if (nomeCompletoError === true || emailError === true || telefoneError === true) {
                setErrorMessage('Todos os campos devem ser validos');
                return;
            }

            if (enviado === true) {
                setErrorMessage('Esse formulário já foi enviado, recarregue a página ou tente novamente');
                return;
            }

            // console.log('Token: ' + token);
            setDisplayLoading(true);
            const response = await fetch(`https://coracao-quentinho-ong-production.up.railway.app/voluntarios/atualizar/${voluntarioID}`, {
                method: 'put',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': token
                },
                body: JSON.stringify({
                    nomeCompleto: newNomeCompleto,
                    email: newEmail,
                    telefone: newTelefone,
                    detalhes: newDetalhes
                })
            });
            setDisplayLoading(false);
            console.log(response.ok);
            if (response.ok) {

                const newVoluntarios = voluntarios.map((v) => {
                    if (v.id !== voluntarioID) {
                        return v
                    } else {
                        return {
                            ...v,
                            nome: newNomeCompleto,
                            email: newEmail,
                            telefone: newTelefone,
                            detalhes: newDetalhes || ''
                        }
                    }
                })
                console.log("newVoluntarios: ");
                console.log(newVoluntarios);
                setVoluntarios(newVoluntarios);
                setMessage("Dados Alterados");
                setIsMessageError(false);
                setDisplayEditarVoluntario(false);
                setDisplayMessage(true);
            } else {
                const result = await response.json()
                console.log(result);
                setMessage("Ocorreu um erro ao alterar os dados");
                setIsMessageError(true);
                setDisplayEditarVoluntario(false);
                setDisplayMessage(true);
            }
        } catch (err) {
            console.log(err);
            setMessage("Ocorreu um erro ao alterar os dados");
            setIsMessageError(true);
            setDisplayEditarVoluntario(false);
            setDisplayMessage(true);
        }
    }

    return (
        <div id='editarVoluntarioContainerMaxPro'>
            <form id="editarVoluntario">
                <button id="closeButton" onClick={() => {
                    setDisplayEditarVoluntario(false);
                }}><X /></button>
                <h1 id="titleEditar">Editar Voluntário</h1>
                <div id="voluntarioDataContainer">
                    <div className="inputContainerVoluntario">
                        <label className="labelVoluntario">
                            Nome</label>
                        <input type="text" className="inputVoluntario" value={newNomeCompleto} onChange={(e) => {
                            setNewNomeCompleto(e.target.value);
                        }} required onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                enviarEditarVoluntario();
                            }
                        }} />
                        <p className="errorMessageInputEditar" style={nomeCompletoError ? { color: 'red' } : { color: 'green' }}>O nome só pode conter letras e espaços.</p>
                    </div>
                    <div className="inputContainerVoluntario">
                        <label className="labelVoluntario">
                            Email</label>
                        <input type="email" className="inputVoluntario" value={newEmail} onChange={(e) => {
                            setNewEmail(e.target.value);
                        }} required onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                enviarEditarVoluntario();
                            }
                        }} />
                        <p className="errorMessageInputEditar" style={emailError ? { color: 'red' } : { color: 'green' }}>Insira um email válido.</p>
                    </div>
                    <div className="inputContainerVoluntario">
                        <label className="labelVoluntario">
                            Telefone</label>
                        <input type="text" className="inputVoluntario" value={newTelefone} onChange={(e) => {
                            setNewTelefone(e.target.value);
                        }} required onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                enviarEditarVoluntario();
                            }
                        }} />
                        <p className="errorMessageInputEditar" style={telefoneError ? { color: 'red' } : { color: 'green' }}>Insira um telefone válido.</p>
                    </div>
                    <div className="inputContainerVoluntario">
                        <label className="labelVoluntario">
                            Observação</label>
                        <input type="text" className="inputVoluntario" value={newDetalhes} onChange={(e) => {
                            setNewDetalhes(e.target.value);
                        }} onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                enviarEditarVoluntario();
                            }
                        }} />
                    </div>
                </div>
                <div id="submitButtonContainerEditar">
                    <p id="errorMessageSubmit">{errorMessage}</p>
                    <button id="submitButtonEditarVoluntario" type='button' onClick={enviarEditarVoluntario}><SquarePen /> Editar</button>
                </div>
            </form>
        </div>
    )
}
export default EditarVoluntario;