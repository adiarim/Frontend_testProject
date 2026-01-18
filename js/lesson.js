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

const somInput = document.querySelector("#som");
const usdInput = document.querySelector("#usd");
const eurInput = document.querySelector("#eur");

const converter = (element) => {
    element.oninput = async () => {
        try {
            const response = await fetch('../data/converter.json');
            
            if (!response.ok) {
                throw new Error('Ошибка загрузки курсов валют');
            }

            const data = await response.json();

            if (element.value === '') {
                somInput.value = '';
                usdInput.value = '';
                eurInput.value = '';
                return;
            }

            const val = parseFloat(element.value);

            if (element.id === 'som') {
                usdInput.value = (val / data.usd).toFixed(2);
                eurInput.value = (val / data.eur).toFixed(2);
            } else if (element.id === 'usd') { 
                somInput.value = (val * data.usd).toFixed(2);
                eurInput.value = (somInput.value / data.eur).toFixed(2);
            } else if (element.id === 'eur') {
                somInput.value = (val * data.eur).toFixed(2);
                usdInput.value = (somInput.value / data.usd).toFixed(2);
            }
        } catch (error) {
            console.error("Converter error:", error);
        }
    };
};

converter(somInput);
converter(usdInput);
converter(eurInput);

const nextBtn = document.querySelector("#btn-next");
const prevBtn = document.querySelector("#btn-prev");
const card = document.querySelector(".card");

const TODOS_API = 'https://jsonplaceholder.typicode.com/todos';
const MAX_TODOS = 200;
let todoId = 1;

const fetcherTodos = async (id) => {
    try {
        const response = await fetch(`${TODOS_API}/${id}`);
        if (!response.ok) {
            card.innerHTML = `<p style="color: red">Error: Todo not found</p>`;
            return;
        }
        const data = await response.json();
        const { id: todoIdNum, title, completed } = data;
        const color = completed ? 'green' : 'red';
        
        card.style.borderColor = color;
        card.innerHTML = `
            <p>ID: ${todoIdNum}</p>
            <p>Title -> ${title}</p>
            <p style="color: ${color}">Status -> ${completed ? 'finished' : 'pending'}</p>
        `;
    } catch (error) {
        console.error("Todos fetch error:", error);
        card.innerHTML = `<p style="color: red">Network error occurred</p>`;
    }
};

fetcherTodos(todoId);

nextBtn.onclick = () => {
    todoId = todoId >= MAX_TODOS ? 1 : todoId + 1;
    fetcherTodos(todoId);
};

prevBtn.onclick = () => {
    todoId = todoId <= 1 ? MAX_TODOS : todoId - 1;
    fetcherTodos(todoId);
};

const cityInput = document.querySelector(".cityName");
const btnSearch = document.querySelector("#search");
const cityName = document.querySelector(".city");
const tempText = document.querySelector(".temp");

const KEY = '83b3ebd39b878f8be8acd104821aa61a';
const BASE_API = 'https://api.openweathermap.org/data/2.5/weather';


const fetchWeather = async () => {
    if (cityInput.value === '') {
        cityName.innerHTML = 'Введите город'; 
        tempText.innerHTML = '';
    } else {
        try {
            const response = await fetch(`${BASE_API}?q=${cityInput.value}&units=metric&lang=ru&appid=${KEY}`);
            
            if (!response.ok) {
                cityName.innerHTML = 'Город не найден';
                tempText.innerHTML = '';
                return;
            }

            const data = await response.json(); 
            const { name, main: { temp } } = data;

            cityName.innerHTML = name;
            tempText.innerHTML = `${Math.round(temp)}°C`; 
        } catch (error) {
            console.error("Ошибка запроса:", error);
            cityName.innerHTML = 'Ошибка сети';
        }
    }
    cityInput.value = ''; 
};

btnSearch.addEventListener('click', fetchWeather);





