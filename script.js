const friendsListContainier = document.querySelector('#friends');
const friendsChoosenListContainier = document.querySelector('#friendsChoosen');
let choosenIdList = [];
const isListInLocalstorage = !!localStorage.getItem('choosenIdList');
let defaultList = {};
let friendsList = {};
let friendsChoosenList = {};
let idList = [];


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
{{#each this}}
    <div class="friend" draggable="true" data-id="{{@key}}">
        <img src="{{photo}}">
        <div class="name">{{first_name}} {{last_name}}</div>
        <div class="move-btn"></div>
    </div>
{{/each}}
`;

var templateFn = Handlebars.compile(template);

myStorage = localStorage;

if (isListInLocalstorage) {
    choosenIdList = JSON.parse(localStorage.getItem('choosenIdList'));
} else {
    localStorage.setItem('choosenIdList', []);
}

function friendsListInit(response) {
    let givenData = response.items;

    givenData.map(function(friend) {
        idList.push(friend.id);
        defaultList[friend.id] = {};
        defaultList[friend.id].name = friend.first_name + ' ' + friend.last_name;
        defaultList[friend.id].photo = friend.photo_200;

        return defaultList;
    });
    for (var key in defaultList) {
      friendsList[key] = defaultList[key];
    }
    if (isListInLocalstorage) {
        initChoosenFriendsList();
    } else {
      friendsChoosenListContainier.innerHTML = templateFn(friendsChoosenList);
    }
}

function initChoosenFriendsList() {
    friendsChoosenList = [];
    for (var key in defaultList) {
      friendsList[key] = defaultList[key];
    }

    choosenIdList.forEach(function (item, i) {
        let id = choosenIdList[i];

        friendsChoosenList[id] = defaultList[id];
        delete friendsList[id];
    });
    console.log(friendsChoosenList);

    friendsListContainier.innerHTML = templateFn(friendsList);
    friendsChoosenListContainier.innerHTML = templateFn(friendsChoosenList);
}

new Promise(resolve => window.onload = resolve)
    .then(() => vkInit())
    .then(() => vkApi('users.get', {name_case: 'gen'}))
    // .then(response => {
    //     headerInfo.textContent = `Друзья ${response[0].first_name} ${response[0].last_name}`;
    // })
    .then(() => vkApi('friends.get', {fields: 'photo_200'}))
    .then(response => friendsListInit(response))
    .then(() => initHandles())
    .catch(e => alert('Ошибка: ' + e.message));



/* D&D */
function handleDragStart(e) {
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/html', this.dataset.id);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    e.dataTransfer.dropEffect = 'copy';  // See the section on the DataTransfer object.

    return false;
}

function handleDropChoosen(e) {
    var elId = e.dataTransfer.getData('text/html');
    console.log(elId);

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    // this.innerHTML += elHtml;
    addFriend(elId);

    return false;
}

function handleDrop(e) {
    var elId = e.dataTransfer.getData('text/html');
    console.log(elId);

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    // this.innerHTML += elHtml;
    removeFriend(elId);

    return false;
}

function handleDragEndEl(e) {
    // removeFriend(elId);

    return false;
}

function initHandles() {
    let friendsList = document.querySelector('#friends').querySelectorAll('.friend');
    let addBtnList = friendsListContainier.querySelectorAll('.move-btn');
    let removeBtnList = friendsChoosenListContainier.querySelectorAll('.move-btn');

    [].forEach.call(friendsList, function(friend) {
        friend.addEventListener('dragstart', handleDragStart, false);
        friend.addEventListener('dragend', handleDragEndEl, false);
    });

    friendsChoosenListContainier.addEventListener('dragover', handleDragOver, false);
    friendsChoosenListContainier.addEventListener('drop', handleDropChoosen, false);
    friendsListContainier.addEventListener('dragover', handleDragOver, false);
    friendsListContainier.addEventListener('drop', handleDrop, false);

    [].forEach.call(addBtnList, function(moveBtn) {
      moveBtn.addEventListener('click', addBtnEvent);
    });

    [].forEach.call(removeBtnList, function(removeBtn) {
      removeBtn.addEventListener('click', deleteBtnEvent);
    });
}

function addBtnEvent() {
    console.log('add El');
    let chooseEl = this.parentNode;
    let chooseElHtml = chooseEl.outerHTML;
    let chooseElId = (chooseEl.dataset.id);
    addFriend(chooseElId);

    // localStorage.setItem('choosenIdList', JSON.stringify([110539, 272177, 518506,661817, 684192, 4422819]));
}

function deleteBtnEvent() {
    console.log('remove El');
    let deleteEl = this.parentNode;
    let deleteElId = deleteEl.dataset.id;

    removeFriend(deleteElId);

    // localStorage.setItem('choosenIdList', JSON.stringify([110539, 272177, 518506,661817, 684192, 4422819]));
}

function addFriend(chooseElId) {
    choosenIdList.push(Number(chooseElId));
    localStorage.setItem('choosenIdList', JSON.stringify(choosenIdList));

    initChoosenFriendsList();
    initHandles();
}

function removeFriend(deleteElId) {
    choosenIdList.splice(choosenIdList.indexOf(Number(deleteElId)), 1);
    localStorage.setItem('choosenIdList', JSON.stringify(choosenIdList));

    initChoosenFriendsList();
    initHandles();
}
