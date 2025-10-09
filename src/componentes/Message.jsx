import { useState } from "react"
import {Frown, Smile} from 'lucide-react'

import './Message.css';

function Message(props){

    

    return (
        <div id="messageBackgroundContainer">
            <div id="messageContainerMasterPlus">
                <div id="messageContainer">
                    {props.isMessageError ? <Frown className='messageIcon errorColorMessage'/> : <Smile className='messageIcon okColorMessage'/>}
                    {props.isMessageError ? <p className='message errorColorMessage'>{props.message}</p> : <p className='message okColorMessage'>{props.message}</p>}
                </div>
                <button className={props.isMessageError ? "confirmMessageButton errorColorMessageButton" : "confirmMessageButton okColorMessageButton"} onClick={() => {
                    props.setDisplayMessage(false);
                }}>Ok</button>
            </div>
        </div>
    );
}
export default Message