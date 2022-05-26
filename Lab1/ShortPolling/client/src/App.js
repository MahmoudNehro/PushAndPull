import './App.css';
import {useEffect, useState} from "react";
import axios from 'axios';
const URL = 'http://localhost:3001'
const ShortPolling =(props)=>{
    const[messages,setMessages]=useState([]);
    const[message,setMessage]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        axios.post(`${URL}/messages`, { message }).catch(console.log)
        .then(()=> setMessage(''));

           
    }

    useEffect(()=>{
     setInterval(() => {
            axios.get(`${URL}/messages`)
            .then(({data})=>setMessages(data)); 
        }, 5000);

 },[]) ;

   


    



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





export default ShortPolling;
