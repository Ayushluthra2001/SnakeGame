// Constant and variables declearation 

// initial dirrection defined 
let direction={x:0,y:0};

// adding sounds
const foodSound=new Audio('food.mp3');
const gameOverSound= new Audio('gameover.mp3');
const moveSoun=new Audio('move.mp3');
const musicSound= new Audio('music.mp3');



// Game Function 
function main(currentTime){
    window.requestAnimationFrame(main);    
}



// Main Logic statrs here 
window.requestAnimationFrame(main);