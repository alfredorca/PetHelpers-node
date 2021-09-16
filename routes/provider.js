const express = require('express')
const Provider = require('../models/Provider');
const router = express.Router();

//GET all providers
router.get('/', async (req, res) => {
  const providers = await Provider.find();
  try {
    return res.status(200).json(providers);
  } catch (error) {
    return res.status(500).json({message:'Could not get providers'})
  }
})

//GET single provider
router.get('/provider/:id', async (req, res) => {
  const {id} = req.params;
  const singleProvider = await Provider.findById(id);
  try{
    return res.status(200).json(singleProvider);
  } catch (error) {
    return res.status(500).json({message: "Could not get provider"})
  }
})

//POST provider
router.post('/provider', async (req, res) => {
  const providerToCreate = await Provider.create(req.body)
  try {
    return res.status(201).json(providerToCreate)
  } catch (error) {
    return res.status(500).json({message: "could not post provider"})
  }
})

//PUT provider
router.put('/provider/:id', async (req, res) => {
  const {id} = req.params;
  const providerToUpdate = await Provider.findByIdAndUpdate(id, req.body, {new: true});
  try {
    return res.status(202).json(providerToUpdate)
  } catch (error) {
    return res.status(500).json({message:'could not update provider'})
  }
})

//DELETE provider
router.delete('/provider/:id', async (req, res) => {
  const {id} = req.params;
  await Provider.findByIdAndDelete(id);
  try {
    return res.json({message:'Provider successfully deleted'})
  } catch (error) {
  return res.status(500).json({message: 'Provider was not deleted'})    
  }
})

module.exports = router;