const express = require('express');
const router = express.Router();
const Person = require('./../models/person');

router.post('/',async (req,res)=>{
    try{
        const data = req.body;
        const newPerson = new Person(data);

        //save the person
        const response = await newPerson.save();
        console.log("NEW PERSON ADDED TO THE DATABASE (DATA SAVED)");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error While Saving Data'});
    }
});

router.get('/',async (req,res)=>{
    try{
        const data = await Person.find();
        console.log("ALL PERSON FETCHED");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Interal Server Error While Fetching'});
    }
})

router.get('/:workType', async (req,res)=>{
    try{
        const workType = req.params.workType;
        if(workType=='chef' ||workType=='manager' ||workType=='owner'){

            const response = await Person.find({work: workType});
            console.log('Work Type Fetched');
            res.status(200).json(response);
        }
        else{
            res.status(404).json({error: 'Invalid Work Type'});
        }
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Interal Server Error While Fetching'});
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const updatedPersonData = req.body;
        
        const response = await Person.findByIdAndUpdate(personId,updatedPersonData,{
            new: true,
            runValidators:true,
        });

        console.log(response);

        if(!response){
            return res.status(404).json({error: 'Person Id Not Found for Updation.'});
        }

        console.log('PERSON DATA UPDATED');
        res.status(200).json('Person data Updated');
    
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Interal Server Error While Person Updation'});  
    }

    
})

router.delete('/:id',async (req,res)=>{
    try{
        const personId = req.params.id;
        const response  = await Person.findByIdAndDelete(personId);
        
        if(!response){
            return res.status(404).json({error: 'Person Id Not Found for Deletion.'});
        }
        console.log('PERSON DATA DELETED');
        res.status(200).json('Person data DELETED');
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Interal Server Error While Person Updation'});  
    }
});

module.exports = router;