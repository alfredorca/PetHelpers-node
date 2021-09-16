const express = require('express')
const Service = require('../models/Service');
const router = express.Router();

//GET all services
router.get('/', async (req, res) => {
  const services = await Service.find();
  try {
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).json({message:'Could not get services'})
  }
})

//GET single service
router.get('/service/:id', async (req, res) => {
  const {id} = req.params;
  const singleService = await Service.findById(id);
  try{
    return res.status(200).json(singleService);
  } catch (error) {
    return res.status(500).json({message: "Could not get service"})
  }
})

//POST service
router.post('/service', async (req, res) => {
  const serviceToCreate = await Service.create(req.body)
  try {
    return res.status(201).json(serviceToCreate)
  } catch (error) {
    return res.status(500).json({message: "could not post service"})
  }
})

//PUT service
router.put('/service/:id', async (req, res) => {
  const {id} = req.params;
  const serviceToUpdate = await Service.findByIdAndUpdate(id, req.body, {new: true});
  try {
    return res.status(202).json(serviceToUpdate)
  } catch (error) {
    return res.status(500).json({message:'could not update service'})
  }
})

//DELETE service
router.delete('/service/:id', async (req, res) => {
  const {id} = req.params;
  await Service.findByIdAndDelete(id);
  try {
    return res.json({message:'Service successfully deleted'})
  } catch (error) {
  return res.status(500).json({message: 'Service was not deleted'})    
  }
})

module.exports = router;