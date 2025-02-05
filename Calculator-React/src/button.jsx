import "./button.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function Button({buttons,updateScreen}){
    return(
        buttons.map((button)=>(
        <button 
            className={`btn-${button[0]}`} 
            onClick={() =>(button[2]?button[2]():updateScreen(button[0]))}> 
            <FontAwesomeIcon className="icon" icon={button[1]}/>
        </button>
    ))
    )
}