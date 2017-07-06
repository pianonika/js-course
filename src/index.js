function vkApi(method, options) {
    if (!options.v) {
        options.v = '5.64';
    }

    return new Promise((resolve, reject) => {
        VK.api(method, options, data => {
            if (data.error) {
                reject(new Error(data.error.error_msg));
            } else {
                resolve(data.response);
            }
        });
    });
}

function vkInit() {
    return new Promise((resolve, reject) => {
        VK.init({
            apiId: 5267932
        });

        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}

var template = `
{{#each items}}
    <div class="friend" draggable="true">
        <img src="{{photo_200}}">
        <div class="name">{{first_name}} {{last_name}}</div>
        <div class="move-btn"></div>
    </div>
{{/each}}
`;
var templateFn = Handlebars.compile(template);

function friendsListInit(response) {
    friendsListContainier.innerHTML = templateFn(response);
}

function vkQuery() {
    new Promise(resolve => window.onload = resolve)
        .then(() => vkInit())
        .then(() => vkApi('users.get', {name_case: 'gen'}))
        // .then(response => {
        //     headerInfo.textContent = `Друзья ${response[0].first_name} ${response[0].last_name}`;
        // })
        .then(() => vkApi('friends.get', {fields: 'photo_200'}))
        .then(response => friendsListInit(response))
        .then(() => init())
        .catch(e => alert('Ошибка: ' + e.message));
}

export {
    vkQuery
};
