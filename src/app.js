const express = require('express');
const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const prisma = require('./db');

const app = express();

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/patients', patientRoutes);

// VULN 5: Sensitive Data Exposure
app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.get('/', (req, res) => {
  res.json({ message: 'Clinic Appointment API is running' });
});

module.exports = app;