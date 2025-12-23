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

// recuesAnimationFrame //ограничение поставить
// (.style.left=${переменная}px).  

const childBlock = document.querySelector(".child_block");
const parentBlock = document.querySelector(".parent_block");

let position = 0;

function moveBlock() {
    if (position < parentBlock.offsetWidth - childBlock.offsetWidth) {
        position++;
        childBlock.style.left = `${position}px`;
        requestAnimationFrame(moveBlock);
    }
}

moveBlock()