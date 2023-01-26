const express =require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const bcrypt=require('bcryptjs')
const User=require('./models/User')
const Todo=require('./models/Todo')
const cors = require('cors')
const jwt = require('jsonwebtoken')
// const {MOGOURI} = require('./config/keys')
const JWT_SECRET='fsdfkdsjfksdljfsdk'

app.use(cors())
mongoose.set('strictQuery', true);


mongoose.connect('mongodb+srv://Ramzan:oYuGxIQ5Ok4A5WCb@cluster0.edivkcm.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser:true,


 useUnifiedTopology: true}
 )


   
mongoose.connection.on('connected',()=>{
        console.log('connected to mongo yeahhh')
    })
    mongoose.connection.on('error',(err)=>{
        console.log('error',err)
    })


app.use(express.json())


app.post('/signup',async (req,res)=>{
       const {name,email,password} = req.body
       try{
     
       if(!name||!email || !password){
          return res.status(422).json({error:"plase add all the fields"})
       }
       const user = await User.findOne({email})
       if(user){
        return res.status(422).json({error:"user already exists with that email"}) 
       }
       const hashedPassword = await bcrypt.hash(password,12)
       await new User({
            name,
           email,
           password:hashedPassword
       }).save()
       res.status(200).json({message:"signup success you can login now"})
          
        }catch(err){
            console.log(err)
        }
    
    })
    
    app.post('/signin',async (req,res)=>{
       const {email,password} = req.body
       try{
     
            if(!email || !password){
                return res.status(422).json({error:"plase add all the fields"})
            }
            const user = await User.findOne({email})
            if(!user){
                return res.status(404).json({error:"user dosent exist with that email"}) 
            }
            const doMatch =  await bcrypt.compare(password,user.password)
            if(doMatch){
                   const token = jwt.sign({userId:user._id},JWT_SECRET)
                   res.status(201).json({token})
            }else{
                return res.status(401).json({error:"email or password is invalid"}) 
            }
            
        }catch(err){
            console.log(err)
        }
    
    })

    const requireLogin = (req,res,next)=>{
            const {authorization} = req.headers
            if(!authorization){
               return res.status(401).json({error:"you must be logged in"})
            }
            try{
               const {userId} =  jwt.verify(authorization,JWT_SECRET)
                req.user = userId
                next()  
            }catch(err){
                return res.status(401).json({error:"you must be logged in"})
            }
            
        }

    app.post('/createtodo',requireLogin,async(req,res)=>{
        console.log("data from router",req.body)
        const {discription,ActivityType,duration,date} = req.body
        // let result = await Todo({discription,ActivityType,duration,date})
        // let result2 = await result.save()

        const data=await new Todo({
            discription:discription,
            ActivityType:ActivityType,
            duration:duration,
            date:date,
                todoBy:req.user
            }
            ).save()
            res.status(201).json({message:data})

    //    const data=await new Todo({
    //     discription:req.body.discription,
    //     ActivityType:req.body.ActivityType,
    //     duration:req.body.duration,
    //     data:req.body.data,
    //         todoBy:req.user
    //     }
    //     ).save()
    //     res.status(201).json({message:data})
    })
    app.get('/gettodos',requireLogin,async (req,res)=>{
        const data =  await Todo.find({
            todoBy:req.user
         })
         res.status(200).json({message:data})
     })

    //  app.patch('/gettodos/:id',requireLogin,async (req,res)=>{
    //     console.log("req.body msg::",req.body)
    //     const data =  await Todo.updateOne(req.params.id, {$set: req.body},{new: true});
    //      res.status(200).json({message:data})
    //  })


     ////
     app.post('/update/:id', async (req, res) => {
        try {
            const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, {$set: req.body});
                if(updatedTodo){
                    Todo.find({},(err, result) => {
                        if(result){
                            res.status(200).json({
                                result : result
                            })
                        }
                    });
                }else{
                    return res.status(404).json({ message: 'Todo not found' });
                }
        } catch (err) {
          res.status(500).json({ message: err.message });
        }
      });
    
     
    
     
     app.delete('/remove/:id',requireLogin,async (req,res)=>{
        const removedTodo = await Todo.findOneAndRemove({_id:req.params.id})
        res.status(200).json({message:removedTodo})
     })
    
if(process.env.NODE_ENV=='production'){
    const path = require('path')

    app.get('/',(req,res)=>{
        app.use(express.static(path.resolve(__dirname,'front-end','build')))
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
    

app.listen(PORT,()=>{
    console.log('server running on |',PORT)
})
function newFunction() {
    require("donenv").config()
}

