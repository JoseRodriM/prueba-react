const Buttons = (props) =>{
    const workOutPost = props.workOutPost
    return(
        <div className="flex gap-2">            
            <button className={`bg-grey`}>Pausar</button>
            <button className={`bg-salmon`} onClick={()=>workOutPost()}>Salir</button>
        </div>
    )
}
export default Buttons;