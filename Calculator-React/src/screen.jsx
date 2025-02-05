import "./screen.css"
export function Screen({className,text}){
    return(
        <h2 className={className}>{text}</h2>
    )
}