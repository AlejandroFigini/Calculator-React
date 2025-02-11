import "./button.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
/*
export function Button({buttons,updateScreen}){
    return(
        <button 
            className={`btn-${button[0]}`} 
            onClick={() =>(updateScreen)}> 
            <FontAwesomeIcon className="icon" icon={button[1]}/>
        </button>
    )
}
    */




export function Button({ button, action, icon }) {
    return (
        <button className={`btn-${button}`} onClick={() => (action(button))}>
            {icon ? <FontAwesomeIcon className="icon" icon={icon} /> : button}
        </button>
    )
}