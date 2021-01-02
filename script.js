const btnGetUsers = document.querySelector('.btn-get-users');
const btnAddUsers = document.querySelector('.btn-submit-users');
const con = document.querySelector('.container');


function getUsers(callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://jsonplaceholder.typicode.com/users");
    xhr.addEventListener("load", () => {
        const responce = JSON.parse(xhr.responseText);
        callback(responce);
    });
    xhr.addEventListener("error", () => {
        console.log('error')
    })
    xhr.send();
}



function createUser(body, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");
    xhr.addEventListener("load", () => {
        const responce = JSON.parse(xhr.responseText);
        callback(responce);
    });

    // без этого придет только id
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")

    xhr.addEventListener("error", () => {
        console.log('error')
    })
    xhr.send(JSON.stringify(body));
}




function userTemplate(users) {
    const card = document.createElement("div");
    card.classList.add("card");
    const cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    const title = document.createElement("h5");
    title.classList.add("card-title");
    title.textContent = users.name;
    const article = document.createElement("p");
    article.classList.add("card-text");
    article.setAttribute('id', "output")
    title.addEventListener('click', function (e) {
        if (e.currentTarget) {
            function jsonToTable(json) {
                let cols = Object.keys(json[0]);
                let headerRow = cols
                    .map(col => `<th>${col}</th>`)
                    .join("");
                console.log(json)
                let rows = json
                    .filter(el => e.target.textContent === el.name)
                    .map(row => {
                        let tds = cols.map(col => `<td>${row[col]}</td>`).join("");
                        return `<tr>${tds}</tr>`;
                    })
                    .join("");
                const table = `
                                <table class='table-bordered' style="margin-left: auto; margin-right: auto">
                                    <thead>
                                            <tr style='text-align: center'>${headerRow}</tr>
                                     <thead>
                                     <tbody style='text-align: center'>
                                            ${rows}
                                     <tbody>
                                <table>`;

                return table;
            }
            e.target.innerHTML = jsonToTable(responce)
        }
    });
    title.addEventListener('mouseleave', (e) => {
        if (e.currentTarget) {
            e.currentTarget.textContent = users.name;
        }
    });
    cardBody.appendChild(title);
    cardBody.appendChild(article);
    card.appendChild(cardBody);
    return card;
}






function renderUsers(responce) {
    const fragment = document.createDocumentFragment();
    responce.forEach(u => {
        const card = userTemplate(u);
        fragment.appendChild(card);
    });
    con.appendChild(fragment);
}

// форма (form)
const form = document.forms['addUser'];
form.addEventListener('submit', onFormSubmit)
// инпуты (inputs)
const inputName = form.elements['name']
const inputEmail = form.elements['email']
const inputPhone = form.elements['phone']
const inputWebsite = form.elements['website']

function onFormSubmit(e) {
    // отменили отправку формы
    e.preventDefault();
    const nameValue = inputName.value;
    const emailValue = inputEmail.value;
    const phoneValue = inputPhone.value;
    const websiteValue = inputWebsite.value;

    //проверка, недающая отправить пустые инпуты
    // if (!nameValue || emailValue || phoneValue || websiteValue) {
    //     alert('Пожалуйта заполните все поля');
    //     return;
    // }


}



btnGetUsers.addEventListener("click", (e) => {
    getUsers(renderUsers)
})

btnAddUsers.addEventListener("click", e => {
    const newUser = {
        Name: `${form.elements['name'].value}`,
        Email: `${form.elements['email'].value}`,
        phone: `${form.elements['phone'].value}`,
        website: `${form.elements['website'].value}`
      };
    createUser(newUser, responce => {
        const card = userTemplate(responce);
        con.insertAdjacentElement("afterbegin", card);
    });
});

// const btn = document.querySelector('.btn-get-posts');
// const btnAddPost = document.querySelector('.btn-add-post');
// const container = document.querySelector('.container');

// // т.к. действие асинхронное, создаем callback
// function getPosts(callback) {
//     // некие настройки будущего запроса
//     const xhr = new XMLHttpRequest();
//     xhr.open("GET", "https://jsonplaceholder.typicode.com/posts");

//     // подписываемся на событие загрузки и получения данных от сервера     
//     xhr.addEventListener("load", () => {
//         // перевод ответа от сервера в массив
//         const responce = JSON.parse(xhr.responseText);
//         callback(responce);
//     });



//     //подписка на события Error
//     xhr.addEventListener("error", () => {
//         console.log('error')
//     })

//     // отправка запроса
//     xhr.send();
// }

// function createPost(body, callback) {
//     const xhr = new XMLHttpRequest();
//     xhr.open("POST", "https://jsonplaceholder.typicode.com/posts");     
//     xhr.addEventListener("load", () => {
//         const responce = JSON.parse(xhr.responseText);
//         callback(responce);
//     });

//     // без этого придет только id
// xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8")

//     xhr.addEventListener("error", () => {
//         console.log('error')
//     })
//     xhr.send(JSON.stringify(body));
// }

// // вынесли 'card' в отдельную функцию
// function cardTemplate(post) {
//     const card = document.createElement("div");
//     card.classList.add("card");
//     const cardBody = document.createElement("div");
//     cardBody.classList.add("card-body");
//     const title = document.createElement("h5");
//     title.classList.add("card-title");
//     title.textContent = post.title;
//     const article = document.createElement("p");
//     article.classList.add("card-text");
//     article.textContent = post.body;
//     cardBody.appendChild(title);
//     cardBody.appendChild(article);
//     card.appendChild(cardBody);
//     return card;
// }


// function renderPosts(response) {

//     const fragment = document.createDocumentFragment();
//     response.forEach(post => {
//         const card = cardTemplate(post);
//         fragment.appendChild(card);
//     });
//     container.appendChild(fragment);
// }

// // получение ответа от сервера вне функции
// // повесили обработчик событий на кнопку (при клике на которую вызовется getPosts)
// btn.addEventListener("click", (e) => {
//     getPosts(renderPosts);
// });

// btnAddPost.addEventListener("click", e => {
//     const newPost = {
//         title: 'foo',
//         body: 'bar',
//         userId: 1,
//       };
//     createPost(newPost, responce => {
//         const card = cardTemplate(responce);
//         container.insertAdjacentElement("afterbegin", card);
//     });
// });