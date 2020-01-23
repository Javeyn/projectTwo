const express = require("express");
const db = require('../models');
const router = express.Router();


  // get all highscores
  router.get('/api/highscore', (req, res) => {
    db.Account.findAll().then((data) => {
      // do something with this data??
      console.log(data);
      return res.json(data);
    })
  })

  // get user profile
  router.get('/api/account/:id', (req, res) => {
    db.Account.findOne({
      where: {
        id: req.params.id
      }
    }).then((data) => {
      return res.json(data);
    })
  })

  // post new user to db
  router.post('/api/newaccount', (req, res) => {
    db.Account.create(req.body).then((data) => {
      return res.json(data);
    })
  })

  // update user 
  router.put('/api/account/:id', (req, res) => {
    db.Account.update(
      req.body, {
        where: {
          id: req.params.id
        }
      }).then((data) => {
        return res.json(data);
      })
  })

  // delete user
  router.delete('/api/account/:id', (req, res) => {
    db.Account.destroy({
      where: {
        id: req.params.id
      }
    }).then((data) => {
      return res.json(data);
    })
  })

module.exports = router;