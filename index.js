/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37
const RIGHT_ARROW = 39
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // FIXME: The DODGER is 40 pixels wide -- how do we get the right edge?
    const dodgerRightEdge = 0;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = 0;

    if (false /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge.
               */) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`
  rock.style.top = 0
  
  GAME.appendChild(rock)
  
  function moveRock() {
    
    if (checkCollision(rock)) {
      endGame()
    }
    if (positionToInteger(rock.style.top) > GAME_HEIGHT) {GAME.removeChild(rock); return}
    
    rock.style.top = `${positionToInteger(rock.style.top) + 2}px`
    window.requestAnimationFrame(moveRock)
     
     
  }
  window.requestAnimationFrame(moveRock)
  ROCKS.push(rock)

  return rock
}

function endGame() {
  clearInterval(gameInterval)
  
  ROCKS.forEach((rock) => {
    rock.remove()
  })
  
  window.removeEventListener('keydown', moveDodger)
  
  alert("YOU LOSE!")
  
}

function moveDodger(e) {
  if (e.which === LEFT_ARROW) {moveDodgerLeft()}
  if (e.which === RIGHT_ARROW) {moveDodgerRight()}
}

function moveDodgerLeft() {
  let position = positionToInteger(DODGER.style.left)
  if (position > 0) {
    window.requestAnimationFrame(() => {
      DODGER.style.left = `${position - 4}px`})
   }
}

function moveDodgerRight() {
  let position = positionToInteger(DODGER.style.left)
  if (position + 40 < GAME_WIDTH) {
     window.requestAnimationFrame(() => {
       DODGER.style.left = `${position + 4}px`
     })
   }
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
