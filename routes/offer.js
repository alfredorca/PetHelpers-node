const express = require('express');
const Offer = require('../models/Offer');
const router = express.Router();

//GET all offers
router.get('/', async (req, res) => {
  const offers = await Offer.find()
  try {
    return res.status(200).json(offers)
  } catch (error) {
    return res.status(500).json({message:'Could not get offers'})
  }
})

//GET single offer
router.get('/offer/:id', async (req, res) => {
  const {id} = req.params;
  const singleOffer = await Offer.findById(id);
  try {
    return res.status(200).json(singleOffer);
  } catch (error) {
    return res.status(500).json({message:'Could not get offer'})
  }
})

//POST Offer 
router.post('/offer', async (req, res) => {
  const offerToRegister = await Offer.create(req.body);
  try {
    return res.status(201).json(offerToRegister);
  } catch (error) {
    return res.status(500).json({message: "Could not register offer"})
  }
})

//PUT Offer
router.put('/offer/:id', async (req, res) => {
  const {id} = req.params;
  const offerToUpdate = await Offer.findByIdAndUpdate(id, req.body, {new: true})
  try {
    return res.status(202).json(offerToUpdate);
  } catch (error){
    return res.status(500).json({message:"Could not update offer's info"})
  }
})

//DELETE Offer
router.delete('/offer/:id', async (req, res) => {
  const {id} = req.params;
  await Offer.findByIdAndDelete(id);
  try {
    return res.json({message:"Offer succesfully deleted"})
  } catch (error) {
    return res.status(500).json({message:"Could not delete offer"})
  }
})


module.exports = router;