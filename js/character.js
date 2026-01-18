const characterList = document.querySelector('.characters-list');
const POSTS_API = 'https://jsonplaceholder.typicode.com/posts';
const defaultImage = "https://i.pinimg.com/736x/2f/15/f2/2f15f2e8c688b3120d3d26467b06330c.jpg";

const getData = async () => {
    try {
        const response = await fetch(POSTS_API);
        const data = await response.json();

        characterList.innerHTML = "";

        data.slice(0, 20).forEach(post => { 
            const userBlock = document.createElement('div');
            userBlock.classList.add('post-card');
            
            userBlock.innerHTML = `
                <img src="${defaultImage}" alt="post cover">
                <div class="post-content">
                    <h3>${post.title}</h3>
                    <p>${post.body}</p>
                </div>
            `;

            characterList.append(userBlock);
        });

    } catch (error) {
        console.error('Произошла ошибка:', error.message);
        characterList.innerHTML = `<p style="color: red; text-align: center;">Не удалось загрузить посты. Проверьте соединение.</p>`;
    }
};

getData();