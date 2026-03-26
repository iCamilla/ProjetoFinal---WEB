let banner = document.getElementById('banner');
let modeBtn = document.getElementById("modeBtn");
let imgBtn = document.getElementById("imgBtn");
let hobbyBtn = document.getElementById("hobbyBtn");
let myList = document.getElementById("myList");
let myBTN = document.getElementById('color');
let mybackground = document.getElementById('mybackground');
let myName = document.getElementById('myName');
let myDescription = document.getElementById('myDescription');
let catApiBtn = document.getElementById('catApiBtn');
let dogApiBtn = document.getElementById('dogApiBtn');
let birdApiBtn = document.getElementById('birdApiBtn');
let profileForm = document.getElementById('profileForm');
let counterDisplay = document.getElementById('counterDisplay');
let submitBtn = document.getElementById('SubmitBtn');
let resetBtn = document.getElementById('resetBtn');
let allBtn = document.querySelectorAll('.someBtn');
let myTitle = document.querySelector('.navbar-brand');



function getRandomRgbColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function changeDarkMode() {
    const myBody = document.querySelector('body');
    if (myBody.classList.contains('bg-light', 'text-dark')) {
        myBody.classList.remove('bg-light', 'text-dark');
        myBody.classList.add('bg-dark', 'text-light');
        myTitle.style.color = 'rgb(205, 134, 223)';
        for (let btn of allBtn) {
            btn.classList.remove('btn', 'btn-outline-dark');
            btn.classList.add('btn', 'btn-outline-light');
        }
    } else {
        myBody.classList.remove('bg-dark', 'text-light');
        myBody.classList.add('bg-light', 'text-dark');
        myTitle.style.color = 'black';
        for (let btn of allBtn) {
            btn.classList.remove('btn', 'btn-outline-light');
            btn.classList.add('btn', 'btn-outline-dark');
        }
    }
}

function changeImg() {
    if (banner.getAttribute('src') == "images/imagePrincipal.jpg") {
        banner.setAttribute('src', "images/SecondImage.jpg");
    } else {
        banner.setAttribute('src', "images/imagePrincipal.jpg");
    }
}

function addHobby() {
    let newHobby = prompt("Qual hobby quer adicionar?");
    let newHobbyItem = document.createElement('li');
    newHobbyItem.innerText = newHobby;

    myList.appendChild(newHobbyItem);
}

function changeBackground() {
    let color = getRandomRgbColor()
    mybackground.style.backgroundColor = color;
}

document.addEventListener('keydown', function (event) {
    if (event.key == 'Enter') {
        alert('Tem a certeza que acabou o exercício?');
    }
})


submitBtn.addEventListener('click', function (event) {
    event.preventDefault();

    let data = new FormData(profileForm);

    let nome = data.get('nome');
    let frase = data.get('frase');
    let cor = data.get('cor');
    let foto = data.get('foto');

    myName.innerText = nome;
    myDescription.innerText = frase;
    banner.src = foto;
    mybackground.style.backgroundColor = cor;

    count = parseInt(localStorage.getItem('profileCount') || 0) + 1;
    localStorage.setItem('profileCount', count);
    counterDisplay.innerText = `Perfil atualizado ${count} vezes`;
});

catApiBtn.addEventListener('click', function () {
    fetch("https://api.thecatapi.com/v1/images/search?mime_types=gif", {
        headers: {
            "x-api-key": "live_lFANglZUWUEWYaAtRM1rDsryK86BNXEgqsJlSyors63NqzlxXSztVCLKuhkNYIwP"
        }
    })
        .then((response) => response.json())
        .then((data) => {
            let catContainer = document.getElementById("catContainer");
            catContainer.innerHTML = "";

            const img = document.createElement("img");
            img.src = data[0].url; // Verificar se posso fazer assim
            catContainer.appendChild(img);
        });
});

dogApiBtn.addEventListener('click', function () {
    fetch("https://api.thedogapi.com/v1/images/search?limit=2")
        .then((response) => response.json())
        .then((data) => {
            let dogContainer = document.getElementById("dogContainer");
            dogContainer.innerHTML = "";

            const img = document.createElement("img");
            img.src = data[0].url; // Verificar se posso fazer assim
            dogContainer.appendChild(img);
        });
});

birdApiBtn.addEventListener('click', function () {
    fetch('https://api.api-ninjas.com/v1/randomimage', {
        headers: {
            'X-Api-Key': 'wUlHNjvLcsFLfSfK1LHuPxuV2Ec5MOFYCBOpS0Fv',
            'Accept': 'image/jpg'
        }
    })
        .then(response => response.blob())
        .then(blob => {

            let birdContainer = document.getElementById("birdContainer");
            birdContainer.innerHTML = "";
            const img = document.createElement('img');

            img.src = URL.createObjectURL(blob);
            birdContainer.appendChild(img);
        })
});
modeBtn.addEventListener('click', changeDarkMode);
imgBtn.addEventListener('click', changeImg);
hobbyBtn.addEventListener('click', addHobby);
myBTN.addEventListener('click', changeBackground);

let count = localStorage.getItem('profileCount') || 0;
counterDisplay.innerText = `Profile updated ${count} times`;


resetBtn.addEventListener('click', function () {
    myName.innerText = 'Portfoli-Oh!';
    myDescription.innerText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et, laboriosam exercitationem nemo laborum dolorem voluptates corrupti esse cum doloremque error facilis molestiae soluta consectetur ducimus deserunt, ad odio, accusamus non.';
    banner.src = 'images/imagePrincipal.jpg';
    mybackground.style.backgroundColor = '';

    myList.innerHTML = `
        <li>SQL</li>
        <li>Programação WEB</li>
        <li>Desenvolvimento de Software</li>
    `;

    profileForm.reset();

    document.body.classList.remove('bg-dark', 'text-light');
    document.body.classList.add('bg-light', 'text-dark');
    imgBtn.classList.remove('btn', 'btn-outline-light');
    imgBtn.classList.add('btn', 'btn-outline-dark');
    modeBtn.classList.remove('btn', 'btn-outline-light');
    modeBtn.classList.add('btn', 'btn-outline-dark');
    hobbyBtn.classList.remove('btn', 'btn-outline-light');
    hobbyBtn.classList.add('btn', 'btn-outline-dark');
    submitBtn.classList.remove('btn', 'btn-outline-light');
    submitBtn.classList.add('btn', 'btn-outline-dark');

    localStorage.setItem('profileCount', 0);
    count = 0;
    counterDisplay.innerText = 'Profile updated 0 times';
});

