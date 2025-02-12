import "./button.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export function Button({ button, action, icon }) {
    return (
        <button className={`btn-${button}`} onClick={() => (action(button))}>
            {icon ? icon : button}
        </button>
    )
}