const db = require('../models');

module.exports = (app) => {

  // get all highscores
  app.get('/api/highscore', (req, res) => {
    db.Account.findAll().then((data) => {
      // do something with this data??
      console.log(data);
      return res.json(data);
    })
  })

  // get user profile
  app.get('/api/account/:id', (req, res) => {
    db.Account.findOne({
      where: {
        id: req.params.id
      }
    }).then((data) => {
      return res.json(data);
    })
  })

  // post new user to db
  app.post('/api/newaccount', (req, res) => {
    db.Account.create(req.body).then((data) => {
      return res.json(data);
    })
  })

  // update user 
  app.put('/api/account/:id', (req, res) => {
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
  app.delete('/api/account/:id', (req, res) => {
    db.Account.destroy({
      where: {
        id: req.params.id
      }
    }).then((data) => {
      return res.json(data);
    })
  })
}