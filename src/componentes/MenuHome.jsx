import { useState } from 'react';
import { X } from 'lucide-react';

import './MenuHome.css';

function MenuHome({ setDisplayMenu }) {
    return (

        <div id='menuContainerMasterPlus'>
            <div id='menuContainer'>
                <button id='closeButton' onClick={() => {
                    setDisplayMenu(false)
                }}><X /></button>
                
                <a href="#quem-somos" onClick={() => {
                    setDisplayMenu(false);
                }}
                >Quem Somos</a>
                
                <a href="#acoes" onClick={() => {
                    setDisplayMenu(false);
                }}
                >Ações</a>
                
                <a href="#cards" onClick={() => {
                    setDisplayMenu(false);
                }}
                >Missões & Valores</a>
                
                <a href="#voluntario" onClick={() => {
                    setDisplayMenu(false);
                }}
                >Voluntarie-se</a>
                
                <a href="#apoio" id="doe" onClick={() => {
                    setDisplayMenu(false);
                }}
                >Doar</a>
            </div>
        </div>

    )
}
export default MenuHome;