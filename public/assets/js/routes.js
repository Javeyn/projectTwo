console.log('frontend routes linked');
$(function () {

  // redirect to 'create account' page  
  $('#createaccount').click(() => {
    $(location).attr('href', './create');
  })

  // get user info and add account to db
  $('#create').click(() => {
    let name = $('.name').val();
    let password = $('.password').val();
    let confirm = $('.confirm').val();

    if (password !== confirm) {
      alert('passwords must match');
    } else {

      let newAccount = {
        name,
        password
      }

      $.ajax('/api/newaccount', {
        type: 'POST',
        data: newAccount
      }).then(() => {
        console.log('new account added');
        $(location).attr('href', './');
      })
    }
  })

  $('#exit').click(() => {
    $(location).attr('href', '/');
  })

  $('#logout').click(() => {
    $(location).attr('href', '/');
  })

  $('#login').click(() => {
    let name = $('.username').val().trim();
    let pass = $('.password').val().trim();
    let query = `/api/account/${name}`;

    let pwObj = {
      name, 
      pass
    }

    $.ajax(query, {
      type: 'POST',
      data: pwObj
    }).then((stuff) => {
      if(stuff === 'OK') {
        $(location).attr('href', `./usersetup?name=${name}`)
      } else {
        alert('incorrect login information');
      }
    })
  })

  $('#launchgame').click(() => {
    var audio = new Audio('../sounds/drunken.mp3');
    audio.play();
    $(location).attr('href', '/launch');
  });

})