// const startBtn = document.querySelector('.flappyBird .startBtn');
const startMsg = document.querySelector('.flappyBird p');
const exitBtn = document.querySelector('.flappyBird .exitBtn');

//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//bird
let birdWidth = 34; //width/height ratio = 408/228 = 17/12
let birdHeight = 34;
let birdX = boardWidth/8;
let birdY = boardHeight/2;
let birdImg;

let bird = {
   x : birdX,
   y : birdY,
   width : birdWidth,
   height : birdHeight
}

//pipes
let pipeArray = [];
let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardWidth;
let pipeY = 0;

let topPipeImg;
let bottomPipeImg;

//physics
let velocityX = -2; //장애물이 움직이는 속도
let velocityY = 0; //새가 점프하는 속도
let gravity = 0.4;

let gameOver = false;
let score = 0;

window.onload = function(){
   board = document.querySelector("#flappyGame");
   context = board.getContext("2d"); //used for drawing on the board

   //draw flappy bird
   // context.fillStyle = "green";
   // context.fillRect(bird.x, bird.y, bird.width, bird.height);

   //load images
   birdImg = new Image();
   birdImg.src = "./img/flappybird.png";
   birdImg.onload = function() {
      context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);
   }

   topPipeImg = new Image();
   topPipeImg.src = "./img/toppipe.png";

   bottomPipeImg = new Image();
   bottomPipeImg.src = "./img/bottompipe.png";

   requestAnimationFrame(update);
   setInterval(placePipes, 1500); //every 1.5 seconds
   document.addEventListener("keydown", moveBird);
}

function update() {
   requestAnimationFrame(update);
   if (gameOver) {
      return;
   }
   context.clearRect(0, 0, board.width, board.height);

   //bird
   velocityY += gravity;
   // bird.y += velocityY;
   bird.y = Math.max(bird.y + velocityY, 0); //새가 캔버스 상단에 위치하지 못하도록
   context.drawImage(birdImg, bird.x, bird.y, bird.width, bird.height);

   if (bird.y > board.height) { //새가 바닥에 떨어졌을 때
      gameOver = true;
   }

   //pipes
   pipeArray.forEach(pipe =>{
      pipe.x += velocityX;
      context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);

      if (!pipe.passed && bird.x > pipe.x + pipe.width) {
            score += 0.5; //파이프가 위아래로 하나씩이기 때문에 0.5
            pipe.passed = true; //파이프 하나당 0.5씩만 더하게 하기 위함
      }

      if (detectCollision(bird, pipe)) {
            gameOver = true;
      }
   }
)

    //가장 첫번째에 있는 파이프가 canvas사이즈를 벗어나면 없애기
   while (pipeArray.length > 0 && pipeArray[0].x < -pipeWidth) {
      pipeArray.shift();
   }

   //점수 표시
   context.fillStyle = "white";
   context.font="25px sans-serif";
   context.fillText(`점수 : ${score}`, 10, 35);

   if (gameOver) { //게임오버 시 메세지와 종료버튼 출력
      startMsg.style.display='block';
      exitBtn.style.display='block';
   }
}

function placePipes() {
   if (gameOver) {
      return;
   }

   //파이프의 높이를 랜덤으로 하기 위함
   //            파이프 높이  최대 내려오는 길이  줄어드는 정도(랜덤)
   let randomPipeY = pipeY - pipeHeight/4 - Math.random()*(pipeHeight/2);
   //위 파이프와 아래 파이프간의 간격
   let openingSpace = board.height/4;

   let topPipe = {
      img : topPipeImg,
      x : pipeX,
      y : randomPipeY,
      width : pipeWidth,
      height : pipeHeight,
      passed : false
   }
   pipeArray.push(topPipe);

   let bottomPipe = {
      img : bottomPipeImg,
      x : pipeX,
      y : randomPipeY + pipeHeight + openingSpace,
      width : pipeWidth,
      height : pipeHeight,
      passed : false
   }
   pipeArray.push(bottomPipe);
}

function moveBird(e) {
   startMsg.style.display='none';
   exitBtn.style.display='none';
   if (e.code == "KeyZ") {
      //점프할 때 y가 -6
      velocityY = -6;

      //게임 리셋
      if (gameOver) {
         bird.y = birdY;
         pipeArray = [];
         score = 0;
         gameOver = false;
      }
   }
}

function detectCollision(a, b) { //새와 장애물이 충돌했을 때
   return a.x < b.x + b.width &&   
         a.x + a.width > b.x &&   
         a.y < b.y + b.height &&  
         a.y + a.height > b.y;   
}