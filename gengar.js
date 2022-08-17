//model
let state = "stopped";
let score = 0;
let z_in = 100000;
let ranaway = 0;
let currentscore = 0;
let round = 1;
let interv = [1, 2];
let time = 12
let high_score = [{
  difficulty: Cute,
  score: 0
},{
  difficulty: Easy,
  score: 0
},{
  difficulty: Normal,
  score: 0
},{
  difficulty: Hard,
  score: 0
},{
  difficulty: Gigachad,
  score: 0
}]
//need something for timer? variable? or better way?  use setInterval() (later)

//QOL functions
function ranval(val) {
  let ranval = Math.floor(Math.random()*val);
  return ranval;
}

function timecodeid(element) {
  let time = new Date().getTime();
  element.id = time;
}

function position(element, x, y) {
  let x_ = ranval(x);
  let y_ = ranval(y);
  element.style.left = x_ + 'px';
  element.style.top = y_ + 'px';
  let pos = [x_, y_];
  return pos;
}

function arraymultiply(array, multiplier) {
  for (let i=0; i < array.length; i++) {
    array[i] = array[i]*multiplier;
  }
  return array;
}

function clear() {
  document.getElementById('playground').innerHTML = '';
  z_in = 100000;
  ranaway = 0;
  currentscore = 0;
  round = 1;
  interv = [1, 2];
  time = 12;
  score = 0;
}




//real gameplay functions
//general
function difficultyvalue() {
  let diff = document.getElementById('difficulty_setting');
  let pace = diff.value;
  return pace;
}




//spawning
function newspawn() {
  let gengar = document.createElement('img');
  gengar.src = "gengar.png";
  timecodeid(gengar);
  gengar.className = "gengar";
  let pos = position(gengar, 1160, 870, 0);
  appenditem(gengar);
  let z = z_in;
  gengar.style.zIndex = z;
  let fade = setTimeout(function () {miss(gengar)}, 3*1000);
  gengar.onclick = function () {caught(fade, gengar, pos, z)};
  z_in = z_in - 1;
}



function intervals(freq1, freq2) {
  if (round === 1) {
    let interval = setInterval(newspawn, freq1);
    setTimeout(function() {
      clearInterval(interval);
      round = round + 1;
      intervals(freq1, freq2)
      }, 5*1000);
  } else if (round === 2) {
    let interval = setInterval(newspawn, freq2);
    setTimeout(function() {
      clearInterval(interval);
    }, 5*1000);
  }

}

function spawner(difficulty) {
  let rate = arraymultiply(interv, difficulty);
  let freq1 = Math.round(5000 / rate[0]);
  let freq2 = Math.round(5000 / rate[1]);
  intervals(freq1, freq2);
}




//catch/miss
function caught(fade, gengar, pos, z) {
  clearTimeout(fade);
  pokeball = gengar;
  pokeball.src = "pokeball.png";
  pokeball.className = "pokeball";
  let newx = parseFloat(pokeball.style.left.slice(0,-2))+50;
  let newy = parseFloat(pokeball.style.top.slice(0,-2))+37.5;
  pokeball.style.left = newx + 'px';
  pokeball.style.top = newy + 'px';
  setTimeout(function() {pokeball.remove()}, 200);
  currentscore = currentscore + 1;
  score_display();
}

function miss(element) {
  element.remove(); 
  ranaway = ranaway + 1;
}













//view
function appenditem(gengar) {
  document.getElementById('playground').appendChild(gengar);
}

function catchanimation(remove, pokeball) {
  document.getElementById(remove).remove();
  document.getElementById('playground').appendChild(pokeball);
}

function remove(id) {
  document.getElementById(id).remove()
}

function score_display() {
  document.getElementById('scorevalue').innerText = currentscore;
}

function time_display() {
  let gametime = setInterval(function () {
    setTimeout(function () {clearInterval(gametime)}, 12000);
    document.getElementById('remainingtime').innerText = time;
    time = time - 1;
  }, 1000)
}

function timeout() {
  alert('your score : ' + currentscore + "\r\n" + 'missed : ' + ranaway)
}






//controller

function start() {
  clear();
  let pace = difficultyvalue();
  time_display();
  setTimeout(function () {spawner(pace)}, 1000);
  setTimeout(timeout, 15*1000);
}

