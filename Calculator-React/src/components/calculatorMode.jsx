
import { faBars, faCalculator, faFlask } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

import "../css/calculatorMode.css";


export function CalculatorMode({ changeMode, mode }) {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <div className={`container`}>
            <ul>
                <li className={`selected`} onClick={() => setShowMenu(prev => !prev)}>
                    <p><FontAwesomeIcon icon={faBars} />{mode}</p>
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
        </div>
    );
}
