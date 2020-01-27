const express = require("express");
const db = require('../models');
const router = express.Router();

// get all scores
router.get('/api/newscore', (req, res) => {
    db.Highscore.findAll().then((data) => {
      return res.json(data);
    })
})

router.post('/api/newscore', (req, res) => {
    db.Highscore.create(req.body).then((data) => {
        return res.json(data);
    });
});

module.exports = router;