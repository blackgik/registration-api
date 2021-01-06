const express = require('express')
const router = new express.Router()
const User = require('../model/userModel')


// setting up the registration panel
router.post('/users', async (req, res)=> {
    const newUsers = new User(req.body)

    try{
        await newUsers.save()
        // const token = await newUsers.generateAuthToken()
        res.status(201).send(newUsers)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/users', async (req, res)=> {
    try{
        const users = await User.find({})
        res.status(404).send(users)
    }catch (e){
        res.send(e)
    }
})

module.exports = router