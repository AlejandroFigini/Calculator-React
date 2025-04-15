import "../css/history.css"


import { useState } from "react";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function History({history,updateScreenFromHistory}) {

    const [Open, setOpen] = useState(false);



    return (
        <>
        <div className={'historical-container'}>
            <FontAwesomeIcon  onClick={() => setOpen(!Open)} className={'historical-icon'} icon={faClockRotateLeft} style={{ color: "white" }}/>
            <div className={`elements ${Open ? 'open' : ''}`}>
          
                {history.map((entry, index) => (
                    <h3 key={index} onClick={ 
                    function(){
                        updateScreenFromHistory(entry);
                      }
                       
                    }>{entry}</h3>
                ))}           
            </div>
        </div>      
        </>        
    );
}
