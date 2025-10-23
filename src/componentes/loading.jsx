import {useState} from 'react';
import {Heart} from 'lucide-react';

import './loading.css';
function Loading(){
    
    return(
        <div id='loadingContainerMasterPro'>
            <div id='loadingContainer'>
                <Heart className='heart'/>
                <Heart className='heart'/>
                <Heart className='heart'/>
            </div>
        </div>
    )
}

export default Loading;