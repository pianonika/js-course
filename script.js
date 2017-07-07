const friendsListContainier = document.querySelector('#friends');
const friendsChoosenListContainier = document.querySelector('#friendsChoosen');
let choosenIdList = [];
const isListInLocalstorage = !!localStorage.getItem('choosenIdList');
let defaultList = {};
let friendsList = {};
let friendsChoosenList = {};
let idList = [];
let searchFromFriends = document.querySelector('#searchFromFriends');
let searchFromChoosenFriends = document.querySelector('#searchFromChoosenFriends');
let safeButton = document.querySelector('#safe');


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

Handlebars.registerHelper('if', function(conditional, options) {
  if(conditional) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});

var template = `
{{#each this}}
    <div class="friend" draggable="true" data-id="{{@key}}">
        {{#if photo}}
            <img src="{{photo}}">
        {{else}}
            <img src="https://vk.com/images/deactivated_100.png">
        {{/if}}

        <div class="name">{{name}}</div>
        <div class="move-btn"></div>
    </div>
{{/each}}
`;

var templateFn = Handlebars.compile(template);

myStorage = localStorage;

if (isListInLocalstorage) {
    choosenIdList = JSON.parse(localStorage.getItem('choosenIdList'));
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
      friendsListContainier.innerHTML = templateFn(friendsList);
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

    if (searchFromFriends.value != "") {
      friendsList = filterlist(searchFromFriends.value, friendsList);
    }

    if (searchFromChoosenFriends.value != "") {
      friendsChoosenList = filterlist(searchFromChoosenFriends.value, friendsChoosenList);
    }

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
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.dataset.id);

    this.style.opacity = "0.5";
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

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    let elSelecor = '[data-id="'+ elId +'"]';
    let isInLIst = !(e.target.querySelector(elSelecor));
    if (isInLIst) {
        addFriend(elId);
    }


    return false;
}

function handleDrop(e) {
    let elId = e.dataTransfer.getData('text/html');

    if (e.stopPropagation) {
        e.stopPropagation(); // stops the browser from redirecting.
    }

    let elSelecor = '[data-id="'+ elId +'"]';
    let isInLIst = !(e.target.querySelector(elSelecor));
    if (isInLIst) {
      removeFriend(elId);
    }

    return false;
}

function handleDragEndEl(e) {
    this.style.opacity = "1";

    return false;
}

function initHandles() {
    let friendsList = friendsListContainier.querySelectorAll('.friend');
    let friendsChoosenList = friendsChoosenListContainier.querySelectorAll('.friend');
    let addBtnList = friendsListContainier.querySelectorAll('.move-btn');
    let removeBtnList = friendsChoosenListContainier.querySelectorAll('.move-btn');

    [].forEach.call(friendsList, function(friend) {
        friend.addEventListener('dragstart', handleDragStart, false);
        friend.addEventListener('dragend', handleDragEndEl, false);
    });

    [].forEach.call(friendsChoosenList, function(friend) {
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
    let chooseEl = this.parentNode;
    let chooseElId = (chooseEl.dataset.id);
    addFriend(chooseElId);
}

function deleteBtnEvent() {
    let deleteEl = this.parentNode;
    let deleteElId = deleteEl.dataset.id;

    removeFriend(deleteElId);
}

function addFriend(chooseElId) {
    choosenIdList.push(Number(chooseElId));

    initChoosenFriendsList();
    initHandles();
}

function removeFriend(deleteElId) {
    choosenIdList.splice(choosenIdList.indexOf(Number(deleteElId)), 1);

    initChoosenFriendsList();
    initHandles();
}


/* filter */
function isMatching(full, chunk) {
    var seachPatch = new RegExp(chunk, 'i');

    if (full.search(seachPatch) === -1) {
        return false;
    }

    return true;
}

searchFromFriends.addEventListener('keyup', searchEnter);
searchFromChoosenFriends.addEventListener('keyup', searchEnter);

function searchEnter(e) {
  initChoosenFriendsList();
  initHandles();
}


function filterlist(word, list) {
    let filtredList = {};

    for (var key in list) {
        let friendName = list[key].name;
        let isInList = isMatching(friendName, word);

        if (isInList) {
            filtredList[key] = list[key];
        }
      }

    return filtredList;
}

safeButton.addEventListener('click', safeChoosenFriends);

function safeChoosenFriends() {
    localStorage.setItem('choosenIdList', JSON.stringify(choosenIdList));
}
