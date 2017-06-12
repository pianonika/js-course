/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 * Запрощено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
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
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
    var div = document.createElement('DIV');

    div.classList.add('draggable-div');
    div.style.width = Math.random() * 50 + 50 + 'px';
    div.style.height = Math.random() * 50 + 50 + 'px';
    div.style.position = 'absolute';
    div.style.backgroundColor = 'rgb(' + Math.ceil(Math.random() * 255) + ',' + Math.ceil(Math.random() * 255) + ','
    + Math.ceil(Math.random() * 255) + ')';
    div.style.left = Math.random() * 100 + 'px';
    div.style.top = Math.random() * 100 + 'px';

    return div;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {

    target.addEventListener('mousedown', function gragAndDrop(event) {
        // var leftPosition = Math.ceil(event.target.getBoundingClientRect().left);
        // var topPosition = Math.ceil(event.target.getBoundingClientRect().top);\
        moveTarget(event);
        event.target.style.zIndex = 1000;

        homeworkContainer.addEventListener('mousemove', moveAction);

        function moveAction (event) {
            // отмеряем браузерный Drag’n’Drop
            event.target.ondragstart = function() {
                return false;
            };
            moveTarget(event);
        }

        function moveTarget(event) {
            event.target.style.left = event.pageX - target.offsetWidth / 2 + 'px';
            event.target.style.top = event.pageY - target.offsetHeight / 2 + 'px';
        }

        // прекращаем перемещение
        event.target.addEventListener('mouseup', function () {
            homeworkContainer.removeEventListener('mousemove', moveAction);
            event.target.removeEventListener('onmouseup', gragAndDrop);
            // target.style.zIndex = 'auto';
        });
    });

}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
