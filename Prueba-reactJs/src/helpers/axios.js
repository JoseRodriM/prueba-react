import axios from "axios";

const token = import.meta.env.VITE_API_KEY;
const config = { headers: { Authorization: `Bearer ${token}` } };
const urlWorkOut = import.meta.env.VITE_URL_WORKOUT
const urlWorkIn = import.meta.env.VITE_URL_WORKIN

const getData = async(variable) =>{
  try {
    const response = await axios.get(import.meta.env.VITE_URL,config);
    const data = await response.data.data[0]
    variable(data)
  } catch (error) {
    console.log(error)
  }
};

const workOut = (info) =>{
  axios.post(urlWorkOut, info , config)
  .then((res)=>console.log(res))
  .catch((error) =>{console.log(error)})
}

const workIn = (info) =>{
  axios.post(urlWorkIn, info , config)
  .then((res)=>console.log(res))
  .catch((error) =>{console.log(error)})
}

export { getData, workOut, workIn };
