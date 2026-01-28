import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios'

function App() {
  let [send,setSend]=useState('SYP');
  let [reseve,setReseve]=useState('USD')
  let [input,setInput]=useState(0.00)
  let [data,setData]=useState([])
  // handle
  const handleSend=(event)=>{
    setSend(event.target.value)
  }
   const handleReseve=(event)=>{
    setReseve(event.target.value)
  }
const handleInput=(event)=>{
        setInput(event.target.value)
       }
// currency Api
useEffect(()=>{
let API=async()=>{
  try {
      let response=await axios.get('https://v6.exchangerate-api.com/v6/b51d0ac3bd8aa99f4f4c0568/latest/USD')
setData(response.data.conversion_rates)
  } catch (error) {
    setData(error)
    
  }
}
API()
},[])
let result;
const transform=()=>{
  let money=input*data[send];
 result=(money*data[reseve]).toFixed(2)
if(send===reseve)
  result=input
}
transform()
  return (
    <div className='main'>
      <h1>Currency System</h1>
   <div className='currency'>
       <select  value={send} onChange={handleSend}>
    <option>USD</option>
      <option>SYP</option>
      <option>JOD</option>
     <option>EUR</option>


    </select>
    <span>to</span>
     <select value={reseve} onChange={handleReseve}>
      <option>SYP</option>
            <option>USD</option>
      <option>JOD</option>
            <option>EUR</option>


    </select>
</div>
     
       <input min={1} value={input} type='number' onChange={handleInput}/>
    <div className='result'>
      {`${result} ${reseve}`}
    </div>

   </div>



  );
}

export default App;
