const express = require('express');
const router = express.Router();
const { pool } = require('../db');  
// prueba de vida
router.get('/test', (_req, res) => {
  res.json({ message: 'API esta trabajando :D!' });
});

router.post('/register', async (req, res) => {
  res.json({ message: 'User registration endpoint' });
});

router.post('/login', async (req, res) => {
  res.json({ message: 'User login endpoint' });
});



router.get('/restaurants', async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  const sql = 'SELECT * FROM foodapp.restaurants LIMIT $1 OFFSET $2';
  try {
    const result = await pool.query(sql, [limit, offset]);
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching restaurants:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/restaurants/availability', async (req, res) => {
  try {
    const disponibilidad = await pool.query ('SELECT * FROM foodapp.restaurant_availability WHERE schedule_time > NOW() AND reserved = FALSE ORDER BY schedule_time');
    res.json (disponibilidad.rows);
  } catch (err) {
    console.error('No se puede encontrar lugar en esa fecha:', err);
    res.status(500).json({ error: 'El servidor no funciona' });
  }
});

 

 router.put('/restaurants/reserve', async ( req, res) => {
  const { personName, scheduleTime, restaurantId } = req.body;

  if (!personName || !scheduleTime || !restaurantId) {
    return res.status(400).json({ error: 'se le olvido escribir algo' });
  }
  try {
    await pool.query('UPDATE foodapp.restaurant_availability SET reserved = TRUE, reserved_by = $1 WHERE schedule_time = $2 AND restaurant_id = $3', [personName, scheduleTime, restaurantId]);
    res.json({ message: 'Su reservacion se ha hecho!' });
  } catch (err) {
    console.error('Error reserving restaurant:', err);
    res.status(500).json({ error: 'El servidor no funciona' });
  }
});

module.exports = router;
