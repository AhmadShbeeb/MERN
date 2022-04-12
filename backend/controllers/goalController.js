const asyncHandler = require("express-async-handler") //instead of try catch and use error handler instead of catch
const Goal = require('../models/goalModel');

const getGoals = asyncHandler(async (req,res)=>{
    const goals = await Goal.find()
    res.status(200).json(goals)
})

// const setGoal = async (req,res,next)=>{
//     try{ //promise resolved (.then)
//         if(!req.body.text){//req.query.text //text after ?
//             res.status(400)
//             throw new Error('Please add a text field') //when throwing error in async function the promise is rejected
//         }
//         res.status(200).json({message:'set goals'})
        
//     }catch(err){ //promise rejected (.catch)
//         next(err)
//     }
// }

const setGoal = asyncHandler(async (req,res)=>{
    if(!req.body.text){//req.query.text //text after ?
        res.status(400)
        throw new Error('Please add a text field') //promise rejected (.catch) (errorMiddleware)
    }
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal) //promise resolved (.then)
})

const updateGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error ('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body,{new:true})
    res.status(200).json(updatedGoal)
    // res.status(200).json({message:`Update goal ${req.params.id}`})
})

const deleteGoal = asyncHandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error ('Goal not found')
    }
    await goal.remove()
    res.status(200).json({id: req.params.id})
    // res.status(200).json({message:`Delete goal ${req.params.id}`})
})

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
}