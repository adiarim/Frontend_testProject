const tabBlocks = document.querySelectorAll('.tab_content_block');
const tabs = document.querySelectorAll('.tab_content_item');
const tabsParent = document.querySelector('.tab_content_items');

let currentIndex = 0;

const hideBlocks = () => {
    tabBlocks.forEach((item) => {
        item.style.display = 'none'
    })
    tabs.forEach((item) => {
      item.classList.remove('tab_content_item_active')
    })
}

const showBlock = (index = 0) => {
    tabBlocks[index].style.display = 'block';
    tabs[index].classList.add('tab_content_item_active')
}

hideBlocks();
showBlock(currentIndex);

setInterval(() => {
    currentIndex++;
    if(currentIndex >= tabBlocks.length) {
        currentIndex = 0;
    }
    hideBlocks();
    showBlock(currentIndex);
}, 5000);

hideBlocks();
showBlock(currentIndex);

tabsParent.addEventListener('click', (event) => {
    tabs.forEach((item, index) => {
        if (event.target === item) {
            hideBlocks();
            showBlock(currentIndex);
        }
    });
});


console.log(tabs);


const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal_close');
const openModal = document.querySelector('#btn-get')

function showModal() {
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
});

modal.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
});

// scrollY — сколько прокрутили сверху
// clientHeight — высота видимой области
// scrollHeight — вся высота страницы
// Когда сумма ≥ всей высоты — пользователь внизу

function showModalScroll() {
    if (window.scrollY + document.documentElement.clientHeight >=
        document.documentElement.scrollHeight) { //Проверка «дошёл ли до низа»

            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; 

            window.removeEventListener('scroll', showModalScroll);
        }
}

window.addEventListener('scroll', showModalScroll);

const modalTime = setTimeout(showModal, 10000);
//вызывать модалку через 10 секунд

const som = document.querySelector("#som");
const usd = document.querySelector("#usd");

// som.oninput = () => {
//     const requester = new XMLHttpRequest();
//     requester.open('GET', '../data/converter.json');
//     requester.setRequestHeader('Content-Type', 'application/json');
//     requester.send();

//     requester.onload = () => {
//         const data = JSON.parse(requester.response);
//         console.log(data);
//         usd.value = (som.value / usd.value).toFixed(2);
//     }
// }

// usd.oninput = () => {
//     const requester = new XMLHttpRequest();
//     requester.open('GET', '../data/converter.json');
//     requester.setRequestHeader('Content-Type', 'application/json');
//     requester.send();

//     requester.onload = () => {
//         const data = JSON.parse(requester.response);
//         console.log(data);
//         usd.value = (som.value * usd.value).toFixed(2);
//     }
// }

const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

const converter = (element) => {
   element.oninput = () => {
    const requester = new XMLHttpRequest();
        requester.open('GET', '../data/converter.json');
        requester.setRequestHeader('Content-Type', 'application/json');
        requester.send();

        requester.onload = () => {
            const data = JSON.parse(requester.response);

            if (element.value === '') {
                somInput.value = '';
                usdInput.value = '';
                eurInput.value = '';
                return;
            }

            if (element.id === 'som') {
                usdInput.value = (element.value / data.usd).toFixed(2);
                eurInput.value = (element.value / data.eur).toFixed(2);
            } else if (element.id === 'uds') {
                somInput.value = (element.value * data.usd).toFixed(2);
                eurInput.value = (somInput.value / data.eur).toFixed(2);
            } else if (element.id === 'eur') {
                somInput.value = (element.value * data.eur).toFixed(2);
                usdInput.value = (somInput.value / data.usd).toFixed(2);
            }
        }
   }
}

converter(somInput)
converter(usdInput)
converter(eurInput)