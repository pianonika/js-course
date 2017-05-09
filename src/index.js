/* ДЗ 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
var a = 5;

function returnFirstArgument(arg) {
  return arg;
}

var b = returnFirstArgument (a);
console.log (b);

/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
var firstArg = 5;
var secondArg = 10;

function defaultParameterValue(a, b = 100) {
    return a + b;
}

var result = defaultParameterValue(firstArg, secondArg);
console.log (result);

/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */

function returnArgumentsArray() {
  var args = [];
  for (var i = 0; i < arguments.length; i++) {
    args[i] = arguments[i];
  }
  return args;
}

var resultArr = returnArgumentsArray(1, 2, 3, 4, 5, 6);
console.log(resultArr);

/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */

function mult(a, b) {
  return a*b;
}

function returnFnResult(fn) {
  return fn(4, 5);
}

console.log(returnFnResult(mult));

/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */

function returnCounter(number = 0) {
  function f() {
    return ++number;
  }
  return f;
}

var resultReturnCounter = returnCounter(5);
console.log(resultReturnCounter());

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */


function speech() {
 var fraze = '';
 for (var i = 0; i < arguments.length; i++) {
   fraze = fraze + ' ' + arguments[i];
 }
  alert('Хочу сказать: "' + fraze + '!"');
};


function bindFunction(fn) {
 var args = [];
 for (var i = 0; i < arguments.length; i++) {
   args[i-1] = arguments[i];
 }
 return function () {
   return fn.apply(null, args);
 }
}
var g = bindFunction(speech, 'Задание', 'выполнено');
g();


export {
    returnFirstArgument,
    defaultParameterValue,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}
