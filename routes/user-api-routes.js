const db = require('../models');

module.exports = (app) => {

  // get all highscores
  app.get('api/highscore', (req, res) => {
    db.User.findAll().then((data) => {
      // do something with this data??
      console.log(data);
      return res.json(data);
    })
  })

  // get user profile
  app.get('api/user/:id', (req, res) => {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    }).then((data) => {
      return res.json(data);
    })
  })

  // post new user to db
  app.post('api/newuser', (req, res) => {
    db.User.create(req.body).then((data) => {
      return res.json(data);
    })
  })

  // update user 
  app.put('api/user/:id', (req, res) => {
    db.User.update(
      req.body, {
        where: {
          id: req.params.id
        }
      }).then((data) => {
        return res.json(data);
      })
  })

  // delete user
  app.delete('api/user/:id', (req, res) => {
    db.User.destroy({
      where: {
        id: req.params.id
      }
    }).then((data) => {
      return res.json(data);
    })
  })
}