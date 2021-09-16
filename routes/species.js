const express = require("express");
const Species = require("../models/Species");
const router = express.Router();

//GET ALL SPECIES
router.get("/", async (req, res) => {
  const species = await Species.find();
  try {
    return res.status(200).json(species);
  } catch (error) {
    return res.status(500).json({ message: "Could not get species" });
  }
});

//GET Single Species
router.get("/singlespecies/:id", async (req, res) => {
  const { id } = req.params;
  const singleSpecies = await Species.findById(id);
  try {
    return res.status(200).json(singleSpecies);
  } catch (error) {
    return res.status(500).json({ message: "Could not get single species" });
  }
});

//POST Species
router.post("/singlespecies", async (req, res) => {
  const speciesToRegister = await Species.create(req.body);
  try {
    return res.status(201).json(speciesToRegister);
  } catch (error) {
    return res.status(500).json({ message: "Could not register new species" });
  }
});

//PUT Species
router.put("/singlespecies/:id", async (req, res) => {
  const { id } = req.params;
  const speciesToUpdate = await Species.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  try {
    return res.status(202).json(speciesToUpdate);
  } catch (error) {
    return res.status(500).json({ message: "Could not update the species" });
  }
});

//DELETE Species
router.delete("/singlespecies/:id", async (req, res) => {
  const { id } = req.params;
  await Species.findByIdAndDelete(id);
  try {
    return res.json({ message: "Single Species successfully deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Could not delete Single Species" });
  }
});

module.exports = router;
