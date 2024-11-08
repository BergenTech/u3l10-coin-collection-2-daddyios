let playerX, playerY;
let coinX, coinY;
let obstacleX, obstacleY;
let score = 0;
let gameOver = false;
let speed = 1
let hits = 0
function setup() {
  createCanvas(400, 400);
  initializeGame();
}

function initializeGame() {
  // Initialize player position (bottom center)
  playerX = width/2;
  playerY = height - 20;
  
  // Initialize coin position
  newCoin();
  
  // Initialize obstacle position
  obstacleX = random(20, width-20);
  obstacleY = 0;
}

function draw() {
  background(220);
  
  if (gameOver) {
    displayGameOver();
  } else {
    // Draw game elements
    drawPlayer();
    drawCoin();
    drawObstacle();
    
    // Handle movement
    movePlayer();
    moveObstacle();
    
    // Check for collisions
    checkCoinCollection();
    checkCollisions();
    
    // Display game stats
    displayStats();
  }
  if(hits==3){
    gameOver=true
  }
}

function drawPlayer() {
  fill(0, 0, 255);  // Blue player
  circle(playerX, playerY, 20);
}

function drawCoin() {
  fill(255, 255, 0);  // Yellow coin
  circle(coinX, coinY, 10);
  
}

function drawObstacle() {
  fill(255, 0, 0);  // Red obstacle
  rect(obstacleX, obstacleY, 20, 20);
}

// Basic left/right movement provided
function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    playerX -= 5;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    playerX += 5;
  }
  if (keyIsDown(UP_ARROW)) {
    playerY -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    playerY += 5;
  }
  
  // TODO: Add up/down movement
  // HINT: Use UP_ARROW and DOWN_ARROW keys
  // Movement should be 5 pixels per frame
  
  // TODO: Add boundary checking
  // HINT: Keep player within canvas bounds
  // Check against 0, width, and height
}

function moveObstacle() {
  obstacleY+=speed
  if(obstacleY>height){
    obstacleY=0
    obstacleX = random(20, width-20);
  }
}

function checkCoinCollection() {
  if (dist(coinX,coinY,playerX,playerY)<12){
    resetGame()
    score++
  }
}

function checkCollisions() {
  // TODO: Check if player hits obstacle
  // HINT: Similar to coin collection
  // If hit (distance < 20):
  //   - Increase hits
  //   - Check for game over (hits >= 3)
  //   - Reset positions
  if(dist(playerX,playerY,obstacleX,obstacleY)<30){
    resetGame()
    hits++
  }
}

function displayStats() {
  fill(0);
  textSize(16);
  text("Score: " + score, 50, 20);
  text("Hits: " + hits, 200, 20);
  text("Speed: " + speed, 300, 20);
  // TODO: Add display for hits and speed
}
function displayGameOver() {
  // TODO: Show game over screen
  // HINT: Use textAlign(CENTER, CENTER)
  // Show:
  //   - "Game Over" message
  //   - Final score
  //   - "Press R to Restart"
  textSize(40)
  textAlign(CENTER)
  text('GAME OVER',width/2,200)
  textSize(20)
  text(`Score: ${score}`,width/2,250)
  text(`Press R to restart`,width/2,300)

}
function newCoin() {
  // Generate random position for coin
  coinX = random(20, width-20);
  coinY = random(20, height-20);
}
function resetGame() {
  // TODO: Reset all game variables
  // HINT: Reset score, hits, speed
  // Set gameOver to false
  // Call initializeGame()
  playerX = width/2
    playerY = height-20
    obstacleY=0
    obstacleX = random(20, width-20);
    speed++
    coinX = random(0,400)
    coinY = random(0,400)
}
function keyPressed() {
  // TODO: Check for 'R' key to restart game
  // HINT: Use key === 'r' || key === 'R'
  // Only works when game is over
  if(gameOver){
    
    if(key=='r'){
      resetGame()
      draw()
      gameOver=false
      console.log(gameOver)
      hits = 0
      score=0
      speed=1
  }
}
}

// Helper function you might need
function distance(x1, y1, x2, y2) {
  return dist(x1, y1, x2, y2);
}