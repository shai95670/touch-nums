'use strict'
var gSequenceNums
var level
var timerInterval

var gNextNum;

function getLevel(numCount) {
  gNextNum = 1
  level = numCount
  gSequenceNums = getSeqNums(level)
  cleanWinnerBanner()
  shuffle(gSequenceNums)
  renderBoard()
}

function getSeqNums(level) {
  var nums = []
  for (let index = 1; index <= level; index++) {
    nums.push(index)
  }
  return nums
}

function getNum(nums) {
  return nums.pop()
}

function renderWinBanner(){
  var winnerContainer = document.querySelector('.winner-banner');
  winnerContainer.innerHTML += `<img style='border:2px solid black;
                                            width:300px'
                                     src='img/winner.jpg'>`
}

function cleanWinnerBanner(){
  var winnerContainer = document.querySelector('.winner-banner');
  winnerContainer.innerHTML = ``
}

function renderCurrentNum(){
  var spanEl = document.querySelector('.current-number')
  spanEl.innerText = 'Current Number: ' + gNextNum
}

function cellClicked(cellEl) {
  var cellNum = +cellEl.innerText
  renderCurrentNum()
  if (gNextNum === 1) runTimer()
  if (gNextNum === level) {
    resetGame()
    renderWinBanner()
  }
  if (cellNum === gNextNum) {
    cellEl.style.backgroundColor = 'red'
    gNextNum++
  }
}

function resetGame() {
  var timer = document.querySelector('.timer')
  var tBodyEl = document.querySelector('.table tbody')
  clearInterval(timerInterval)
  timer.innerText = 'Timer:0'
  tBodyEl.innerHTML = ''
}

function renderBoard() {
  var htmlStr = ''
  var boardLen = Math.sqrt(gSequenceNums.length)
  for (let row = 0; row < boardLen; row++) {
    htmlStr += `<tr>`
    for (let col = 0; col < boardLen; col++) {
      htmlStr += `
      <td class='td-color'
       onclick=cellClicked(this)>
       ${getNum(gSequenceNums)}
      </td>`
    }
    htmlStr += `</tr>`
  }
  var tBodyEl = document.querySelector('.table tbody')
  tBodyEl.innerHTML = htmlStr
}

function shuffle(a) {
  var j, x, i
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1))
    x = a[i]
    a[i] = a[j]
    a[j] = x
  }
}

function runTimer() {
  var time = 0
  var timerEl = document.querySelector('.timer')
  console.log(timerEl)
  timerInterval = setInterval(function () {
    time++
    timerEl.innerText = 'Timer: ' + time
  }, 1000)
}
