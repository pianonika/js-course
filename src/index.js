/* ДЗ 4 - работа с DOM */

/**
 * Функция должна создать элемент с тегом DIV, поместить в него текстовый узел и вернуть получившийся элемент
 *
 * @param {string} text - текст, который необходимо поместить в div
 * @return {Element}
 */
function createDivWithText(text) {
    var newElement = document.createElement('div');

    newElement.innerHTML = text;

    return newElement;
}

/**
 * Функция должна создать элемент с тегом A, установить значение для атрибута href и вернуть получившийся элемент
 *
 * @param {string} hrefValue - значение для атрибута href
 * @return {Element}
 */
function createAWithHref(hrefValue) {
    var linkElement = document.createElement('a');

    linkElement.setAttribute('href', hrefValue);

    return linkElement;
}

/**
 * Функция должна вставлять элемент what в начало элемента where
 *
 * @param {Element} what - что вставлять
 * @param {Element} where - куда вставлять
 */
function prepend(what, where) {
    where.insertBefore(what, where.firstChild);
}

/**
 * Функция должна перебрать все дочерние элементы элемента where
 * и вернуть массив, состоящий из тех дочерних элементов
 * следующим соседом которых является элемент с тегом P
 * Рекурсия - по желанию
 *
 * @param {Element} where - где искать
 * @return {Array<Element>}
 *
 * @example
 * для html '<div></div><p></p><a></a><span></span><p></p>'
 * функция должна вернуть: [div, span]
 * т.к. следующим соседом этих элементов является элемент с тегом P
 */
 var where = document.createElement('div');

 where.innerHTML = '<div></div><p></p><span></span><span></span><p></p>';

 findAllPSiblings(where)

function findAllPSiblings(where) {
    var childrenListNew = [];
    var childrenList= where.childNodes;
    var resultList = [];

    for (var i = 0; i < childrenList.length; i++) {
        if (childrenList[i].nodeType == 1) {
            childrenListNew.push(childrenList[i]);
        }
    }

    for (var n = 0; n < (childrenListNew.length - 1); n++) {
        if (childrenListNew[n+1].nodeName == 'P') {
            resultList.push(childrenListNew[n]);
        }
    }

    return resultList;
}

/**
 * Функция должна перебрать все дочерние узлы типа "элемент" внутри where
 * и вернуть массив, состоящий из текстового содержимого перебираемых элементов
 * Но похоже, что в код закралась ошибка, которую нужно найти и исправить
 *
 * @param {Element} where - где искать
 * @return {Array<string>}
 */
function findError(where) {
    var resultList = [];
    var childrenList= where.childNodes;

    for (var i = 0; i < childrenList.length; i++) {
        if (childrenList[i].nodeType == 1) {
            resultList.push(childrenList[i].innerHTML);
        }
    }

    return resultList;
}

/**
 * Функция должна перебрать все дочерние узлы элемента where
 * и удалить из него все текстовые узлы
 * Без рекурсии!
 * Будьте внимательны при удалении узлов,
 * можно получить неожиданное поведение при переборе узлов
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <div></div>привет<p></p>loftchool!!!
 * должно быть преобразовано в <div></div><p></p>
 */
function deleteTextNodes(where) {
    var childrenList = where.childNodes;

    for (var i = 0; i < childrenList.length; i++) {
        if (childrenList[i].nodeType == 3) {
            where.removeChild(childrenList[i]);
        }
    }

    return where.innerHTML;
}
/**
 * Выполнить предудыщее задание с использование рекурсии
 * то есть необходимо заходить внутрь каждого дочернего элемента
 *
 * @param {Element} where - где искать
 *
 * @example
 * после выполнения функции, дерево <span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>
 * должно быть преобразовано в <span><div><b></b></div><p></p></span>
 */
function deleteTextNodesRecursive(where) {
    var childrenList = where.children;
    var currNode;

    deleteTextNodes(where);

    for (var i = 0; i < childrenList.length; i++) {
        currNode = childrenList[i];

        deleteTextNodesRecursive(currNode);
    }
}

/**
 * *** Со звездочкой ***
 * Необходимо собрать статистику по всем узлам внутри элемента root и вернуть ее в виде объекта
 * Статистика должна содержать:
 * - количество текстовых узлов
 * - количество элементов каждого класса
 * - количество элементов каждого тега
 * Для работы с классами рекомендуется использовать свойство classList
 * Постарайтесь не создавать глобальных переменных
 *
 * @param {Element} root - где собирать статистику
 * @return {{tags: Object<string, number>, classes: Object<string, number>, texts: number}}
 *
 * @example
 * для html <div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>
 * должен быть возвращен такой объект:
 * {
 *   tags: { DIV: 1, B: 2},
 *   classes: { "some-class-1": 2, "some-class-2": 1 },
 *   texts: 3
 * }
 */

// var test = document.createElement('div');
// test.innerHTML = '<div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>';
//
// console.log(collectDOMStat(test));

function collectDOMStat(root) {
    var childrenNodesList = root.childNodes;
    var statistics =  {tags: {}, classes: {}, texts: 0};
    var currNode;

    for (var i = 0; i < childrenNodesList.length; i++) {

        currNode = childrenNodesList[i];

        /* texts of Node */
        if (currNode.nodeType == 3) {
            statistics.texts++;
        }

        /* tags of Node */
        if (currNode.nodeType == 1) {
            var currTag = currNode.tagName;
            var classList = currNode.classList;

            for (var k = 0 ; k < currNode.classList.length; k++) {
                var currClass= classList[k];

                if (statistics.classes[currClass] === undefined) {
                    statistics.classes[currClass] = 1;
                } else {
                    statistics.classes[currClass]++;
                }
            }

            if (statistics.tags[currTag] === undefined) {
                statistics.tags[currTag] = 1;
            } else {
                statistics.tags[currTag]++;
            }
        }

        var dipperEl = collectDOMStat(currNode);

        statistics.texts = statistics.texts + dipperEl.texts;

        for (var j in dipperEl.tags) {
            if (j in statistics.tags) {
                statistics.tags[j] += dipperEl.tags[j];
            } else {
                statistics.tags[j] = dipperEl.tags[j];
            }
        }

        for (var n in dipperEl.classes) {
            if (n in statistics.classes) {
                statistics.classes[n] += dipperEl.classes[n];
            } else {
                statistics.classes[n] = dipperEl.classes[n];
            }
        }

    }

    return statistics;
}

/**
 * *** Со звездочкой ***
 * Функция должна отслеживать добавление и удаление элементов внутри элемента where
 * Как только в where добавляются или удаляются элементы,
 * необходимо сообщать об этом при помощи вызова функции fn со специальным аргументом
 * В качестве аргумента должен быть передан объект с двумя свойствами:
 * - type: типа события (insert или remove)
 * - nodes: массив из удаленных или добавленных элементов (а зависимости от события)
 * Отслеживание должно работать вне зависимости от глубины создаваемых/удаляемых элементов
 * Рекомендуется использовать MutationObserver
 *
 * @param {Element} where - где отслеживать
 * @param {function(info: {type: string, nodes: Array<Element>})} fn - функция, которую необходимо вызвать
 *
 * @example
 * если в where или в одного из его детей добавляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'insert',
 *   nodes: [div]
 * }
 *
 * ------
 *
 * если из where или из одного из его детей удаляется элемент div
 * то fn должна быть вызвана с аргументов:
 * {
 *   type: 'remove',
 *   nodes: [div]
 * }
 */
function observeChildNodes(where, fn) {


}

export {
    createDivWithText,
    createAWithHref,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
};
