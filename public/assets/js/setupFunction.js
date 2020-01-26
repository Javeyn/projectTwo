
let boom = {};
boom.launchBtn = launchBtn;
boom.songSelection = songSelection;
boom.shipSelection = shipSelection;
boom.modeSelection = modeSelection;

let launchBtn = $('#launchgame');


function songSelection() {
  launchBtn.click(() => {
    return $('input[name="song"]:checked').id;
  })
}

function shipSelection() {
  launchBtn.click(() => {
    return $('input[name="ship"]:checked').id;
  })
}

function modeSelection() {
  launchBtn.click(() => {
    return $('input[name="mode"]:checked').id;
  })
}

module.exports = boom;






