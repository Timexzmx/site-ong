import { useState, useEffect } from 'react';

import { CircleCheck, CircleX } from 'lucide-react';
import './deletarVoluntario.css';

function DeletarVoluntario({ voluntarioID, setDisplayDeletarVoluntario, voluntarioNome, setMessage, setDisplayMessage, setIsMessageError, voluntarios, setVoluntarios }) {

    const token = localStorage.getItem('token');

    async function enviarDeletarVoluntario() {
        try {
            const response = await fetch(`https://coracao-quentinho-ong-production.up.railway.app/voluntarios/deletar/${voluntarioID}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            if (response.ok) {
                const newVoluntarios = voluntarios.filter((v) => v.id != voluntarioID)
                setVoluntarios(newVoluntarios);
                setMessage("Voluntário Deletado");
                setIsMessageError(false);
                setDisplayDeletarVoluntario(false);
                setDisplayMessage(true);
            } else if (response.code === 403) {
                setMessage("Login expirado ou inválido, por favor, recarregue a página");
                setIsMessageError(true);
                setDisplayDeletarVoluntario(false);
                setDisplayMessage(true)
            } else {
                setMessage("Ocorreu um erro inesperado. Tente novamente!");
                setIsMessageError(true);
                setDisplayDeletarVoluntario(false);
                setDisplayMessage(true)
            }
        } catch (err) {
            console.log(err);

            setMessage("Ocorreu um erro inesperado. Tente novamente!");
            setIsMessageError(true);
            setDisplayDeletarVoluntario(false);
            setDisplayMessage(true)
        }
    }

    return (
        <div id='deletarVoluntarioContainerMaxPro'>
            <div id="deletarButtonContainerMasterPro">
                <h1 id="titleDeletar">Tem certeza que deseja deletar {voluntarioNome}?</h1>
                <div id="deletarButtonContainer">
                    <button className="deletarButton" id="simButton" onClick={enviarDeletarVoluntario}><CircleCheck /> Sim</button>
                    <button className="deletarButton" id="naoButton" onClick={() => {
                        setDisplayDeletarVoluntario(false);
                    }}><CircleX /> Não</button>

                </div>
            </div>
        </div>
    )
}
export default DeletarVoluntario;