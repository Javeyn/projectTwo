const express = require("express");
// const db = require('../models');
const router = express.Router();

  // send homepage
  router.get('/', (req, res) => {
    res.render('index');
  })

  // send create login page
  router.get('/create', (req, res) => {
    res.render('create');
  })

  // send game setup page
  router.get('/usersetup', (req, res) => {
    res.render('usersetup');
  })

  // send game
  router.get('/launch', (req, res) => {
    res.render('game')
  })

  module.exports = router;

// THESE ROUTES DO NOT WORK YET, WAITING ON HANDLEBARS PAGES