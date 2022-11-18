
// Constant and variables declearation 

// initial dirrection defined 
let inputDir = { x: 0, y: 0 };

// adding sounds
const foodSound = new Audio('./music/food.mp3');
const gameOverSound = new Audio('./music/gameover.mp3');
const moveSound = new Audio('./music/move.mp3');
const musicSound = new Audio('./music/music.mp3');
let speed = 5;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 }; // food is an object as food is an single particle and snake is array because has lot of element when he eat more food  
let score=0;

// Game Function 
function main(currentTime) {
    window.requestAnimationFrame(main);
    if ((currentTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currentTime;
    gameEngine();
}
function isCollide(snakeArr){
    // if you snake bump on its body 
    for (let index = 1; index < snakeArr.length; index++) {
        if(snakeArr[index].x===snakeArr[0].x && snakeArr[index].y===snakeArr[0].y){
            return true;
        }
    }
        // if you bump into the wall 
        if(snakeArr[0].x>=18 || snakeArr[0].x<=0 || snakeArr[0].y>=18 || snakeArr[0].y<=0){
            return true;
        }
    
}

function gameEngine() {
    // part 1  : updating the snake array that contain locataion of snake body part

    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0};
        score=0;
        speed=5;
        scoreBox.innerHTML="Score: "+score; 
        alert("Gmae Over. Press any key to play again!");
        snakeArr=[{x:13,y:15}];
        musicSound.play();
        
        
    }
    
    // if you have eaten the food ,increment the score and regenerate the food 
    if(snakeArr[0].y === food.y && snakeArr[0].x==food.x){
        foodSound.play();
        score+=1;
        if(score>hiscoreval){
            hiscoreval=score;
            localStorage.setItem("hiscore",JSON.stringify(hiscoreval));
            hiscorebox.innerHTML= "Hi Score:  "+hiscoreval;
        }
        if(score>=10){
            if(score%2==0) speed+=1;
        }
        else {
            if(score%5==0)speed+=1;
        }
        scoreBox.innerHTML="Score: "+score;
        snakeArr.unshift({x:snakeArr[0].x+inputDir.x ,y:snakeArr[0].y+inputDir.y }); // adding body part when snake eat food
        let a=2;
        let b=16;
        food= {x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}; // generating new food and generating in randow 
        

    }

    // moving the snake 

    for(let i=snakeArr.length-2;i>=0;i--){
        
        snakeArr[i+1]={...snakeArr[i]}; // we can't write it as snakearr[i+1]=snakeArr[i] because it will not work 
                                        // so here we are creating new object and putting that object in snakearr[i+1];

    }

    // updation for first element or 0th index 
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;
    // part 2  : Desplay the snake  and food

    // Display the snake
    board.innerHTML = ""; // making baard empty 
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snake');
        }

        board.appendChild(snakeElement);
    });
    // display the food 
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


// Main Logic statrs here 
// use of local storage to store high score
let hiscore=localStorage.getItem("hiscore");

if(hiscore===null){
     hiscoreval=0;
     localStorage.setItem("hiscore",JSON.stringify(hiscoreval))
}else{
    hiscoreval=JSON.parse(hiscore);
    hiscorebox.innerHTML= "Hi Score:  "+hiscore;
}
window.requestAnimationFrame(main);
// when we press any key 

window.addEventListener('keydown', e => {
    inputDir = { x:0,y:1 }; // start the game when we press any key 
    moveSound.play();
    musicSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            // moving the snake accordin the pressed key 
            inputDir.x=0;
            inputDir.y=-1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x=0;
            inputDir.y=1;
            break;
        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x=1;
            inputDir.y=0;

            break;
        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x=-1;
            inputDir.y=0;

            break;
        default:
            break;
    }
});
