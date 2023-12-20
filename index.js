const express=require ('express')
const cors = require('cors');
require('dotenv').config();
const app=express()
const port= process.env.PORT || 5001;



// middleware

app.use(cors())
app.use(express.json())


app.get('/',(req,res)=>{
      res.send('auto hubs server is running.....>>>')
})

app.listen(port,()=>{
     console.log(`this site is going on port ${port}`);
})