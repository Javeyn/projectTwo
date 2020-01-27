const express = require("express");
const db = require('../models');
const router = express.Router();

// get all scores
router.get('/api/newscore', (req, res) => {
    var query = {};
    if (req.query.account_id){
        query.AccountId = req.query.account_id;
    }
    db.Highscore.findAll({
        where: query,
        include: [db.Account]
    }).then((data) => {
      return res.json(data);
    })
})

router.get("/api/newscore/:id", function(req, res) {
    db.Highscore.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Account]
    }).then(function(data) {
      res.json(data);
    });
});

router.post('/api/newscore', (req, res) => {
    // req.body.AccountId = req.session.user.id;
    req.body.AccountId = 1;
    db.Highscore.create(req.body).then((data) => {
        return res.json(data);
    });
});

module.exports = router;