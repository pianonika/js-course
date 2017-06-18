/**
 * ДЗ 6.2 - Создать страницу с текстовым полем для фильтрации городов
 *
 * Страница должна предварительно загрузить список городов из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * и отсортировать в алфавитном порядке.
 *
 * При вводе в текстовое поле, под ним должен появляться список тех городов,
 * в названии которых, хотя бы частично, есть введенное значение.
 * Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.
 *
 * Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 * После окончания загрузки городов, надпись исчезает и появляется текстовое поле.
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 *
 * *** Часть со звездочкой ***
 * Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 * то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 * При клике на кнопку, процесс загруки повторяется заново
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');

/**
 * Функция должна загружать список городов из https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * И возвращать Promise, которой должен разрешиться массивом загруженных городов
 *
 * @return {Promise<Array<{name: string}>>}
 */
function loadTowns() {
    return new Promise(function(resolve, reject) {
        var cities = new XMLHttpRequest();

        cities.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);
        cities.onload = function() {
            if (status < 400) {
                var citiesList = JSON.parse(this.responseText);

                citiesList.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    } else if (a.name < b.name) {
                        return -1;
                    }
                });

                resolve(citiesList);
            } else {
                var error = new Error(this.statusText);

                error.code = this.status;
                reject(error);
            }
        };
        cities.send();
    });
}

// console.log(if (townsPromise));
/**
 * Функция должна проверять встречается ли подстрока chunk в строке full
 * Проверка должна происходить без учета регистра символов
 *
 * @example
 * isMatching('Moscow', 'moscow') // true
 * isMatching('Moscow', 'mosc') // true
 * isMatching('Moscow', 'cow') // true
 * isMatching('Moscow', 'SCO') // true
 * isMatching('Moscow', 'Moscov') // false
 *
 * @return {boolean}
 */
function isMatching(full, chunk) {
    var seachPatch = new RegExp(chunk, 'i');

    if (full.search(seachPatch) === -1) {
        return false;
    }

    return true;
}

function townsDounload () {
    loadTowns()
    .then(function(result) {
        loadingBlock.style.display = 'none';
        filterBlock.style.display = 'block';

        towns = result;

    }, function() {
        loadingBlock.textContent= 'Не удалось загрузить города';
        var btnReload = document.createElement('button');

        btnReload.id = 'btnReload';
        btnReload.innerHTML = 'Повторить загрузку';
        loadingBlock.innerHTML = 'Что-то пошло не так';

        btnReload.addEventListener('click', function() {
            loadingBlock.innerHTML = 'Загрузка...';
            townsDounload();
        })

    });
}

let loadingBlock = homeworkContainer.querySelector('#loading-block');
let filterBlock = homeworkContainer.querySelector('#filter-block');
let filterInput = homeworkContainer.querySelector('#filter-input');
let filterResult = homeworkContainer.querySelector('#filter-result');
let towns;

townsDounload();

filterInput.addEventListener('keyup', function() {

    filterResult.innerHTML = '';
    var inputValue = filterInput.value;

    if (inputValue != '') {
        for (var obj of towns) {
            var currTown = obj.name;
            var suitableValue = isMatching(currTown, inputValue);

            if (suitableValue) {
                filterResult.innerHTML += '<br>' + currTown;
            }
        }
    }
});

export {
    loadTowns,
    isMatching
};
