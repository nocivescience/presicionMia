// Description: This file contains the javascript code for the game.
const padEl = document.getElementById('pad');
const joystickEl = document.getElementById('joystick');
const showConsole = false;

// Variables
let padX, padY, joyX, joyY, mouseStartX, mouseStartY;
let gameInProgress = false;
let balls= [];
balls=[
    {x: 0, y: 0, radius: 10, color: 'red', speed: 1, angle: 0},
    {x: 0, y: 0, radius: 10, color: '#22a3ff ', speed: 1, angle: 0},
].map(ball => {
    const estilosPad= getComputedStyle(padEl);
    ball.x = Math.random() * estilosPad.width.replace('px','');
    ball.y = Math.random() * estilosPad.height.replace('px','');
    ball.angle = Math.random() * 360;
    return ball;
});
console.log(balls);
if(balls.length>0){
    balls.forEach(ball => {
        const ballEl = document.createElement('div');
        ballEl.classList.add('ball-joystick');
        ballEl.style.cssText = `
            width: ${ball.radius}px;
            height: ${ball.radius}px;
            background-color: ${ball.color};
            transform: translate(${ball.x}px,${ball.y}px);
        `;
        padEl.appendChild(ballEl);
    });
}

// Functions
Math.minmax = function (value, limit) {
    return Math.max(Math.min(value, limit), -limit);
}
function movePad(x, y) {
    padEl.style.transform = `translate(${x}px,${y}px)`;
    if (showConsole) {
        console.log(`translate(${x}px,${y}px)`);
    }
}
function clickJoystick(e) {
    if (gameInProgress) {
        mouseStartX = e.clientX;
        mouseStartY = e.clientY;
        gameInProgress = true;
        if (showConsole) {
            console.log(`mousemove`);
        }
    }
};
function ballsMove() {
    balls=[
        {x: 0, y: 0, radius: 10, color: 'red', speed: 1, angle: 0},
        {x: 0, y: 0, radius: 10, color: '#22a3ff ', speed: 1, angle: 0},
    ].map(ball => {
        const estilosPad= getComputedStyle(padEl);
        ball.x = Math.random() * estilosPad.width.replace('px','');
        ball.y = Math.random() * estilosPad.height.replace('px','');
        ball.angle = Math.random() * 360;
        const ballEl = document.createElement('div');
        ballEl.classList.add('ball-joystick');
        ballEl.style.cssText = `
            width: ${ball.radius}px;
            height: ${ball.radius}px;
            background-color: ${ball.color};
            transform: translate(${ball.x}px,${ball.y}px);
        `;
        padEl.appendChild(ballEl);
        return ball;
    });
}
function moveJoystick(e) {
    if(gameInProgress){
        joyX = Math.minmax(mouseStartX - e.clientX,20);
        joyY = Math.minmax(mouseStartY - e.clientY,20);
        joystickEl.style.transform = `translate(${-joyX}px,${-joyY}px)`;
        if (showConsole) {
            console.log(`translate(${joyX}px,${joyY}px)`);
        }
    }
}
function leaveJoystick(e) {
    joystickEl.style.cssText = `
        transform: translate(0px,0px);
        animation: none;
        cursor: default;
    `;
    gameInProgress = false;
    if (showConsole) {
        console.log(`mouseup`);
    }
}
function main(){
    ballsMove();
}

// Event Listeners
joystickEl.addEventListener('mousedown', e=>{
    clickJoystick(e);  
    requestAnimationFrame(main); 
});
joystickEl.addEventListener('mouseup', (e) => {
    leaveJoystick(e);
});
joystickEl.addEventListener('mousemove', e=>{
    moveJoystick(e);
    gameInProgress = true;
});