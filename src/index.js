/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */

function isAllTrue(array, fn) {
    if (!(Array.isArray(array)) || (!array.length)) {
        throw new Error('empty array');
    }

    if (typeof fn != 'function') {
        throw new Error('fn is not a function');
    }

    for (var i = 0; i < array.length; i++) {
        if (!fn(array[i])) {
            return false;
        }
    }

    return true;
}

// var ERROR_IS_ARRAY = 1;
// var ERROR_IS_FUNCTION= 2;
// var massages = {
//     [ERROR_IS_ARRAY]: 'empty array',
//     [ERROR_IS_FUNCTION]: 'n is not a function'
// }
//
// var array1 = [];
//
// function fn1 (a) {
//     if (a > 2) {
//         return true;
//     }
//
//     return false;
// }
//
// try {
//     isAllTrue(array1, fn1);
// } catch (e) {
//     alert(massages[e.message]);
// }

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {
    if (!(Array.isArray(array)) || !array.length) {
        throw new Error('empty array');
    }

    if (typeof fn != 'function') {
        throw new Error('fn is not a function');
    }

    for (var i = 0; i < array.length; i++) {
        if (fn(array[i])) {
            return true;
        }
    }

    return false;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {
    var agrsLength = arguments.length;

    if (typeof fn != 'function') {
        throw new Error('fn is not a function');
    }

    var result =[];

    for ( var i = 1; i < agrsLength; i++) {
        try {
            fn(arguments[i]);
        } catch (e) {
            var exeptionItem = arguments[i];
        } finally {
            if (exeptionItem != undefined) {
                result.push(exeptionItem);
            }
        }
    }

    return result;
}
//
// function fn1 (a) {
//     if (a > 2) {
//         throw new Error('error');
//     }
//
//     return false;
// }
// returnBadArguments(fn1, 10, 3);

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
    if (typeof number != 'number') {
        throw new Error('number is not a number');
    }

    var obj = {
        sum: function () {
            var result = number;

            for (var i = 0; i < arguments.length; i++) {
                result += arguments[i];
            }

            return result;
        },
        dif: function () {
            var result = number;

            for (var i = 0; i < arguments.length; i++) {
                result -= arguments[i];
            }

            return result;
        },
        div: function () {
            var result = number;

            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] === 0) {
                    throw new Error('division by 0');
                }
                result /= arguments[i];
            }

            return result;
        },

        mul: function () {
            var result = number;

            for (var i = 0; i < arguments.length; i++) {
                result *= arguments[i];
            }

            return result;
        }
    }

    return obj;
}

// var o = calculator(3).sum(1, 2, 3);
//
// alert(o);

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
