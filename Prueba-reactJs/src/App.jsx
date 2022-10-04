import { useEffect, useState } from "react";
import "./App.css";
import flechaAbajo from './svg/chevron-left.svg'
import Buttons from "./components/Buttons";
import DropdownMenu from "./components/DropdownMenu";
import { getData, workOut, workIn } from "./helpers/axios";
import { milisecondsToHours } from './helpers/funciones'
function App() {
  const [currentTime, setCurrentTime] = useState('');
  const [timeWorked, setTimeWorked] = useState('')
  const [workInDate, setWorkInDate] = useState('');
  const [workOutDate, setWorkOutDate] = useState('');
  const [empleado, setEmpleado] = useState();
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [menu, setMenu] = useState(false);
  const [submenu, setSubmenu] = useState(false);
  const [inforWorkOut, setInfoWorkOut] = useState();
  const [infoWorkIn, setInfoWorkIn] = useState();
  let dateIn = new Date(workInDate)
  dateIn = dateIn.getTime()
  const showSubMenu = () => setSubmenu(true);
  const hiddeSubMenu = () => setSubmenu(false);
  // Props para pasar al submenu para poder mostrarlo u ocultarlo
  const submenuprops = {
    submenustatus : submenu,
    hiddesub : hiddeSubMenu,
    showsub : showSubMenu,
    menustatus : menu,
    name:name
  }
  // Funciones para enviar los posts en formato JSON
  // Las funciones son importadas del archivos axios.js y reciben por parametro el JSON necesario para hacer el post
  const workOutPost = () => inforWorkOut !== undefined ? workOut(JSON.stringify(inforWorkOut)) : ''
  const workInPost = () => infoWorkIn !== undefined ? workIn(JSON.stringify(infoWorkIn)): ''
  useEffect(() => {
    // Ejecución del fetch para obtener datos
    getData(setEmpleado)
    // Calcular el tiempo trabajando en status 'online'
    if(empleado!==undefined){
      setInterval(() => {
        let date = new Date();
        date = date.getTime();
        let workedTime = date - dateIn
        // Saldrá un número de horas altas porque la fecha de entrada de la api es:'2022-05-08T13:39:46+02:00', calculará las horas desde esa fecha hasta hoy
        milisecondsToHours(workedTime, setCurrentTime);
      }, 1000);
    }
  }, []);
  
  useEffect(()=>{
    // useEffect que espera los datos del empleado para poder renderizar el componente
    if(empleado !== undefined){
      const fullName = `${empleado.employee.firstName} ${empleado.employee.lastName}`
      setName(fullName)
      setStatus(empleado.employee.workStatus)
      // Descomenta la línea de abajo para que el estado del empleado pase a Online y puedan ver los otros botones
      // setStatus('online')
      setId(empleado.employee.id)
      setInfoWorkOut({'employeedId': id, 'workEntryOut':{'coordinates': {'latitude':0, 'longitud':0}}})
      setInfoWorkIn({'employeedId': id, 'workEntryIn':{'coordinates': {'latitude':0, 'longitud':0}}})
      setWorkInDate(empleado.workEntryIn.date)
      setWorkOutDate(empleado.workEntryOut.date)
      if(status !== 'online'){
        let dateOut = new Date(workOutDate)
        dateOut = dateOut.getTime()
        let workedTimeOut = dateOut - dateIn;
        milisecondsToHours(workedTimeOut, setTimeWorked)
      }
    }
  },[empleado]) 

  return (
    <div className="App inline-block mx-auto">
      {/* Condicional mientras cargan los datos del fetch */}
      {empleado !== undefined ? 
      <div className=" relative box-border bg-extra-light-grey flex items-center justify-center gap-3 rounded-3xl px-8 py-2" onMouseLeave={()=> setMenu(false)}>
        {/* Si está online mostrará el tiempo trabajado, si es diferente a online mostrará el tiempo trabajado */}
        <div>
          {status=='online'?<p className="text-xs text-extra-dark-grey pr-2">{currentTime}</p>:''}
          {status !=='online'&& timeWorked !== `${NaN}:${NaN}:${NaN}`?<p className="text-xs text-extra-dark-grey pr-2">{timeWorked}</p>:''}
        </div>
        {/* Condicional para mostrar el botón Entrar si el estado es Online o los botones Pausar y Salir en caso de estar Offline o en Pause */}
        <div>
          {status == 'offline' ?<button className="bg-green" onClick={()=> workInPost()}>Entrar</button>:<Buttons workOutPost={workOutPost}/>}
        </div>
        <hr className="w-5 rotate-90 text-ligh-grey" />
        {/* Avatar Random que marca con colores el estado del empleado*/}
        <div className="relative">
          <img
            src="https://i.pravatar.cc/30"
            alt="avatar"
            className="rounded-full  w-6"/>
        {/* Si el estado es Online muestra el círculo en verde, si no muestra rojo*/}
          <div className={`rounded-full bg-${status == 'online' ? 'green': 'salmon'} w-2 h-2 absolute left-5 top-2`}></div>
        </div>
        {/* Nombre y apellido del empleado */}
        <div className={`flex items-center justify-center gap-3`} onMouseEnter={()=> setMenu(true)} >
            <h2 className="font-bold text-base text-extra-dark-grey text-sm">{name}</h2>
            <img src={flechaAbajo} alt="flecha" />
        </div>
        {/* Menú desplegable */}
          <DropdownMenu submenu={submenuprops} />
      </div>
      :
      <div>Loading...</div>}
    </div>
  );
}
export default App;
