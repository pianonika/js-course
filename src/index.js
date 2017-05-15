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

    for(var i in startKeys) {
        outputKeys.push(startKeys[i].toUpperCase());
    }

    return outputKeys;
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from, to) {
    var result = [];

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
};
