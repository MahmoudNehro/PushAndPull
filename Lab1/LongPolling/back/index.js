const express= require('express')
const cors= require('cors');
const app=express();
app.use(cors());

app.use(express.json());

// view engine setup
const subscribers ={};

app.get('/long-messages', ((req, res) => {
    const id= Math.ceil(Math.random()*100)
    subscribers[id]=res;
}))



app.post('/long-messages', (req, res)=>{
    const {body} = req;
    console.log(body);
    Object.entries(subscribers).forEach(([id,response])=>{
     response.json(req.body);
     delete subscribers[id]
    });
    res.sendStatus(204);
})

app.listen(3001,()=>{
    console.log(`server running on port:3001`)
})
 