import "../css/button.css"


export function Button({icon,operator,action }) {
    return (
      <button className={`btn-${icon ? icon : operator}`} onClick={() => action(operator)}> 
        {icon ? icon : operator}
      </button>
    )
}