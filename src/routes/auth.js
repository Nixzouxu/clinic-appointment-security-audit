const express = require('express');
const jwt = require('jsonwebtoken');
const prisma = require('../db');

const router = express.Router();

// VULN 2: Password disimpan plaintext, tidak di-hash
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const user = await prisma.user.create({
      data: {
        email,
        password, // SENGAJA plaintext
        role: role || 'staff'
      }
    });
    res.json(user); // SENGAJA return semua field termasuk password
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// VULN 1: SQL Injection via raw query
// VULN 2 (lanjutan): JWT tanpa expiry
// VULN 4: Tidak ada rate limiting
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // SENGAJA RENTAN - string concatenation langsung ke query
    const query = `SELECT * FROM "User" WHERE email = '${email}' AND password = '${password}'`;
    const result = await prisma.$queryRawUnsafe(query);

    if (result.length > 0) {
      const user = result[0];
      const token = jwt.sign(
        { id: user.id, role: user.role },
        process.env.JWT_SECRET
      ); // SENGAJA tanpa expiresIn
      res.json({ message: 'Login success', token, user });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;