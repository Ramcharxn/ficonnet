const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const Crediential = require('./models/Crediential')

const app = express()

mongoose.connect('mongodb+srv://ficonnet:ficonnet@cluster0.mqvmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
.then(() => console.log('db connected'))
.catch(err => console.log(err.message))

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.post('/createUser',async(req,res) => {
    const {fname, lname, email, number, type, company} = req.body

    const cred = new Crediential({
        fname, lname, email, number, type, company
    })

    await cred.save()

    res.send('saved')
})

app.post('/verifyUser',async(req,res) => {
    const {email, number} = req.body

    const cred_num = await Crediential.find({'number': number}).count()
    const cred_email = await Crediential.find({'email': email}).count()

    if(cred_num>=1){
        res.send('number already exist')
    } else if (cred_email>=1) {
        res.send('email already exist')
    } else {
        res.send('done')
    }

})

app.post('/checkUser',async(req,res) => {
    const {number} = req.body

    const numExist = await Crediential.find({'number':number}).count()

    if(numExist >= 1){
        res.send('number exits')
    } else {
        res.send('number not registered')
    }
})

app.listen(5000, console.log('running in 5000'))