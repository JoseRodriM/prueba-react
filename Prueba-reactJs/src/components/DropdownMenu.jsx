import flecha from "../svg/flecha-izquierda.svg";
const DropdownMenu = (props) => {
    const {hiddesub, submenustatus, menustatus, showsub, name} = props.submenu
  return (
    <div className={` absolute right-[40px] top-[40px] flex flex-row-reverse gap-2 `} onMouseLeave={(()=>hiddesub())}>
      <ul className={`${menustatus==false? 'hidden' : ''} shadow-2xl divide-y divide-extra-light-grey `}>
        <li className="py-3.5 w-[246px] h-[45px] relative " onMouseEnter={()=>showsub()} >
            <p><img src={flecha} alt="flecha" className="absolute left-3 top-4" />Mis cuentas</p>
        </li>
        <li className="py-3.5 h-[45px]" onMouseEnter={(()=>hiddesub())}>
          <p>Vista empleado</p>
        </li>
        <li className="py-3.5 h-[45px]">
          <p>Mi perfil</p>
        </li>
        <li className="py-3.5 h-[45px]">
          <p>Cerrar sersión</p>
        </li>
      </ul>
      <ul className={`${submenustatus ==false? 'hidden' : ''}  h-[90px] shadow-2xl divide-y divide-extra-light-grey`} onMouseLeave={()=> hiddesub()}>
        <li className="flex items-center gap-5 justify-start px-5 h-[45px]  hover:bg-light-green">
          <span className="rounded-full">S1 </span>
          <div className="flex flex-col">
            <p>
              <span className="font-bold">Sesame1 </span>
              {name}
            </p>
            <p className="text-xs text-ligh-grey">Hoy llevas 00:00</p>
          </div>
        </li>
        <li className="flex items-center gap-5 justify-start px-5 h-[45px] w-[246px] hover:bg-light-green">
          <span className="rounded-full">S2 </span>
          <div className="flex flex-col">
            <p>
              <span className="font-bold">Sesame2 </span>
              {name}
            </p>
            <p className="text-xs text-ligh-grey">Hoy llevas 00:00</p>
          </div>
        </li>
      </ul>
    </div>
  );
};
export default DropdownMenu;
