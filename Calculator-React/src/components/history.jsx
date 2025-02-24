import "../css/history.css"



import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function History() {
    return (
        <div className={'historical-container'}>
            <FontAwesomeIcon  className={'historical-icon'} icon={faClockRotateLeft} style={{ color: "white" }}/>
        </div>
    );
}
