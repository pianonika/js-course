/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');
let cookiesList = [];

function isMatching(full, chunk) {
    var seachPatch = new RegExp(chunk, 'i');

    if (full.search(seachPatch) === -1) {
        return false;
    }

    return true;
}

function createCookie(name, value) {
    document.cookie = name + '=' + value;
}

function deleteCookie(cookieName) {
    var date = new Date(0);
    document.cookie = '' + cookieName + '=; path=/; expires=' + date.toUTCString();
}

function sortList(filterValue) {
    if (cookiesList != []) {
        var cookieTable= '';
        var cookiesListCurrent= [];

        listTable.innerHTML = '';

        for (var key in cookiesList) {
            var coockieEl = cookiesList[key];
            var cookieName = coockieEl.name;
            var cookieValue = coockieEl.value;

            if (isMatching(cookieName, filterValue) || isMatching(cookieValue, filterValue)) {
                cookieTable += '<tr><td>' + cookieName + '</td><td>' + cookieValue +
                '</td><td><button class="button elId' + key + '">X</button></td></tr>';
                cookiesListCurrent.push(coockieEl);
            }
        }
        listTable.innerHTML = cookieTable;
    }
}

function sortList2(filterValue) {
    if (cookiesList != []) {
        var cookieTable= '';
        var cookiesListCurrent= [];

        listTable.innerHTML = '';

        for (var key in cookiesList) {
            var coockieEl = cookiesList[key];
            var cookieName = coockieEl.name;
            var cookieValue = coockieEl.value;

            if (isMatching(cookieValue, filterValue)) {
                cookieTable += '<tr><td>' + cookieName + '</td><td>' + cookieValue +
                '</td><td><button class="button elId' + key + '">X</button></td></tr>';
                cookiesListCurrent.push(coockieEl);
            }
        }
        listTable.innerHTML = cookieTable;
    }
}

filterNameInput.addEventListener('keyup', function() {
    var inputValue = filterNameInput.value;

    if (cookiesList != []) {
        sortList(inputValue);
    }
});

function isInArray(name, value) {
    for (let key in cookiesList) {
        if (name.localeCompare(cookiesList[key].name) == 0) {
            cookiesList[key].value = value;

            return true;
        }
    }

    return false;
}

listTable.addEventListener('click', function () {
    var inputValue = filterNameInput.value;
    var target = event.target;

    while (target != this) {
        if (target.classList.contains('button')) {
            var cookieName = target.parentNode.parentNode.firstElementChild.innerHTML;
            var elId = target.classList[1].slice(4);
            deleteCookie(cookieName);
            cookiesList.splice(elId, 1);
            sortList(inputValue);

            return;
        }
        target = target.parentNode;
    }
});

addButton.addEventListener('click', () => {
    var inputValue = filterNameInput.value;
    var addName = addNameInput.value;
    var addValue = addValueInput.value;

    if (!!addName) {
        createCookie(addName, addValue);
        if (!inputValue) {
            if(!cookiesList.length) {
                cookiesList.push({ name: addName, value: addValue });
            } else {
                if (!isInArray(addName, addValue)) {
                    cookiesList.push({ name: addName, value: addValue });
                }
            }

            sortList(inputValue);
        } else {
            if (!isInArray(addName, addValue)) {
                cookiesList.push({ name: addName, value: addValue });

                if (isMatching(addName, inputValue)) {
                    listTable.innerHTML += '<tr><td>' + addName + '</td><td>' + addValue +
                    '</td><td><button class="button elId' + cookiesList.length + '">X</button></td></tr>';
                }
            } else {
                if (isMatching(addName, inputValue)) {
                    findRow(inputValue, addName, addValue);
                }
            }
        }
    }
});

function findRow(inputValue, addName, addValue) {
    var rows = listTable.children;

    for (var i = 0; i < rows.length; i++) {
        var cells = rows[i].children;
        var cellName = cells[0];
        var cellValue = cells[1];
        var cellBtn = cells[2].children;
        var button = cellBtn[0];
        console.log(cellName.innerHTML, addName, cellName.innerHTML == addName, addValue, inputValue, isMatching(addValue, inputValue));

        if ((cellName.innerHTML === addName) && !isMatching(addValue, inputValue)) {
            listTable.removeChild(rows[i]);
        } else {
          if ((cellName.innerHTML === addName) && isMatching(addValue, inputValue) ) {
              createCookie(addName, addValue);
              // console.log(cellValue.innerHTML, inputValue);
              cookiesList = getCookies();
              console.log(cookiesList);

              sortList(inputValue);
            }
        }
    }
}

function getCookies() {
    var cookie = document.cookie;
    var cookieArray = cookie.split('; ');
    var cookieArrayFilter = cookieArray.filter(Boolean);
    var next = cookieArrayFilter.map(cookie => cookie.match(/^([^=]+)=(.+)/));
    var last = next.reduce((obj, [, objName, objValue]) => { obj.push({name: objName, value: objValue}); return obj; }, []);
    // console.log(next);
    // console.log(last);

    return last;
}
