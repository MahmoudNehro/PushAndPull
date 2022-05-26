import './App.css';
import {useEffect, useState} from "react";
import axios from 'axios';
const URL = 'http://localhost:3001'
const LongPolling =(props)=>{
    const[messages,setMessages]=useState([]);
    const[message,setMessage]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(`${URL}/long-messages`, { message }).catch(console.log)
        .then(()=> setMessage(''));

           
    }

   useEffect(()=>{
     axios.get(`${URL}/long-messages`)
     .then(({data})=>{
      setMessages(messages.concat(data));
     });
   },[messages]);
   


    
  return(
      <>
      <div className="form-wrapper">
    <form id="form" className="validate" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>messages</label>
        <input type="text" name="message" id="message" placeholder="message" onChange={(e)=>setMessage(e.target.value)} value={message}/>
      </div>

    </form>
  </div>
        <section>
          <div>
            <h1>messages</h1>
            <ul className="check-list">
              {

                 messages.map((m, i) => <li key={i}>{m.message}</li>)
              }
            </ul>
          </div>

        </section>
        </>

)
}





export default LongPolling;
