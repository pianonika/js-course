/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунд после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, seconds*1000)
    });
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
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

export {
    delayPromise,
    loadAndSortTowns
};
