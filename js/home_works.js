const gmailInput = document.querySelector("#gmail_input");
const gmailBtn = document.querySelector("#gmail_button");
const result = document.querySelector("#gmail_result");

const regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

gmailBtn.addEventListener("click", () => {
    if(regex.test(gmailInput.value)){
        result.style.color = 'green';
        result.innerHTML = 'valid';
    } else{
        result.style.color = 'red';
        result.innerHTML = 'not valid'
    }
});

// recuestAnimationFrame //ограничение поставить
// (.style.left=${переменная}px).  

const childBlock = document.querySelector(".child_block");
const parentBlock = document.querySelector(".parent_block");

let positionX = 0;
let positionY = 0;

const width = parentBlock.clientWidth - childBlock.offsetWidth;
const height = parentBlock.clientHeight - childBlock.offsetHeight;

const moveBlock = () => {
    if(positionX < width && positionY === 0) {
        positionX++;
        childBlock.style.left = `${positionX}px`;
        requestAnimationFrame(moveBlock);
    } else if(positionX >= width && positionY < height) {
        positionY++;
        childBlock.style.top = `${positionY}px`;
        requestAnimationFrame(moveBlock);
    } else if(positionY >= height && positionX > 0) {
        positionX--;
        childBlock.style.left = `${positionX}px`;
        requestAnimationFrame(moveBlock);
    } else if(positionX <= 0 && positionY > 0) {
        positionY--;
        childBlock.style.top = `${positionY}px`;
        requestAnimationFrame(moveBlock);
    }
}

moveBlock();



const time = document.querySelector("#seconds");
const startBtn = document.querySelector("#start");
const stopBtn = document.querySelector("#stop");
const resetBtn = document.querySelector("#reset");

let interval = null;
let count = 0;

startBtn.addEventListener('click', () => {
    if(interval) return;
    interval = setInterval(() => {
        count++;
        time.innerText = count;
    }, 1000)
})

stopBtn.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
})

resetBtn.addEventListener('click', () => {
    clearInterval(interval);
    interval = null;
    count = 0;
    time.innerText = count;
})
