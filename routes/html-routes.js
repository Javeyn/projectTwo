module.exports = (app) => {

  // send homepage
  app.get('/', (req, res) => {
    res.render('index');
  })

  // send create login page
  app.get('/create', (req, res) => {
    res.render('');
  })

  // send game setup page
  app.get('/usersetup', (req, res) => {
    res.render('');
  })

  // send game
  app.get('/launch', (req, res) => {
    res.render('')
  })
}

// THESE ROUTES DO NOT WORK YET, WAITING ON HANDLEBARS PAGES