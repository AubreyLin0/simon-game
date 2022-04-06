var btnList = []
var i = 0
var isGameOver = true

$(document).keypress(function () {
  if (isGameOver == true) {
    //restart
    while (btnList.length > 0) {
      btnList.pop()
    }
    i = 0
    $('h1').text('Level 1')
    gameStart()
    isGameOver = false
  }
})

$('.btn').click(function () {
  var clickNum = parseInt($(this).text())
  var clickMusic = $(this).attr('id')
  playSound(clickMusic)
  $(this).addClass('pressed')
  setTimeout(() => {
    $(this).removeClass('pressed')
  }, 100)
  setTimeout(() => {
    if (btnList[i] == clickNum) {
      //check the button clicked is the correct button
      i += 1
      if (i >= btnList.length) {
        //stage clear
        gameStart()
        i = 0
      }
    }
  }, 500)
  if (btnList[i] != clickNum) {
    gameOver()
  }
})

function gameStart () {
  var randomNum = Math.floor(Math.random() * 4)
  $('h1').text('Level ' + (i + 1))
  $('.btn').css('cursor', 'pointer')
  if (randomNum == 1) {
    animate('green')
    playSound('green')
    btnList.push(1)
  } else if (randomNum == 2) {
    animate('red')
    playSound('red')
    btnList.push(2)
  } else if (randomNum == 3) {
    animate('yellow')
    playSound('yellow')
    btnList.push(3)
  } else {
    animate('blue')
    playSound('blue')
    btnList.push(4)
  }
}

function gameOver () {
  isGameOver = true
  $('h1').html('Game Over!</br>Press any key to restart.')
  $('body').addClass('game-over')
  setTimeout(() => {
    $('body').removeClass('game-over')
  }, 200)
  playSound('wrong')
}

function playSound (name) {
  var audio = new Audio('sounds/' + name + '.mp3')
  audio.play()
}

function animate (color) {
  $('.' + color).fadeOut(300)
  setTimeout(function () {
    $('.' + color).fadeIn(0)
  })
}
