const express = require('express');
const Pet = require('../models/Pet');
const User = require('../models/User');
const router = express.Router();

//GET all pets
router.get('/', async (req, res) => {
  const pets = await Pet.find().populate('type')
  try {
    return res.status(200).json(pets)
  } catch (error) {
    return res.status(500).json({message:'Could not get pets'})
  }
})

//GET single pet
router.get('/pet/:id', async (req, res) => {
  const {id} = req.params;
  const singlePet = await Pet.findById(id)
  try {
    return res.status(200).json(singlePet);
  } catch (error) {
    return res.status(500).json({message:'Could not get pet'})
  }
})

//POST Pet 
router.post('/pet/:userId', async (req, res) => {
  const petToRegister = await Pet.create(req.body);
  const updateUser = await User.findById(req.params.userId);
  try {
    res.status(201).json(petToRegister);
    const {_id} = petToRegister
    let previousPets = updateUser.pets;
    updateUser.pets = [...previousPets, _id];
    updateUser.save()
    return;
  } catch (error) {
    return res.status(500).json({message: "Could not register pet"})
  }
})

//PUT Pet
router.put('/pet/:id', async (req, res) => {
  const {id} = req.params;
  const petToUpdate = await Pet.findByIdAndUpdate(id, req.body, {new: true})
  try {
    return res.status(202).json(petToUpdate);
  } catch (error){
    return res.status(500).json({message:"Could not update pet's info"})
  }
})

//DELETE Pet
router.delete('/pet/:id', async (req, res) => {
  const {id} = req.params;
  await Pet.findByIdAndDelete(id);
  try {
    return res.json({message:"Pet succesfully deleted"})
  } catch (error) {
    return res.status(500).json({message:"Could not delete pet"})
  }
})

module.exports = router;