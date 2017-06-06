<<<<<<< HEAD
/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
// var arr = ["Яблоко", "Апельсин", "Груша"];
//
// function  fn(item, i, arr) {
//     alert( i + ':' + item + ' (массив:' + arr + ')' );
// }

function forEach(array, fn) {
    for ( var i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

// forEach(arr, fn);

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
    var newArray = [];

    for ( var i = 0; i < array.length; i++) {
        newArray.push(fn(array[i], i, array));
    }

    return newArray;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
    var result;
    var previousValue;
    var currentValue;
    var index;
    var curIndex;

    if (!initial === true) {
        index = 0;
        result = array[0];
    } else {
        index = -1;
        result = initial;
    }

    for ( var i = index; i < (array.length-1); i++) {
        previousValue = result;
        currentValue = array[i+1];
        curIndex = i+1;
        result = fn(previousValue, currentValue, curIndex, array);
    }

    return result;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
    delete obj[prop];
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
    if (obj.hasOwnProperty([prop])) {
        return true;
    }

    return false;
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
    var propsArray = Object.keys(obj);

    return propsArray;
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
    var startKeys = Object.getOwnPropertyNames(obj);
    var outputKeys = [];

    for (var i in startKeys) {
        if (Object.prototype.hasOwnProperty.call(startKeys, i)) {
            outputKeys.push(startKeys[i].toUpperCase());
        }
    }

    return outputKeys;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to) {
    var result = [];
    var arrLength = array.length;

    if (from < 0) {
        from = arrLength + from;
        if (from < 0) {
            from = 0;
        }
    }

    if (typeof to == 'undefined' || to > arrLength) {
        to = arrLength;
    } else {
        if (to < 0) {
            to = arrLength + to;
        }
    }

    if (from > to) {
        return result;
    }

    for (var i = from; i < to; i++) {
        result.push(array[i]);
    }

    return result;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(obj, prop, value) {
            value = value*value;
            obj[prop] = value;

            return true;
        }
    });

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    deleteProperty,
    hasProperty,
    getEnumProps,
    upperProps,
    slice,
    createProxy
=======
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

var test = document.createElement('div');
test.innerHTML = '<div class="some-class-1"><b>привет!</b> <b class="some-class-1 some-class-2">loftschool</b></div>';

console.log(collectDOMStat(test));

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

      dipperEl = collectDOMStat(currNode);

      statistics.texts = statistics.texts + dipperEl.texts;


      for (var j in dipperEl.tags) {
          if (j in statistics.tags) {
              statistics.tags[j] += dipperEl.tags[j];
          } else {
              statistics.tags[j] = dipperEl.tags[j];
          }
      }

      for (var j in dipperEl.classes) {
          if (j in statistics.classes) {
              statistics.classes[j] += dipperEl.classes[j];
          } else {
              statistics.classes[j] = dipperEl.classes[j];
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
