const express=require ('express')
const cors = require('cors');
require('dotenv').config();
const app=express()
const port= process.env.PORT || 5001;




// middleware
app.use(cors())
app.use(express.json())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.tgzt8q2.mongodb.net/?retryWrites=true&w=majority`;


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const userCollection = client.db("AutoHubDB").collection("Users");
    const carCollection = client.db("AutoHubDB").collection("cars");
    


    app.post('/users',async(req,res)=>{
        const user=req.body;
         
        const result =await userCollection.insertOne(user)
        res.send(result)
        // console.log(user);

    })

    app.get('/users/:email',async(req,res)=>{
         const  email=req.params.email;
        //    console.log(email);
           const query={userMail:email}
           const result= await userCollection.findOne(query)
           res.send(result)
    })




    // cars collection

    app.post ('/cars',async(req,res)=>{
         const car=req.body;
        //  console.log(car);
         const result=await carCollection.insertOne(car)
         res.send(result)
    })


    app.get('/cars',async (req,res)=>{
         const result=await carCollection.find().toArray()
         res.send(result)

    })

   
     app.get('/cars/:id',async (req,res)=>{
          const id=req.params.id;
          const query={_id:new ObjectId(id)}
          const result=await carCollection.findOne(query)
          res.send(result)
     })


    app.delete('/cars/:id',async(req,res)=>{
         const id=req.params.id;
         const query={_id:new ObjectId(id)}
         const result=await carCollection.deleteOne(query)
         res.send(result)
    })

    app.patch('/cars/:id',async(req,res)=>{
         const updatecar=req.body;

         const id=req.params.id;
         const filter={_id:new ObjectId(id)}
         const options = { upsert: true };
         const updatedDoc={
          $set:{ 
            carName:updatecar.carName,
            model:updatecar.model,
            price:updatecar.price,
            registration:updatecar.registration,
            brand:updatecar.brand,
          }

       }

       const result=await carCollection.updateOne(filter,updatedDoc,options)
    res.send(result)

    })





    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);














app.get('/',(req,res)=>{
      res.send('auto hubs server is running.....>>>')
})

app.listen(port,()=>{
     console.log(`this site is going on port ${port}`);
})