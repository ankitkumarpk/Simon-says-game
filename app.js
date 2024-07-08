let gameSeq = [];
let userSeq = [];
let btns = ["yellow", "green", "red", "purple"];
let start = false;
let level = 0;
let h2 = document.querySelector("h2");

document.addEventListener("keypress", function () {
  //making sure that game can only start for one time

  if (start == false) {
    console.log("Game started");
    start = true;
    levelUp();
  }
});

//when game start click flash color
function btnFlash(btn) {
  //adding flash class in
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

//when user click flash color
function gameFlash(btn) {
  btn.classList.add("userflash");
  setTimeout(function () {
    btn.classList.remove("userflash");
  }, 250);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;
  //choosing random button when only game start for flash
  //Choosing Random index for button in button array
  let randIdx = Math.floor(Math.random() * 4);
  //choosing button in page by array randomly
  let randomColorBtn = btns[randIdx];
  //storing as veriable that choosen button class name
  let randomColor = document.querySelector(`.${randomColorBtn}`);

  //Pushing random color to game seq array
  gameSeq.push(randomColorBtn);
  console.log(gameSeq);
  btnFlash(randomColor);
}

function checkAns(indx) {
  // console.log("curr level: ",level);

  if (gameSeq[indx] === userSeq[indx]) {
    if (gameSeq.length == userSeq.length) {
      setTimeout(levelUp(), 3000);
    }
  } else {
    h2.innerText = `game over! your score ${level} \n press any key to satrt`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    resetGame();
  }
}

function btnPress() {
  let btn = this;
  gameFlash(btn);
  let btnColor = btn.getAttribute("id");
  userSeq.push(btnColor);

  checkAns(userSeq.length - 1);
}

let allBtn = document.querySelectorAll(".btn");
for (btn of allBtn) {
  btn.addEventListener("click", btnPress);
}

function resetGame() {
  gameSeq = [];
  userSeq = [];
  start = false;
  level = 0;
}
