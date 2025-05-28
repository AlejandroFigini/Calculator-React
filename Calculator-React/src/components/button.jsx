import "../css/button.css"


export function Button({icon,operator,action }) {
    return (
      <button className={`btn-${icon }`} onClick={() => action(operator ? operator : icon)}> 
        {icon}
      </button>
    )
}