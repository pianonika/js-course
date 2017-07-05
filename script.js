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
        <div class="add-btn">+</div>
    </div>
{{/each}}
`;
var templateFn = Handlebars.compile(template);

new Promise(resolve => window.onload = resolve)
    .then(() => vkInit())
    .then(() => vkApi('users.get', {name_case: 'gen'}))
    // .then(response => {
    //     headerInfo.textContent = `Друзья ${response[0].first_name} ${response[0].last_name}`;
    // })
    .then(() => vkApi('friends.get', {fields: 'photo_200'}))
    .then(response => friends.innerHTML = templateFn(response))
    .then(init())
    .catch(e => alert('Ошибка: ' + e.message));

function handleDragStart(e) {
    this.style.opacity = '0.4';
    console.log('handleDragStart');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
}

// function handleDragEnter(e) {
//     // this / e.target is the current hover target.
//     this.classList.remove('remove');
// }
//
// function handleDragLeave(e) {
//     this.classList.add('remove');  // this / e.target is previous target element.
// }

// var friendsList = document.querySelectorAll('#friends .friend');
//
// // [].forEach.call(friendsList, function(friend) {
// //     friend.addEventListener('dragstart', handleDragStart, false);
// //     // friend.addEventListener('dragenter', handleDragEnter, false)
// //     // friend.addEventListener('dragover', handleDragOver, false);
// //     // friend.addEventListener('dragleave', handleDragLeave, false);
// //     // friend.addEventListener('drop', handleDrop, false);
// //     // friend.addEventListener('dragend', handleDragEnd, false);
// // });


function init() {
    var friendsList = document.querySelectorAll('#friends .friend');

    [].forEach.call(friendsList, function(friend) {
        friend.addEventListener('dragstart', handleDragStart, false);
        // friend.addEventListener('dragenter', handleDragEnter, false)
        // friend.addEventListener('dragover', handleDragOver, false);
        // friend.addEventListener('dragleave', handleDragLeave, false);
        // friend.addEventListener('drop', handleDrop, false);
        // friend.addEventListener('dragend', handleDragEnd, false);
    });
    console.log('init', friendsList);
}

// document.addEventListener('DOMContentLoaded', function() {
//     console.log(document.querySelectorAll('#friends .friend'));
//     // init();
// });

function handleDragStart(e) {
  this.style.opacity = '0.4';  // this / e.target is the source node.
}

var friendsList = document.querySelectorAll('#friends .friend');
[].forEach.call(friendsList, function(friend) {
  friend.addEventListener('dragstart', handleDragStart, false);
});
