import { useState, useEffect } from "react";

import { X } from 'lucide-react';
import './CadastroFormulario.css';

function CadastroFormulario(props) {
    const [nomeCompleto, setNomeCompleto] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
    const [observacoes, setObservacoes] = useState('');
    const [enviado, setEnviado] = useState(false);

    const [nomeCompletoError, setNomeCompletoError] = useState(false);
    const [emailError, setEmailError] = useState(false)
    const [telefoneError, setTelefoneError] = useState(false)

    const [displaySubmitError, setDisplaySubmitError] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        const nomeRegex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
        setNomeCompletoError(!nomeRegex.test(nomeCompleto));
    }, [nomeCompleto]);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        setEmailError(!emailRegex.test(email));
    }, [email]);

    useEffect(() => {
        const telefoneRegex = /^(?:\+55\s?)?(?:\(?\d{2}\)?\s?)?(?:\d{4,5}-?\d{4})$/;
        setTelefoneError(!telefoneRegex.test(telefone));
    }, [telefone]);


    async function enviarFormulario() {
        if(nomeCompletoError === true || emailError === true || telefoneError === true){
            setDisplaySubmitError(true);
            setSubmitError('Todos os campos devem ser validos');
            return;
        }

        if (enviado === true) {
            setDisplaySubmitError(true)
            setSubmitError('Esse formulário já foi enviado, recarregue a página ou tente novamente');
            return;
        }
        console.log('Enviado:' + enviado);
        console.log('nomeCompleto:' + nomeCompleto);
        console.log('email:' + email);
        console.log('telefone:' + telefone);
        console.log('observacoes:' + observacoes);
        try {
            const response = await fetch('https://coracao-quentinho-ong-production.up.railway.app/voluntarios/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nomeCompleto,
                    email,
                    telefone,
                    detalhes: observacoes
                })
            });
            if (response.ok) {
                const result = await response.json()
                console.log(result);
                setEnviado(true);
                setDisplaySubmitError(false);
                setSubmitError('');
                props.setDisplayFormVoluntario(false)

                props.setDisplayMessage(true);
                props.setMessageContent("Cadastrado com sucesso");
                props.setIsMessageError(false);

            } else if (response.status === 403) {
                setDisplaySubmitError(true);
                setSubmitError('Esse email já foi cadastrado');
                setEnviado(false);
                return;
            }
        } catch (err) {
            console.log(err);
            setDisplaySubmitError(true);
            setSubmitError("Ocorreu um erro Inesperado. Tente novamente mais tarde");
            setEnviado(false);
        }
        setNomeCompleto('');
        setEmail('');
        setTelefone('');
        setObservacoes('');
        setSubmitError('');
        setEnviado(false);
    }

    return (
        <div id="formCadastroVoluntarioContainer">
            <form action="" id="formCadastroVoluntario">
                <button className="closeFormButton" onClick={(e) => {
                    e.preventDefault();
                    props.setDisplayFormVoluntario(false);
                }}><X /></button>

                <h1 className="titleFormulario">Cadastro de Voluntários</h1>

                <div id="formCadastroVoluntario-inputContainer">
                    <input type="text" className="cadastroVoluntario-input" placeholder="Nome Completo*" value={nomeCompleto} onChange={(e) => {
                        setNomeCompleto(e.target.value);

                    }} required />
                    <p className="errorMessageInput" style={nomeCompletoError ? { color: 'red' } : { color: 'green' }}>O nome só pode conter letras e espaços.</p>

                    <input type="email" className="cadastroVoluntario-input" placeholder="Email*" value={email} onChange={(e) => {
                        setEmail(e.target.value);

                    }} required />
                    <p className="errorMessageInput" style={emailError ? { color: 'red' } : { color: 'green' }}>Insira um email válido.</p>

                    <input type="text" className="cadastroVoluntario-input" placeholder="Telefone" value={telefone} onChange={(e) => {
                        setTelefone(e.target.value);

                    }} />
                    <p className="errorMessageInput" style={telefoneError ? { color: 'red' } : { color: 'green' }}>Insira um telefone válido.</p>

                    <input type="text" className="cadastroVoluntario-input" placeholder="Disponibillidade/Observações" value={observacoes} onChange={(e) => {
                        setObservacoes(e.target.value);
                    }} />
                </div>
                <p className="submitError">{displaySubmitError ? submitError : null}</p>
                <button id="cadastroVoluntarioSubmit" onClick={(e) => {
                    e.preventDefault()
                    enviarFormulario()
                }}>
                    Cadastrar
                </button>
            </form>
        </div>
    );
}
export default CadastroFormulario;