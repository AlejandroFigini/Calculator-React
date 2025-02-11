import "./screen.css"
export function Screen({className,text}){
    return(
        <h2 className={className}>{text}</h2>
    )


     /*
   <div className="ct-screen">
         <Screen className="ct-screen-up" text={result ? expression : null} />
         <Screen className="ct-screen-down" text={result ? result : expression} />
       </div>
   */
}