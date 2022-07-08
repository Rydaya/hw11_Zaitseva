const loginSearch = document.querySelector('.loginSearch');
const btn = document.querySelector('.btn');
const cards = document.querySelector('.cards');

const GITHUB_API_URL = 'https://api.github.com';

const findUsers = async () => {
    let userCards = Array.from(document.querySelectorAll('.card'));
    userCards.forEach(card => card.remove());

    try {
        const { value } = loginSearch;
        searchText = value.split(' ').join('');

        if (searchText === '') {
            throw new Error('Field is empty');
        }

        if (searchText.length < 4) {
            throw new Error('Too short value');
        }

        const response = await fetch(`${GITHUB_API_URL}/search/users?q=${searchText}`);
        if (!response.ok) {
            throw new Error('This user not found');
        }

        const data = await response.json();
        for (let user of data.items) {
            const card = document.createElement('div');
            card.classList.add('card');

            const Userfoto = document.createElement('img');
            Userfoto.classList.add('Userfoto');
            Userfoto.src = user.avatar_url;

            const userName = document.createElement('div');
            userName.classList.add('userName');
            userName.innerText = user.login;

            const userScore = document.createElement('div');
            userScore.classList.add('userScore');
            userScore.innerText = `User score: ${user.score}`;

            card.appendChild(Userfoto);
            card.appendChild(userName);
            card.appendChild(userScore);
            cards.appendChild(card);
        }
        console.log(data);
    } catch (error) {
        alert(error.message);
    }
}

btn.addEventListener('click', findUsers);