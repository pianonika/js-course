/* ДЗ 7.1 - BOM */

/**
 * Функция должна создавать окно с указанным именем и размерами
 *
 * @param {number} name - имя окна
 * @param {number} width - ширина окна
 * @param {number} height - высота окна
 * @return {Window}
 */
function createWindow(name, width, height) {
    var newwin = window.open('hello', 'width=' + width + ',height=' + height);

    return newwin;
}

/**
 * Функция должна закрывать указанное окно
 *
 * @param {Window} window - окно, размер которого надо изменить
 */
function closeWindow(window) {
    window.close();
}

/**
 * Функция должна создавать cookie с указанными именем и значением
 *
 * @param name - имя
 * @param value - значение
 */
function createCookie(name, value) {
    var date = new Date(new Date().getTime() + 60 * 1000);

    document.cookie = name + '=' + value + ';' + 'expires=' + date.toUTCString();
}

/**
 * Функция должна удалять cookie с указанным именем
 *
 * @param name - имя
 */
function deleteCookie(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 2017 00:00:00 GMT;';
}

export {
    createWindow,
    closeWindow,
    createCookie,
    deleteCookie
};
