const express = require('express');
const prisma = require('../db');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, diagnosis, ownerId } = req.body;
    const patient = await prisma.patient.create({
      data: { name, diagnosis, ownerId: parseInt(ownerId) }
    });
    res.json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// VULN 3: IDOR - tidak ada pengecekan ownership
router.get('/:id', async (req, res) => {
  try {
    const patient = await prisma.patient.findUnique({
      where: { id: parseInt(req.params.id) }
    });
    if (!patient) return res.status(404).json({ message: 'Not found' });
    res.json(patient);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;