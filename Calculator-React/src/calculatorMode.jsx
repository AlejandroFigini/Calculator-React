
import { faBars, faCalculator, faFlask } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import "./calculatorMode.css";


export function CalculatorMode({ changeMode, mode }) {

    const [showMenu, setShowMenu] = useState(false);



    return (
        <ul>
            <li className={`selected`} onClick={() => setShowMenu(prev => !prev)}>
               <p>{mode}<FontAwesomeIcon icon={faBars} /></p> 
                <ul className={`submenu ${showMenu == true ? "show" : ""}`}>
                    <li className="submenu-item" onClick={() => { changeMode('Standar'); setShowMenu(!prev); }}>
                       <p>Standar <FontAwesomeIcon icon={faCalculator} /></p> 
                    </li>
                    <li className="submenu-item" onClick={() => { changeMode('Scientific'); setShowMenu(!prev); }}>
                       <p>Scientific <FontAwesomeIcon icon={faFlask} /></p> 
                    </li>
                </ul>
            </li>
        </ul>
    );
}
