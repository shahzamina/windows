const express=require('express')
const cors=require('cors')
const dotenv=require('dotenv')
dotenv.config({path:'./.env'})
const path = require('path'); 
const app=express()

app.use(cors())
app.use(express.json())

const connectDb=require('./db.cjs')
connectDb()
const PORT=process.env.PORT ||5000
const Route=require('./routes/userroute.cjs')

app.use('/',Route)

app.use(express.static(path.join(__dirname, '../client/dist')));

app.get(/^\/.*$/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});


app.listen(PORT, () =>{
        console.log(`server is running on port ${PORT}`)
})

